const conn = require("../dbconnection/dbconnect");
const router = require("express").Router();

router.get("/", (req, res) => {
    conn.query("SELECT * FROM customers", (err, result) => {
        if (err) throw err;
        res.json(result)
    })
});

router.post("/", (req, res) => {
    let customer = req.body;
    let cmd = 'INSERT INTO customers SET ?';
    conn.query(cmd, customer, err => {
        if (err) throw err;
        console.log("Customer ", customer);
        res.end();
    })
})

router.post('/update', (req, res) => {
    let { customerid, ...form } = req.body;
    console.log(form);
    let cmd = `UPDATE customers SET ? WHERE customerid = '${customerid}'`;
    conn.query(cmd, form, (err, result) => {
        if (err) throw err;
        res.end();
    })
})

router.delete('/deleteCustomer/:id', (req, res) => {
    let id = req.params.id;
    let cmd = 'DELETE FROM customers WHERE customerid = ?'
    conn.query(cmd, id, (err, result) => {
        if (err){
            res.status(400)
            res.json(err)
            return
        }
        res.end()
    })
});


module.exports = router;