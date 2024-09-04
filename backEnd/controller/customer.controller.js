const CUSTOMER = require('../models/customer.model')

async function index(req, res) {
    try {
        const result = await CUSTOMER.index();
        res.json({
            message: "GET customer API",
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
        const result = await CUSTOMER.create(data);
        res.json({
            message: "Customer Created Successfully",
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
        const result = await CUSTOMER.update(parseInt(id), data);
        res.json({
            message: "Customer Updated Successfully",
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
        const result = await CUSTOMER.delete(parseInt(id));
        res.json({
            message: "DELETE customer API",
            data: result.rows
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