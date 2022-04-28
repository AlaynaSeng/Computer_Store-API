const conn = require("../dbconnection/dbconnect");
const router = require("express").Router();

router.get("/", (req, res) => {
    conn.query("SELECT * FROM employees", (err, result) => {
        if (err) throw err;
        res.json(result)
    })
});

router.post("/", (req, res) => {
    let employee = req.body;
    let cmd = 'INSERT INTO employees SET ?';
    conn.query(cmd, employee, err => {
        if (err) throw err;
        console.log("Employee ", employee);
        res.end();
    })
})

router.post('/update', (req, res) => {
    let { employeeid, ...form } = req.body;
    console.log(form);
    let cmd = `UPDATE employees SET ? WHERE employeeid = '${employeeid}'`;
    conn.query(cmd, form, (err, result) => {
        if (err) throw err;
        res.end();
    })
})

router.delete('/deleteEmployee/:id', (req, res) => {
    let id = req.params.id;
    let cmd = 'DELETE FROM employees WHERE employeeid = ?'
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