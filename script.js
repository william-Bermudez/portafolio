
document.addEventListener('DOMContentLoaded', function () {
    inicializarNavegacion();
    inicializarAnimacionesScroll();
    inicializarParallax();
    inicializarEfectosTarjeta();
    inicializarReproductor();
});


function inicializarNavegacion() {
    const scrollHero = document.querySelector('.scroll-hero');
    if (scrollHero) {
        scrollHero.addEventListener('click', function () {
            const siguienteSeccion = document.querySelector('.seccion-proyectos');
            if (siguienteSeccion) {
                siguienteSeccion.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    window.addEventListener('scroll', function () {
        const barraNav = document.querySelector('.barra-navegacion');
        if (window.scrollY > 50) {
            barraNav.style.background = 'rgba(15, 23, 42, 0.98)';
            barraNav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            barraNav.style.background = 'rgba(15, 23, 42, 0.95)';
            barraNav.style.boxShadow = 'none';
        }
    });

    const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.enlace-nav').forEach(enlace => {
        if (enlace.getAttribute('href') === paginaActual) {
            enlace.classList.add('activo');
        }
    });
}

function inicializarAnimacionesScroll() {
    const opcionesObservador = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = '1';
                entrada.target.style.transform = 'translateY(0)';
            }
        });
    }, opcionesObservador);


    const tarjetas = document.querySelectorAll('.tarjeta');
    tarjetas.forEach(tarjeta => {
        observador.observe(tarjeta);
    });

    const seccionesPerfil = document.querySelectorAll('.seccion-perfil');
    seccionesPerfil.forEach(seccion => {
        observador.observe(seccion);
    });
}


function inicializarParallax() {
    let ejecutando = false;

    window.addEventListener('scroll', function () {
        if (!ejecutando) {
            window.requestAnimationFrame(function () {
                const desplazamiento = window.pageYOffset;
                const contenidoHero = document.querySelector('.contenido-hero');
                const contenidoPerfil = document.querySelector('.contenido-perfil');

                if (contenidoHero) {
                    contenidoHero.style.transform = `translateY(${desplazamiento * 0.3}px)`;
                    contenidoHero.style.opacity = 1 - (desplazamiento / 700);
                }

                if (contenidoPerfil) {
                    contenidoPerfil.style.transform = `translateY(${desplazamiento * 0.3}px)`;
                }

                ejecutando = false;
            });

            ejecutando = true;
        }
    });
}


function inicializarEfectosTarjeta() {
    const tarjetas = document.querySelectorAll('.tarjeta');

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('mouseenter', function () {

            const img = this.querySelector('.imagen-tarjeta img');
            if (img) {
                img.style.filter = 'brightness(1.1) contrast(1.05)';
            }


            const etiqueta = this.querySelector('.etiqueta-tarjeta');
            if (etiqueta) {
                etiqueta.style.transform = 'scale(1.05)';
            }
        });

        tarjeta.addEventListener('mouseleave', function () {
            const img = this.querySelector('.imagen-tarjeta img');
            if (img) {
                img.style.filter = 'brightness(1) contrast(1)';
            }

            const etiqueta = this.querySelector('.etiqueta-tarjeta');
            if (etiqueta) {
                etiqueta.style.transform = 'scale(1)';
            }
        });


        tarjeta.addEventListener('mousemove', function (evento) {
            const rectangulo = this.getBoundingClientRect();
            const x = evento.clientX - rectangulo.left;
            const y = evento.clientY - rectangulo.top;

            const centroX = rectangulo.width / 2;
            const centroY = rectangulo.height / 2;

            const rotarX = (y - centroY) / 20;
            const rotarY = (centroX - x) / 20;

            this.style.transform = `translateY(-15px) rotateX(${rotarX}deg) rotateY(${rotarY}deg)`;
        });

        tarjeta.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
}
function animarValor(elemento, inicio, fin, duracion) {
    let marcaTiempo = null;
    const paso = (marcaActual) => {
        if (!marcaTiempo) marcaTiempo = marcaActual;
        const progreso = Math.min((marcaActual - marcaTiempo) / duracion, 1);
        elemento.textContent = Math.floor(progreso * (fin - inicio) + inicio);
        if (progreso < 1) {
            window.requestAnimationFrame(paso);
        }
    };
    window.requestAnimationFrame(paso);
}


if ('IntersectionObserver' in window) {
    const observadorImagenes = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                const img = entrada.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('cargada');
                observador.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        observadorImagenes.observe(img);
    });
}


document.querySelectorAll('a[href^="#"]').forEach(ancla => {
    ancla.addEventListener('click', function (evento) {
        evento.preventDefault();
        const objetivo = document.querySelector(this.getAttribute('href'));
        if (objetivo) {
            objetivo.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



const audio = document.getElementById('audioPlayer');
const btnPlay = document.getElementById('btnPlay');
const iconoPlay = document.getElementById('iconoPlay');
const progresoActual = document.getElementById('progresoActual');
const tiempoActual = document.getElementById('tiempoActual');
const tiempoTotal = document.getElementById('tiempoTotal');
const reproductor = document.getElementById('reproductorMusica');




function togglePlay() {
    if (audio && audio.paused) {
        audio.play();
        if (iconoPlay) {
            iconoPlay.innerHTML = '<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>';
        }
    } else if (audio) {
        audio.pause();
        if (iconoPlay) {
            iconoPlay.innerHTML = '<path d="M8 5v14l11-7z"/>';
        }
    }
}


if (audio) {
    audio.addEventListener('timeupdate', () => {
        const progreso = (audio.currentTime / audio.duration) * 100;
        if (progresoActual) {
            progresoActual.style.width = progreso + '%';
        }
        if (tiempoActual) {
            tiempoActual.textContent = formatearTiempo(audio.currentTime);
        }
    });


    audio.addEventListener('loadedmetadata', () => {
        if (tiempoTotal) {
            tiempoTotal.textContent = formatearTiempo(audio.duration);
        }
    });


    audio.volume = 0.4;
}


function cambiarProgreso(e) {
    if (!audio) return;
    const barra = e.currentTarget;
    const clickX = e.offsetX;
    const ancho = barra.offsetWidth;
    const duracion = audio.duration;
    audio.currentTime = (clickX / ancho) * duracion;
}


function cambiarVolumen(valor) {
    if (audio) {
        audio.volume = valor / 100;
    }
}


function adelantar() {
    if (audio) {
        audio.currentTime += 10;
    }
}


function retroceder() {
    if (audio) {
        audio.currentTime -= 10;
    }
}


function formatearTiempo(segundos) {
    if (isNaN(segundos)) return '0:00';
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min}:${seg < 10 ? '0' : ''}${seg}`;
}




function toggleReproductor() {
    const btnToggle = document.getElementById('btnToggle');
    if (reproductor) {
        if (reproductor.classList.contains('reproductor-minimizado')) {
            reproductor.classList.remove('reproductor-minimizado');
            if (btnToggle) {
                btnToggle.textContent = '▼';
            }
        } else {
            reproductor.classList.add('reproductor-minimizado');
            if (btnToggle) {
                btnToggle.textContent = '▲';
            }
        }
    }
}

function minimizarReproductor() {
    toggleReproductor();
}

function maximizarReproductor() {
    toggleReproductor();
}