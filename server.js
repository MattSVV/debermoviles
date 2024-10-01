const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');  // para permitir peticiones entre servidores

const app = express();
const port = 3000;

// Middleware para recibir datos en formato JSON
app.use(express.json());
app.use(cors());  // Permitir peticiones desde cualquier dominio (útil para desarrollo)

// Configuración de conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'teacherdb',
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.log('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a MySQL');
  }
});

// Ruta de ejemplo para obtener datos de la base de datos
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM teacher_models';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error en la consulta');
    } else {
      res.json(results);
    }
  });
});


app.get("/peliculas", (req, res) =>{
  const query = 'SELECT * FROM pelicuals';
  db.query(query, (err,results) =>{
    if(err){
      res.status(500).send('Error en la consulta');
    } else {
      res.json(results);
    }
  });
});

app.post("/peliculas", (req, res) => {
  const {id, titulo, enlace, imagen} = req.body;
  const query = 'INSERT INTO `pelicuals` (`id`, `titulo`, `enlace`, `imagen`)  VALUES (?,?,?,?);';
  db.query(query, [id, titulo, enlace, imagen], (err, results) =>{
    if (err){
      res.status(500).send("Error al insertar");
    }else{
      res.status(200).send("Pelicula bien insertada");
    }
  });
});

app.get("/peliculas/:id", (req, res) =>{
  const {id} = req.params;

  const query = "SELECT * FROM pelicuals WHERE id = ?"


  db.query(query, [id], (err, results) =>{
    if(err){
      return res.status(500).send("hay un error");
    }
    if (results.length === 0){
      return res.status(404).send("No existe tu peliculas amigo");
    }

    res.status(200).json(results[0]);
  })
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://192.168.1.23:${port}`);
});
