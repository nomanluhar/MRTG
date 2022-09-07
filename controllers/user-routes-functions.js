const db = require("../models/db");
const { hash } = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const findOneQuery = `SELECT * FROM admin_user where email=?`;
  try {
    const response = await findOneFun(findOneQuery, email);
    if (response) {
      if (response.password == password) {
        return res.status(200).json({
          success: true,
          message: "Super Admin User Login Successfully.",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Unauthorized user",
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

exports.customers = async (req, res) => {
  const findQuery = `SELECT * FROM customers`;
  try {
    const [findResponse] = await db.promise().query(findQuery);
    return res.status(200).json({
      success: true,
      message: "Customers Data",
      customers: findResponse,
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

exports.addCustomer = async (req, res) => {
  const { full_name, email, user_name, password, MRTG } = req.body;

  try {
    const findOneQuery = `SELECT * FROM customers where email=?`;
    const response = await findOneFun(findOneQuery, email);
    if (response) {
      return res.status(403).json({
        success: false,
        message: "Data with this email already exists",
      });
    } else {
      const hashedPassword = await hash(password, 10);
      const addQuery = `INSERT INTO customers(full_name,email,user_name,password) values ('${full_name}','${email}','${user_name}','${hashedPassword}')`;
      const [addResponse] = await db.promise().query(addQuery);

      if (addResponse.affectedRows > 0) {
        await addMRTG(MRTG, addResponse.insertId);

        return res.status(201).json({
          success: true,
          message: "Customers added successfully",
        });
      } else {
        return res.status(401).json({
          error: "Error while inserting data",
        });
      }
    }
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

exports.updateCustomer = async (req, res) => {
  const { full_name, email, user_name } = req.body;
  try {
    const updateQuery = `UPDATE customers SET full_name=?,email=?,user_name=? WHERE customer_id=?`;
    const [updateResponse] = await db
      .promise()
      .query(updateQuery, [full_name, email, user_name, req.params.id]);
    if (updateResponse.affectedRows == 1) {
      return res.status(200).json({
        success: true,
        message: "Customers updated successfully",
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

exports.removeCustomer = async (req, res) => {
  try {
    const removeQuery = `DELETE FROM customers WHERE customer_id=?`;
    const [removeResponse] = await db
      .promise()
      .query(removeQuery, [req.params.id]);
    if (removeResponse.affectedRows == 1) {
      return res.status(200).json({
        success: true,
        message: "Customers removed successfully",
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

async function findOneFun(query, val) {
  const [[queryResult]] = await db.promise().query(query, [val]);

  if (queryResult) {
    return queryResult;
  } else {
    return false;
  }
}

async function addMRTG(arr, foreignId) {
  if (arr && arr.length) {
    arr.map(addFun);

    var addFun = (obj) => {
      console.log(obj)
    };
  }

  return isMrtgAdd;
}
