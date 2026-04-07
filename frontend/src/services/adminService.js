export const getDashboardStats = async () => {
  try {
    const res = await API.get("/admin/dashboard");
    return res.data;
  } catch (err) {
    console.error("Dashboard error:", err);
    throw err;
  }
};