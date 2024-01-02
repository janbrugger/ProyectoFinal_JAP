//app.js
const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE SECRETA"
const categoryRouter = require("./routes/categoryRouter");
const categoryProductRouter = require("./routes/categoryProductRouter");
const productsRouter = require("./routes/productsRouter");
const commentsRouter = require("./routes/commentsRouter");
const buyRouter = require("./routes/buyRouter");
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: "localhost", 
  user: "root", 
  password: "trece00R", 
  database: "carrito",
  connectionLimit: 10});

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static("public"));

// GET a carrito
app.get("/articles", async(req, res) => {
  let conn;
  try {

	conn = await pool.getConnection();
	const rows = await conn.query(
    "SELECT id, name, quantity, cost, currency, image FROM articles");

      res.json(rows);
  }catch{
    res.status(500).json({message:"Se rompió el servidor"})
  }

   finally {
	if (conn) conn.release(); //release to pool
  }
});

// POST a carrito
app.post("/articles", async (req, res) => {
  /* La propiedad "body" del request permite acceder a los datos 
       que se encuentran en el cuerpo de la petición */

       let conn;
       try {
     
       conn = await pool.getConnection();
       const response = await conn.query(
        `INSERT INTO articles(id, name, quantity, cost, currency, image) VALUE(?, ?, ?, ?, ?, ?)`,
        [req.body.id, req.body.name, req.body.quantity, req.body.cost, req.body.currency, req.body.image]
        );
     
           res.json({id: parseInt(response.insertId), ...req.body});
       }catch{
         res.status(500).json({message:"Se rompió el servidor"})
       }
     
        finally {
       if (conn) conn.release(); //release to pool
       }
});

// PUT a carrito
app.put("/articles/:id", async (req, res) => {
  /*
     Para que se pueda actualizar el objeto asociado al índice indicado en la URL 
   */
     let conn;
     try {
   
     conn = await pool.getConnection();
     const response = await conn.query(
      `UPDATE articles SET name=?, quantity=?, cost=?, currency=?, image=? WHERE id=?`,
       [req.body.name, req.body.quantity, req.body.cost, req.body.currency, req.body.image, req.params.id]
      );
   
         res.json({id: parseInt(response.insertId), ...req.body});
     }catch{
       res.status(500).json({message:"Se rompió el servidor"})
     }
   
      finally {
     if (conn) conn.release(); //release to pool
     }
});

// DELETE a carrito
app.delete("/articles/:id", async(req, res) => {
  /*
     Para que se pueda eliminar el objeto asociado al índice indicado en la URL 
   */
     let conn;
     try {
   
     conn = await pool.getConnection();
     const response = await conn.query(
       `DELETE FROM articles WHERE id=?;`, req.params.id);
   
         res.json({index: parseInt(response.insertId), ...req.body});
     }catch{
       res.status(500).json({message:"Se rompió el servidor"})
     }
   
      finally {
     if (conn) conn.release(); //release to pool
     }
    });


// Auth
app.post("/login", (req,res)=>{
  const {username, password} = req.body;

  if(username ==="admin@email.com" && password === "admin"){
    const token = jwt.sign({username}, SECRET_KEY);
    res.status(200).json({token});
    console.log("Inicio de sesión correcto")
  }else{
    res.status(401).json({messaje: "Usuario y/o contraseña incorrecta"});
  }
})


// Middleware que autoriza a realizar peticiones a /api/categories
app.use("/api/categories", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});
//----

// Middleware que autoriza a realizar peticiones a /api/categories_products
app.use("/api/categories_products", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});
//----

// Middleware que autoriza a realizar peticiones a /api/products
app.use("/api/products", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});
//----

// Middleware que autoriza a realizar peticiones a /api/cart
app.use("/api/cart", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});
//----




app.use("/api/categories", categoryRouter); //categorias

app.use("/api/categories_products", categoryProductRouter); //productos segun la categoria

app.use("/api/products", productsRouter); //detalles de cada producto

app.use("/api/products_comments", commentsRouter); //comentarios de cada producto

app.use("/api/cart", buyRouter); //buy message


app.listen(port, () => {
  console.log(`Servidor corriendo en http:localhost:${port}`);
});

