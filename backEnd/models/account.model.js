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
                balance,
                startdate
            } = data;

            // validating data
            if (!id_customer || !packet || balance == null || isNaN(balance) || balance < 0) {
                throw new Error('Invalid input data');
            } else {
                const query =
                    "INSERT INTO account (id_customer, packet, balance, startdate) VALUES ($1, $2, $3, $4) RETURNING *";

                const result = await db.query(query, [id_customer, packet, balance, startdate]);

                return result.rows;
            }

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
                balance,
                startdate
            } = data;

            // validation data
            if (
                !id_customer ||
                !packet ||
                balance == null ||
                isNaN(balance) ||
                balance < 0 ||
                !startdate
            ) {
                throw new Error("Invalid input data");
            } else {
                const account = await ACCOUNT.findbyId(id);
                if (!account) {
                    throw new Error("Account not found");
                } else {
                    const query =
                        "UPDATE account SET id_customer = $1, packet = $2, balance= $3, startdate = $4 WHERE id = $5 RETURNING *";

                    const result = await db.query(query, [id_customer, packet, balance, startdate, id]);
                    return result.rows;
                }
            }

            // checking id
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
            } else {
                const query = "DELETE FROM account WHERE id = $1";

                const result = await db.query(query, [id]);
                return result.rows;
            }

        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Deleting Account");
        }
    },

    // deposit the account
    deposit: async (id, data) => {
        try {
            const {
                balance,
                depositdate
            } = data;

            // validation data
            if (balance == null || isNaN(balance) || balance <= 0 || !depositdate) {
                throw new Error('Invalid deposit data');
            } else {
                const account = await ACCOUNT.findbyId(id);
                if (!account) {
                    throw new Error("Account not found");
                } else {
                    const query =
                        "UPDATE account SET balance = balance + $1, startdate = $2 WHERE id = $3 RETURNING *";

                    const result = await db.query(query, [balance, depositdate, id]);
                    return result.rows;
                }
            }

            // checking id
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Adding Deposit");
        }
    },

    // withdraw account
    withdraw: async (id, data) => {
        try {
            const {
                balance,
                withdrawdate
            } = data;

            // validation data
            if (balance == null || isNaN(balance) || balance <= 0 || !withdrawdate) {
                throw new Error('Invalid withdrawal amount');
            } else {
                const account = await ACCOUNT.findbyId(id);
                if (!account) {
                    throw new Error("Account not found");
                } else {
                    if (account.balance < balance) {
                        throw new Error("Balance is not enough");
                    } else {
                        const query_yearlyReturn = "SELECT yearly_return FROM deposito_type WHERE id = $1";
                        const result_query_yerlyReturn = await db.query(query_yearlyReturn, [account.packet]);
                        const yearly_return = result_query_yerlyReturn.rows[0].yearly_return

                        if (!yearly_return || !account.startdate) {
                            throw new Error("Deposit details are missing");
                        }

                        const datedeposit = new Date(account.startdate);
                        const datewithdraw = new Date(withdrawdate);
                        const month = ((datewithdraw.getFullYear() - datedeposit.getFullYear()) * 12) + (datewithdraw.getMonth() - datedeposit.getMonth());
                        const mothly_return = (yearly_return / 12) / 100;

                        const ending_balance = account.balance * mothly_return * month;

                        const query =
                            "UPDATE account SET balance = balance - $1 WHERE id = $2 RETURNING *";

                        const result_query = await db.query(query, [balance, id]);

                        const result = {
                            yearly_return: yearly_return,
                            mothly_return: mothly_return,
                            month: month,
                            query: result_query.rows[0],
                            ending_balance: ending_balance
                        };
                        return result;
                    }
                }
            }

            // checking id
        } catch (err) {
            console.error(err.message);
            throw new Error("Error: Error Withdrawing Balance");
        }
    },
};

module.exports = ACCOUNT;