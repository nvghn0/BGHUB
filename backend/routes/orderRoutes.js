const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Cart = require("../models/Cart");
const Order = require("../models/Order");
const User = require("../models/User");

const Grocery = require("../models/Grocery");
const Food = require("../models/Food");
const Medicine = require("../models/Medicine");
const Dairy = require("../models/Dairy");

const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const MODEL_MAP = { Grocery, Food, Medicine, Dairy };
const MAX_QTY = 10;

// ============================
// ✅ GET MY ORDERS (USER)
// ============================
router.get("/my-orders", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id || req.user._id;

        const orders = await Order.find({ user: userId })
            .sort({ createdAt: -1 });

        res.json(orders);

    } catch (err) {
        res.status(500).json({ message: "Error fetching orders" });
    }
});

// ============================
// ✅ ADMIN: GET ALL ORDERS
// ============================
router.get("/admin", verifyToken, isAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
          .populate("user", "email") 
            .sort({ createdAt: -1 });

        res.json(orders);

    } catch (err) {
        res.status(500).json({ message: "Error fetching orders" });
    }
});

// ============================
// ✅ ADMIN: UPDATE STATUS
// ============================
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
    try {
        const { status } = req.body;

        if (!["processing", "shipped", "delivered", "cancelled"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Status updated", order });

    } catch (err) {
        res.status(500).json({ message: "Error updating status" });
    }
});

// ============================
// ✅ PLACE ORDER
// ============================
router.post("/place", verifyToken, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const userId = req.user.id || req.user._id;
        const { addressId, shipping, paymentMethod = "COD" } = req.body;

        // ADDRESS LOGIC
        let finalAddress;

        if (addressId) {
            const user = await User.findById(userId).session(session);
            if (!user) throw new Error("User not found");

            const savedAddress = user.addresses.id(addressId);
            if (!savedAddress) throw new Error("Invalid addressId");

            finalAddress = savedAddress.toObject();
        }
        else if (shipping) {
            const {
                fullName,
                phone,
                addressLine1,
                city,
                state,
                pincode
            } = shipping;

            if (!fullName || !phone || !addressLine1 || !city || !state || !pincode) {
                throw new Error("Complete delivery address required");
            }

            finalAddress = shipping;
        }
        else {
            throw new Error("Address required");
        }

        // FETCH CART
        const cart = await Cart.findOne({ userId }).session(session);

        if (!cart || cart.items.length === 0) {
            throw new Error("Cart empty");
        }

        const selectedItems = cart.items.filter(i => i.selected);

        if (selectedItems.length === 0) {
            throw new Error("No selected items to order");
        }

        const itemsResolved = [];

        // VALIDATE PRODUCTS
        for (const it of selectedItems) {
            const Model = MODEL_MAP[it.category];
            if (!Model) continue;

            const product = await Model.findById(it.productId).session(session);

            if (!product || !product.isActive || product.stock <= 0) continue;

            const finalQty = Math.min(it.quantity, product.stock, MAX_QTY);
            if (finalQty <= 0) continue;

            itemsResolved.push({
                productId: product._id,
                category: it.category,
                name: product.name,
                imageUrl: product.imageUrl,
                price: product.price,
                quantity: finalQty
            });
        }

        if (itemsResolved.length === 0) {
            throw new Error("No valid items to order");
        }

        // CALCULATE TOTAL
        const totalAmount = itemsResolved.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        // SAFE STOCK REDUCTION
        for (const item of itemsResolved) {
            const Model = MODEL_MAP[item.category];

            const updated = await Model.findOneAndUpdate(
                {
                    _id: item.productId,
                    stock: { $gte: item.quantity }
                },
                { $inc: { stock: -item.quantity } },
                { session }
            );

            if (!updated) {
                throw new Error("Stock conflict detected. Please try again.");
            }
        }

        // CREATE ORDER
        const order = await Order.create([{
            user: userId,
            items: itemsResolved,
            shipping: finalAddress,
            paymentMethod,
            totalAmount,
            status: "processing"
        }], { session });

        // CLEAN CART
        cart.items = cart.items.filter(item => !item.selected);
        await cart.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: "Order placed successfully",
            orderId: order[0]._id,
            totalAmount
        });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        res.status(400).json({
            message: err.message || "Order failed"
        });
    }
});

module.exports = router;