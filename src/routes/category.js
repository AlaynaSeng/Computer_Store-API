const conn = require("../dbconnection/dbconnect");
const router = require("express").Router();

router.get("/", (req, res) => {
    conn.query("SELECT * FROM categories", (err, result) => {
        if (err) throw err;
        res.json(result)
    })
});

router.post("/", (req, res) => {
    let category = req.body;
    let cmd = 'INSERT INTO categories SET ?';
    conn.query(cmd, category, err => {
        if (err) throw err;
        console.log("Category ", category);
        res.end();
    })
})

router.post('/update', (req, res) => {
    let { categoryid, ...form } = req.body;
    console.log(form);
    let cmd = `UPDATE categories SET ? WHERE categoryid = '${categoryid}'`;
    conn.query(cmd, form, (err, result) => {
        if (err) throw err;
        res.end();
    })
})

router.delete('/deleteCategory/:id', (req, res) => {
    let id = req.params.id;
    let cmd = 'DELETE FROM categories WHERE categoryid = ?'
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