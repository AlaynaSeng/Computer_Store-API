const conn = require("../dbconnection/dbconnect");
const router = require("express").Router();

router.get("/", (req, res) => {
    conn.query("SELECT * FROM shippers", (err, result) => {
        if (err) throw err;
        res.json(result)
    })
});

router.post("/", (req, res) => {
    let shipper = req.body;
    let cmd = 'INSERT INTO shippers SET ?';
    conn.query(cmd, shipper, err => {
        if (err) throw err;
        console.log("Shipper ", shipper);
        res.end();
    })
})

router.post('/update', (req, res) => {
    let { shipperid, ...form } = req.body;
    console.log(form);
    let cmd = `UPDATE shippers SET ? WHERE shipperid = '${shipperid}'`;
    conn.query(cmd, form, (err, result) => {
        if (err) throw err;
        res.end();
    })
})

router.delete('/deleteShipper/:id', (req, res) => {
    let id = req.params.id;
    let cmd = 'DELETE FROM shippers WHERE shipperid = ?'
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