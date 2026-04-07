import API from "./api";

// ✅ GET ALL
export const getAllGroceries = async () => {
  const res = await API.get("/groceries");
    return res.data;
    };

    // ✅ ADD
    export const addGrocery = async (data) => {
      const res = await API.post("/groceries/add", data);
        return res.data;
        };

        // ✅ UPDATE
        export const updateGrocery = async (id, data) => {
          const res = await API.put(`/groceries/${id}`, data);
            return res.data;
            };

            // ✅ DELETE
            export const deleteGrocery = async (id) => {
              const res = await API.delete(`/groceries/${id}`);
                return res.data;
                };