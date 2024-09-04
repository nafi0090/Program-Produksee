const ACCOUNT_MODEL = require('../models/account.model');

async function index(req, res) {
    try {
        const result = await ACCOUNT_MODEL.index();
        res.json({
            message: "GET account API",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function create(req, res) {
    try {
        const data = req.body
        const result = await ACCOUNT_MODEL.create(data);
        res.json({
            message: "POST account API",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

async function update(req, res) {
    try {
        const {
            id
        } = req.params;
        const data = req.body;
        const result = await ACCOUNT_MODEL.update(id, data);
        res.json({
            message: "PUT account API",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

async function deleteAccount(req, res) {
    try {
        const {
            id
        } = req.params;
        const result = await ACCOUNT_MODEL.delete(id);
        res.json({
            message: "DELETE account API",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

async function deposit(req, res) {
    try {
        const {
            id
        } = req.params;
        const data = req.body;
        const result = await ACCOUNT_MODEL.deposit(id, data);
        res.json({
            message: "PUT account API - DEPOSIT",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

async function withdraw(req, res) {
    try {
        const {
            id
        } = req.params;
        const data = req.body;
        const result = await ACCOUNT_MODEL.withdraw(id, data);
        res.json({
            message: "PUT account API - WITHDRAW",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = {
    index,
    create,
    update,
    deleteAccount,
    deposit,
    withdraw
}