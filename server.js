// server.js

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000; // Important for Heroku

// ---- CONFIGURACIÓN DE LOGIN ----
// ¡IMPORTANTE! Cambia estos valores por algo único y secreto.
const ADMIN_USER = "ICB";
const ADMIN_PASS = "Icb123";
// ---------------------------------

// Middleware para entender los datos que vienen del formulario de login
app.use(express.urlencoded({ extended: true }));
// Sirve los archivos estáticos (HTML, CSS, JS del frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal: Muestra la página de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para procesar el login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        // Si las credenciales son correctas, redirige a la página del video.
        // Usamos una URL no obvia para un toque extra de privacidad.
        res.redirect('/w/video.presentacion');
    } else {
        // Si no, redirige de vuelta al login con un parámetro de error
        res.redirect('/?error=1');
    }
}); 

// Ruta secreta para el video
app.get('/w/video.presentacion', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'video.html'));
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});