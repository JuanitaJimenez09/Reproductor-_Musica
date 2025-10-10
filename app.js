const contImagenCancion = document.getElementById('imagen-cancion');
const portada = document.getElementById('portada');
const infoCancion = document.getElementById('info_cancion');
const tituloCancion = document.getElementById('titulo');
const artistaCancion = document.getElementById('artista');
const barraPrograso = document.getElementById('barra_prograso');
const inicioCancion = document.getElementById('inicio');
const progresoCancion = document.getElementById('progreso');
const finalCancion = document.getElementById('final');
const controles = document.getElementById('controles');
const btnRepetir = document.getElementById('btn_repetir2');
const btnAtras = document.getElementById('btn_atras');
const btnPlay = document.getElementById('btn_play');
const btnAdelante = document.getElementById('btn_adelante');
const contenedorPlayer = document.getElementById('player_contenedor')
let indiceActual = 0
let canciones = []

document.addEventListener('DOMContentLoaded', () => {
    fetch('canciones.json')
        .then(response => response.json())
        .then(data => {
            canciones = data
            // aqui van el llamado a las funciones de cada funcioanlidad que se van a crear proximamente
            mostrarCancion(indiceActual)
        }).catch(error => {
            console.log('Haga las cosas bien care verga', error)
        })
})
function mostrarCancion(indice) {
    const cancion = canciones[indice];
    portada.setAttribute('src', `${cancion.caratula}`)
    tituloCancion.textContent = `${cancion.nombre}`;
    artistaCancion.textContent = `${cancion.artista}`;
    finalCancion.textContent = `${cancion.duracion}`;

}
btnAdelante.addEventListener('click', () => {
    if (indiceActual === canciones.length - 1) {
        indiceActual = 0
    } else {
        indiceActual++
    }
    mostrarCancion(indiceActual)
})
btnAtras.addEventListener('click', () => {
    if (indiceActual === 0) {
        indiceActual = canciones.length - 1
    } else {
        indiceActual--
    }
    mostrarCancion(indiceActual)
})