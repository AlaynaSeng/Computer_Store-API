const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");

const customerRoutes = require("./routes/customer")
const employeeRoutes = require("./routes/employee")
const categoryRoutes = require("./routes/category")
const shipperRoutes = require("./routes/shipper")
const supplierRoutes = require("./routes/supplier")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")

const conn = require('./dbconnection/dbconnect');

conn.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL DB');
});


app.use(express.json());
app.use(cors());

app.use("/customer", customerRoutes)
app.use("/employee", employeeRoutes)
app.use("/category", categoryRoutes)
app.use("/shipper", shipperRoutes)
app.use("/supplier", supplierRoutes)
app.use("/product", productRoutes)
app.use("/order", orderRoutes)

app.listen(port, () => {
    console.log("Listening on port: ", port);
});


