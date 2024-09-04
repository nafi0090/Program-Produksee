const db = require('../config/db');

const DEPOSITO_TYPE = {
    index: async () => {
        try {
            const query = "SELECT * FROM deposito_type ORDER BY id ASC";

            const result = await db.query(query);

            return result.rows
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Get Data Deposite");
        }
    },
    create: async (data) => {
        try {
            const {
                name,
                yearly_return
            } = data;

            // validating data
            if (!name || !yearly_return || yearly_return < 0) {
                throw new Error("Invalid input data");
            } else {
                const query = "INSERT INTO deposito_type (name, yearly_return) VALUES ($1, $2) RETURNING *";

                const result = await db.query(query, [name, yearly_return]);
                return result.rows
            }


        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Creating Deposit Type");
        }
    },

    // search for id account
    findbyId: async (id) => {
        try {
            const query = "SELECT * FROM deposito_type WHERE id = $1";

            const result = await db.query(query, [id]);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: " + err.message);
        }
    },

    update: async (id, data) => {
        try {
            const {
                name,
                yearly_return
            } = data

            // validating data
            if (!name || !yearly_return || yearly_return < 0) {
                throw new Error("Invalid input data");
            } else {
                // checking id
                const id_search = await DEPOSITO_TYPE.findbyId(id);
                if (!id_search) {
                    throw new Error("ID Deposit Type not found");
                } else {
                    const query = "UPDATE deposito_type SET name = $1, yearly_return = $2 WHERE id = $3 RETURNING *"

                    const result = await db.query(query, [name, yearly_return, id]);
                    return result.rows
                }
            }

        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Updating deposito type");
        }
    },
    delete: async (id) => {
        try {
            // checking id
            const id_search = await DEPOSITO_TYPE.findbyId(id);
            if (!id_search) {
                throw new Error("ID Deposit Type not found");
            } else {
                const query = "DELETE FROM deposito_type WHERE id = $1 RETURNING *";

                const result = await db.query(query, [id]);
                return result.rows
            }

        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Deleting deposit type");
        }
    }
}

module.exports = DEPOSITO_TYPE