const DB = require('../config/db');

const CUSTOMERS = {
    index: async () => {
        try {
            const query = "SELECT * FROM customer ORDER BY id ASC";

            const result = await DB.query(query);

            return result.rows
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Get data customer");
        }
    },

    create: async (data) => {
        try {
            const {
                name
            } = data;

            // validating data
            if (!name) {
                throw new Error("Invalid input data");
            } else {
                const query = "INSERT INTO customer (name) VALUES ($1) RETURNING *";

                const result = await DB.query(query, [name]);
                return result.rows;
            }

        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Creating Account");
        }
    },

    // search for id
    findbyId: async (id) => {
        try {
            const query = "SELECT * FROM customer WHERE id = $1";

            const result = await DB.query(query, [id]);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: " + err.message);
        }
    },

    update: async (id, data) => {
        try {
            const {
                name
            } = data;

            // validating data
            if (!name) {
                throw new Error("Invalid input data");
            } else {
                // checking id
                const id_search = await CUSTOMERS.findbyId(id);
                if (!id_search) {
                    throw new Error("ID Customer not found");
                } else {
                    const query = "UPDATE customer SET name = $1 WHERE id = $2 RETURNING *";

                    const result = await DB.query(query, [name, id]);
                    return result.rows
                }
            }

        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error updating customer");
        }
    },

    delete: async (id) => {
        try {
            // checking id
            const id_search = await CUSTOMERS.findbyId(id);
            if (!id_search) {
                throw new Error("ID Customer not found");
            } else {
                const query = "DELETE FROM customer WHERE id = $1 RETURNING *";

                const result = await DB.query(query, [id]);
                return result
            }

        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error deleting customer");
        }
    }
}

module.exports = CUSTOMERS;