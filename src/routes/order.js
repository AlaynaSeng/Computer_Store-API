const conn = require("../dbconnection/dbconnect");
const router = require("express").Router();

router.get("/", (req, res) => {
    conn.query(`SELECT o.orderid, o.customerid, c.fname AS cname, o.employeeid, e.fname AS ename, o.date, o.shipperid, sh.name AS sname, o.productid, p.name AS pname FROM orders o
                INNER JOIN customers c ON o.customerid = c.customerid
                INNER JOIN employees e ON o.employeeid = e.employeeid
                INNER JOIN shippers sh ON o.shipperid = sh.shipperid
                INNER JOIN products p ON o.productid = p.productid`, 
    (err, result) => {
        if (err) throw err;
        res.json(result)
    })
});

router.post("/", (req, res) => {
    let order = req.body;
    let cmd = 'INSERT INTO orders SET ?';
    conn.query(cmd, order, err => {
        if (err) throw err;
        console.log("Order ", order);
        res.end();
    })
})

router.post('/update', (req, res) => {
    let { orderid, ...form } = req.body;
    console.log(form);
    let cmd = `UPDATE orders SET ? WHERE orderid = '${orderid}'`;
    conn.query(cmd, form, (err, result) => {
        if (err) throw err;
        res.end();
    })
})

router.delete('/deleteOrder/:id', (req, res) => {
    let id = req.params.id;
    let cmd = 'DELETE FROM orders WHERE orderid = ?'
    conn.query(cmd, id, (err, result) => {
        if (err) throw err;
        res.end();
    })
});


module.exports = router;