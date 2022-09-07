const db = require("../models/db");

exports.mrtg = async (req, res) => {
    try {
        const { customer_id } = req.body;
        const findQuery = `SELECT * FROM customers_mrtg WHERE customer_id = ${customer_id};`;
        const [findResponse] = await db.promise().query(findQuery);
        return res.status(200).json({
            success: true,
            message: "MRTG Data",
            customers: findResponse,
        });
    } catch (error) {
        return res.status(401).json({
            error: error.message,
        });
    }
};

exports.mrtgAdd = async (req, res) => {
    try {
        const { name, url, customer_id } = req.body;
        const addQuery = `INSERT INTO customers_mrtg(name,url,customer_id) values ('${name}','${url}','${customer_id}')`;
        const [addResponse] = await db.promise().query(addQuery);
        if (addResponse.affectedRows > 0) {
            return res.status(201).json({
                success: true,
                message: "MRTG data added successfully",
            });
        };
    } catch (error) {
        return res.status(401).json({
            error: error.message,
        });
    };
};

exports.mrtgUpdate = async (req, res) => {
    try {
        const { name, url } = req.body;
        const updateQuery = `UPDATE customers_mrtg SET name=?,url=? WHERE _id=?`;
        const [updateResponse] = await db.promise().query(updateQuery, [name, url, req.params.id]);
        if (updateResponse.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                message: "MRTG data updated successfully",
            });
        }
    } catch (error) {
        return res.status(401).json({
            error: error.message,
        });
    };
};

exports.mrtgRemove = async (req, res) => {
    try {
        const removeQuery = `DELETE FROM customers_mrtg WHERE _id=${req.params.id}`;
        const [removeResponse] = await db.promise().query(removeQuery);
        if (removeResponse.affectedRows == 1) {
            return res.status(200).json({
                success: true,
                message: "mrtg removed successfully",
            });
        };
    } catch (error) {
        return res.status(401).json({
            error: error.message,
        });
    };
};