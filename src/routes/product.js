const conn = require("../dbconnection/dbconnect");
const router = require("express").Router();

router.get("/", (req, res) => {
    conn.query(`SELECT p.productid, p.name, p.unit, p.price, p.categoryid, c.name AS cname, p.supplierid, su.name AS sname FROM products p
                INNER JOIN categories c ON p.categoryid = c.categoryid
                INNER JOIN suppliers su ON p.supplierid = su.supplierid`, 
    (err, result) => {
        if (err) throw err;
        res.json(result)
    })
});

// router.get("/category", (req, res) => {

// })

router.post("/", (req, res) => {
    let product = req.body;
    let cmd = 'INSERT INTO products SET ?';
    conn.query(cmd, product, err => {
        if (err) throw err;
        console.log("Product ", product);
        res.end();
    })
})

router.post('/update', (req, res) => {
    let { productid, ...form } = req.body;
    console.log(form);
    let cmd = `UPDATE products SET ? WHERE productid = '${productid}'`;
    conn.query(cmd, form, (err, result) => {
        if (err) throw err;
        res.end();
    })
})

router.delete('/deleteProduct/:id', (req, res) => {
    let id = req.params.id;
    let cmd = 'DELETE FROM products WHERE productid = ?'
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