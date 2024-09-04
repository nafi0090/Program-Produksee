const db = require("../config/db");

const ACCOUNT = {
    // retrieve account data
    index: async () => {
        try {
            const query = "SELECT * FROM account ORDER BY id ASC";

            const result = await db.query(query);

            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Get Data Account");
        }
    },

    // add account data
    create: async (data) => {
        try {
            const {
                id_customer,
                packet,
                balance
            } = data;

            // validating data
            if (!id_customer || !packet || balance == null || isNaN(balance) || balance < 0) {
                throw new Error('Invalid input data');
            }

            const query =
                "INSERT INTO account (id_customer, packet, balance) VALUES ($1, $2, $3) RETURNING *";

            const result = await db.query(query, [id_customer, packet, balance]);

            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Creating Account");
        }
    },

    // search for id account
    findbyId: async (id) => {
        try {
            const query = "SELECT * FROM account WHERE id = $1";

            const result = await db.query(query, [id]);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: " + err.message);
        }
    },

    // update data account
    update: async (id, data) => {
        try {
            const {
                id_customer,
                packet,
                balance
            } = data;

            // validation data
            if (
                !id_customer ||
                !packet ||
                balance == null ||
                isNaN(balance) ||
                balance < 0
            ) {
                throw new Error("Invalid input data");
            }

            // checking id
            const account = await ACCOUNT.findbyId(id);
            if (!account) {
                throw new Error("Account not found");
            }

            const query =
                "UPDATE account SET id_customer = $1, packet = $2, balance= $3 WHERE id = $4 RETURNING *";

            const result = await db.query(query, [id_customer, packet, balance, id]);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Updating Account");
        }
    },

    // delete data account
    delete: async (id) => {
        try {
            // checking id
            const account = await ACCOUNT.findbyId(id);
            if (!account) {
                throw new Error("Account not found");
            }

            const query = "DELETE FROM account WHERE id = $1";

            const result = await db.query(query, [id]);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Deleting Account");
        }
    },

    // deposit the account
    deposit: async (id, data) => {
        try {
            const {
                balance
            } = data;

            // validation data
            if (balance == null || isNaN(balance) || balance <= 0) {
                throw new Error('Invalid deposit amount');
            }

            // checking id
            const account = await ACCOUNT.findbyId(id);
            if (!account) {
                throw new Error("Account not found");
            }

            const query =
                "UPDATE account SET balance = balance + $1 WHERE id = $2 RETURNING *";

            const result = await db.query(query, [balance, id]);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Adding Deposit");
        }
    },

    // withdraw account
    withdraw: async (id, data) => {
        try {
            const {
                balance
            } = data;

            // validation data
            if (balance == null || isNaN(balance) || balance <= 0) {
                throw new Error('Invalid withdrawal amount');
            }

            // checking id
            const account = await ACCOUNT.findbyId(id);
            if (!account) {
                throw new Error("Account not found");
            }

            // checking for balance 
            if (account.balance < balance) {
                throw new Error("Balance is not enough");
            }

            const query =
                "UPDATE account SET balance = balance - $1 WHERE id = $2 RETURNING *";

            const result = await db.query(query, [balance, id]);
            return result.rows;
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Withdrawing Balance");
        }
    },
};

module.exports = ACCOUNT;