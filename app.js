
const contImagenCancion = document.getElementById('imagen_cancion');
const portada = document.getElementById('portada');
const infoCancion = document.getElementById('info_cancion');
const tituloCancion = document.getElementById('titulo');
const artistaCancion = document.getElementById('artista');
const barraProgreso = document.getElementById('barra_progreso');
const inicioCancion = document.getElementById('inicio');
const progresoCancion = document.getElementById('progreso');
const finalCancion = document.getElementById('final');
const btnRepetir = document.getElementById('btn_repetir2');
const btnAtras = document.getElementById('btn_atras');
const btnPlay = document.getElementById('btn_play');
const btnAdelante = document.getElementById('btn_adelante');
const btnLista = document.getElementById('btn_lista');
const listaCanciones = document.getElementById('lista_canciones'); 

/* === VARIABLES GLOBALES === */
let indiceActual = 0; /*Índice de la canción actual */
let canciones = [];   /*Arreglo donde se guardan todas las canciones del JSON*/
let audio = new Audio(); /*Elemento de audio que reproducirá la canción*/
let reproduciendo = false; /*Estado del reproductor (true = sonando, false = pausado)*/

/*CARGA DE DATOS DESDE EL ARCHIVO JSON */
document.addEventListener('DOMContentLoaded', () => {
    fetch('canciones.json')
        .then(response => response.json())
        .then(data => {
            canciones = data; /*Se guardan las canciones obtenidas del archivo JSON */
            mostrarCancion(indiceActual); /*Se muestra la primera canción*/
            cargarListaCanciones(); /*Se genera la lista al cargar*/
        })
        .catch(error => {
            console.log('Error al cargar las canciones:', error);
        });
});

/*FUNCIÓN PARA MOSTRAR LA CANCIÓN ACTUAL*/
function mostrarCancion(indice) {
    const cancion = canciones[indice];
    portada.setAttribute('src', cancion.caratula);
    tituloCancion.textContent = cancion.nombre;
    artistaCancion.textContent = cancion.artista;
    finalCancion.textContent = cancion.duracion;

    audio.src = cancion.cancion;
    if (reproduciendo) {
        audio.play();
    }
}

/*FUNCIÓN PARA GENERAR LA LISTA DE CANCIONES*/
function cargarListaCanciones() {
    canciones.forEach((cancion, index) => {
        const item = document.createElement('div');
        item.classList.add('item-cancion');
        item.innerHTML = `
            <img src="${cancion.caratula}" alt="Carátula">
            <div class="info-item">
                <p class="nombre">${cancion.nombre}</p>
                <p class="artista">${cancion.artista}</p>
            </div>
        `;
        item.addEventListener('click', () => {
            indiceActual = index;
            mostrarCancion(indiceActual);
            audio.play();
            reproduciendo = true;
            btnPlay.textContent = '⏸️';
            listaCanciones.classList.add('oculto');
        });
        listaCanciones.appendChild(item);
    });
}

/*BOTÓN PARA MOSTRAR/OCULTAR LISTA*/
btnLista.addEventListener('click', () => {
    listaCanciones.classList.toggle('oculto');
});

/*BOTONES DE CONTROL*/
btnAdelante.addEventListener('click', () => {
    if (indiceActual === canciones.length - 1) {
        indiceActual = 0;
    } else {
        indiceActual++;
    }
    mostrarCancion(indiceActual);
});

btnAtras.addEventListener('click', () => {
    if (indiceActual === 0) {
        indiceActual = canciones.length - 1;
    } else {
        indiceActual--;
    }
    mostrarCancion(indiceActual);
});

btnPlay.addEventListener('click', () => {
    if (!reproduciendo) {
        audio.play();
        reproduciendo = true;
        btnPlay.textContent = '⏸️';
    } else {
        audio.pause();
        reproduciendo = false;
        btnPlay.textContent = '▶️';
    }
});

/*ACTUALIZAR LA BARRA DE PROGRESO*/
audio.addEventListener('timeupdate', () => {
    const progreso = (audio.currentTime / audio.duration) * 100;
    progresoCancion.value = progreso || 0;
    inicioCancion.textContent = formatearTiempo(audio.currentTime);
});

/*ADELANTAR / RETROCEDER DESDE LA BARRA*/
progresoCancion.addEventListener('input', () => {
    const nuevoTiempo = (progresoCancion.value / 100) * audio.duration;
    audio.currentTime = nuevoTiempo;
});

/*BOTÓN REPETIR*/
btnRepetir.addEventListener('click', () => {
    audio.loop = !audio.loop;
    if (audio.loop) {
        btnRepetir.style.color = 'gold';
    } else {
        btnRepetir.style.color = 'white';
    }
});

/*PASAR AUTOMÁTICAMENTE AL TERMINAR*/
audio.addEventListener('ended', () => {
    if (!audio.loop) {
        if (indiceActual === canciones.length - 1) {
            indiceActual = 0;
        } else {
            indiceActual++;
        }
        mostrarCancion(indiceActual);
        audio.play();
    }
});

/*FORMATEAR TIEMPO*/
function formatearTiempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min}:${seg < 10 ? '0' + seg : seg}`;
}
