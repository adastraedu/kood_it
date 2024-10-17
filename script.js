const bannerText = "< Conoce kood"; // Texto sin el guión bajo ni "it"
const finalText = "<span class='symbols'>&lt;</span> Conoce kood<span class='underscore'>_</span><span class='italic'>it</span> <span class='symbols'>&lt;/&gt;</span>"; // Texto final con guión bajo y símbolos coloreados
const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789¡?#/><%&(!)_-[]+=";
const display = document.getElementById('banner-text');
let index = 0;
let interval;

// Colores aleatorios
const colors = ['magenta', 'yellow', 'cyan'];

// Generar caracteres aleatorios
function generateRandomText(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

// Cambiar el color del guión bajo aleatoriamente
function changeUnderscoreColor() {
    const underscore = document.querySelector('.underscore');
    if (underscore) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        underscore.style.color = randomColor;
    }
}

// Animar la transformación
function animateBanner() {
    index = 0; // Reiniciamos el índice cada vez que la animación comienza
    interval = setInterval(() => {
        if (index < bannerText.length) {
            const randomText = generateRandomText(bannerText.length - index);
            display.innerHTML = bannerText.substring(0, index) + randomText;
            index++;
        } else {
            clearInterval(interval);
            display.innerHTML = finalText; // Mostrar el texto con el guión bajo parpadeante y "it" en cursiva
            setInterval(changeUnderscoreColor, 500); // Cambiar el color cada 0.5 segundos
            setTimeout(() => animateBanner(), 3000); // Reiniciar animación después de 3 segundos
        }
    }, 100);
}

// Esperar un segundo antes de empezar la animación
setTimeout(() => {
    animateBanner();
}, 3000);

document.getElementById('start-button').addEventListener('click', function() {
    window.location.href = 'main.html'; // Redirigir al usuario a main.html
});

const logoImage = document.getElementById('logo-image');

// Cambiar a la nueva imagen cuando el cursor esté sobre el logo
logoImage.addEventListener('mouseover', function() {
    logoImage.src = 'logo-hover.svg'; // Cambia 'logo-hover.svg' por la imagen que tienes
});

// Volver a la imagen original cuando el cursor salga del logo
logoImage.addEventListener('mouseout', function() {
    logoImage.src = 'logo.svg'; // Cambia a la imagen original
});
