const db = require("../models/db");
const { hash, compare } = require("bcryptjs");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const dbName = req.originalUrl.match('/superadmin/') ? 'admin_user' : 'customers';

    const findOneQuery = `SELECT * FROM ${dbName} where email=?`;
    const response = await findOneFun(findOneQuery, email);

    if (response) {
      if (dbName == 'customers') {
        const result = await compare(response.password, password);
        if (result) {
          return res.status(200).json({
            success: true,
            message: "User login successfully.",
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "Unauthorized user",
          });
        }
      } else if (response.password == password) {
        return res.status(200).json({
          success: true,
          message: "User login successfully.",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Unauthorized user",
        });
      };
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    };
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  };
};

exports.customers = async (req, res) => {
  try {
    const findQuery = `SELECT * FROM customers`;
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
  try {
    const { full_name, email, user_name, password, MRTG } = req.body;
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
  try {
    const { full_name, email, user_name } = req.body;
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
    const removeMrtgQuery = `DELETE FROM customers_mrtg WHERE customer_id=${req.params.id}`;
    const [removeMrtgResponse] = await db.promise().query(removeMrtgQuery);

    const removeQuery = `DELETE FROM customers WHERE customers_id=${req.params.id}`;
    const [removeResponse] = await db.promise().query(removeQuery);
   
    if (removeResponse.affectedRows == 1) {
      return res.status(200).json({
        success: true,
        message: "Customers removed successfully",
      });
    };
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  };
};

exports.getOneCustomer = async (req, res) => {
  try {
    const findOneQuery = `SELECT * FROM customers WHERE customers_id=${req.params.id}`;
    const [[findResponse]] = await db.promise().query(findOneQuery);

    const findQuery = `SELECT * FROM customers_mrtg WHERE customer_id=${req.params.id}`
    const [findMrtgResponse] = await db.promise().query(findQuery);

    return res.status(200).json({
      success: true,
      message: "Customer Data",
      customer: findResponse,
      mrtg: findMrtgResponse,
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  };
};

async function findOneFun(query, val) {
  const [[queryResult]] = await db.promise().query(query, [val]);

  if (queryResult) {
    return queryResult;
  } else {
    return false;
  };
};
