import React, { useEffect, useState } from "react";
import {
    getAddresses,
    deleteAddress,
    setDefaultAddress
} from "../services/userService";

const Addresses = () => {

    const [addresses, setAddresses] = useState([]);

    const load = async () => {
        const data = await getAddresses();
        setAddresses(data);
    };

    useEffect(() => {
        load();
    }, []);


    const remove = async (id) => {
        await deleteAddress(id);
        load();
    };

    const setDefault = async (id) => {
        await setDefaultAddress(id);
        load();
    };


    return (

        <div>

            <h2>Your Addresses</h2>

            {addresses.map(addr => (

                <div key={addr._id}>

                    <p>{addr.fullName}</p>
                    <p>{addr.addressLine1}</p>
                    <p>{addr.city} {addr.pincode}</p>

                    {addr.isDefault && <b>Default</b>}

                    <br />

                    <button onClick={() => setDefault(addr._id)}>
                        Set Default
                    </button>

                    <button onClick={() => remove(addr._id)}>
                        Delete
                    </button>

                </div>

            ))}

        </div>

    );

};

export default Addresses;