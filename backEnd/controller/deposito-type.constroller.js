const DEPOSITO_TYPE = require('../models/deposito-type.model');

async function index(req, res) {
    try {
        const result = await DEPOSITO_TYPE.index();
        res.json({
            message: "GET Deposit Type API",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const result = await DEPOSITO_TYPE.create(data);
        res.json({
            message: "Deposit Type Created Successfully",
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
        const result = await DEPOSITO_TYPE.update(id, data);
        res.json({
            message: "Deposit Type Update Successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

async function deletedata(req, res) {
    try {
        const {
            id
        } = req.params;
        const result = await DEPOSITO_TYPE.delete(id);
        res.json({
            message: "Deposit Type deleted Successfully",
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
    deletedata
}