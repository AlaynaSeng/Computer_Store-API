const conn = require("../dbconnection/dbconnect");
const router = require("express").Router();

router.get("/", (req, res) => {
    conn.query("SELECT * FROM suppliers", (err, result) => {
        if (err) throw err;
        res.json(result)
    })
});

router.post("/", (req, res) => {
    let supplier = req.body;
    let cmd = 'INSERT INTO suppliers SET ?';
    conn.query(cmd, supplier, err => {
        if (err) throw err;
        console.log("Supplier ", supplier);
        res.end();
    })
})

router.post('/update', (req, res) => {
    let { supplierid, ...form } = req.body;
    console.log(form);
    let cmd = `UPDATE suppliers SET ? WHERE supplierid = '${supplierid}'`;
    conn.query(cmd, form, (err, result) => {
        if (err) throw err;
        res.end();
    })
})

router.delete('/deleteSupplier/:id', (req, res) => {
    let id = req.params.id;
    let cmd = 'DELETE FROM suppliers WHERE supplierid = ?'
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
