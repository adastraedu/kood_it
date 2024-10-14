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
}, 1000);

const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();  // Prevenir el envío inmediato del formulario

        let valid = true;
        nameError.textContent = '';
        emailError.textContent = '';

        // Validación de nombre (que no esté vacío)
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'El nombre es requerido.';
            valid = false;
        }

        // Validación básica de email (formato)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Por favor, ingresa un email válido.';
            alert('El correo electrónico ingresado no tiene un formato válido.');
            valid = false;
        }

        // Verificación del checkbox
        const emailConfirmation = document.getElementById('emailConfirmation');
        if (!emailConfirmation.checked) {
            alert('Por favor, confirma que tu correo electrónico es verdadero.');
            valid = false;
        }

        if (valid) {
            try {
                // Enviar el email al backend para su validación
                const response = await fetch('validate_email.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: emailInput.value })
                });

                const result = await response.json();

                if (result.success) {
                    // Email válido, proceder con el envío del formulario
                    alert(result.message);
                    form.submit();  // Enviar el formulario
                } else {
                    // Email inválido
                    alert(result.message);
                }
            } catch (error) {
                console.error('Error al validar el email:', error);
                alert('Ocurrió un error al validar el correo electrónico. Por favor, intenta nuevamente.');
            }
        }
    });
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href*='+ id + ' ]').classList.add('active')

            })
        }
    })
}

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    }, false);
