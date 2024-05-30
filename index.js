// Importamos las lbrerias y las guardamos en unas constantes.
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

// Servidor de express se le coloca el nombre de app
const app = express()
app.use(express.json())
app.use(cors()) //Nadamas entrar quien tenga aceso, por eso el cors se queda vasio, para que sea publico

// Iniciiamos el servidor
const PORT = 3000

app.listen(PORT, () => {
     console.log(`Servidor creado en http://localhost:${PORT}`)
})

// Conexion con mySQL

const conection = mysql.createConnection({
     host: "brozy9jovz6yupghhpty-mysql.services.clever-cloud.com",
     user: "ui36ek2jc44sglcd",
     password: "1BFnvjwcwK4JkW01rmi0",
     port: 3306,
     database: "brozy9jovz6yupghhpty"
})

conection.connect((err) => {
     if (err) {
          console.error(err.message || "No se pudo conectar a la base de datos")
     } else {
          console.log('Conectado a la base de Datos')
     }
})

app.get ( "/", (req, res) => {
     conection.query ( "SELECT * FROM users", (e, result) => {
          if ( e ){
               res.status ( 500 ).json ( 'message: ', e.message || "No se pudo conectar a la base de datos" )
          } else {
               res.status ( 200 ).json ( result )
          } 
     })
});

app.post ( '/', (req, res) => {
     const {Nombre} = req.body 
     conection.query ( `INSERT INTO users VALUES (DEFAULT, "${Nombre}")`, ( e, result ) =>{
          if ( e ){
               res.status ( 500 ).json ( 'message: ', e.message || "No se pudo conectar a la base de datos" )
          } else {
               res.status ( 200 ).json ( result )
          } 
     } )
})

// Actualizar y Eliminar
     // Es patch, porque solo actualizaremos un atributo
app.patch ( '/', ( req, res ) => {
     const {ID, Nombre} = req.body
     conection.query ( `UPDATE users SET Nombre="${Nombre}" WHERE ID=${ID}; `, ( e, result ) => {
          if ( e ) {
               res.status ( 500 ).json ( 'message', e.message || "No se puede actualizar la base de datos" )
          } else {
               res.status ( 200 ).json ( result )
          }
     } )
} )

// Eliminar una tupla

app.delete ( '/', ( req, res ) => {
     const {ID} = req.body
     conection.query ( `DELETE FROM users WHERE ID=${ID}`, ( e, result ) => {
          if ( e ) {
               res.status ( 500 ).json ( 'message', e.message || "No se puede eliminar la tupla")
          }else {
               res.status ( 200 ).json ( result )
          }
     } )
})