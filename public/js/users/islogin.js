// JavaScript Document
			// validate that user is log-in
			/*var auth = firebase.apps[0].auth();

			function validar() {
				var uid = -1
				//const user = auth.currentUser;
				auth.onAuthStateChanged((user) => {
					if (user) {
						uid = user.uid;
					} else {
						document.location.href = 'login.html';
					}
				});
				return uid;
			}

			// close current session
			function salir(){
				auth.signOut().then(() => {
					document.location.href ='login.html';
				}).catch((error)=>{
				   alert('Error al cerrar la sesión: ' + error.message);
				});
			}*/

			// JavaScript Document
// validate that user is log-in
// JavaScript Document
// JavaScript Document
var auth = firebase.apps[0].auth();
let timer; // Variable para almacenar el temporizador

function validar() {
    var uid = -1;
    auth.onAuthStateChanged((user) => {
        if (user) {
            uid = user.uid;
            // Iniciar el temporizador de inactividad
            startIdleTimer();
        } else {
            document.location.href = 'login.html';
        }
    });
    return uid;
}

// Función para cerrar sesión
function salir() {
    auth.signOut().then(() => {
        document.location.href = 'login.html';
    }).catch((error) => {
        alert('Error al cerrar la sesión: ' + error.message);
    });
}

// Funciones para manejar el temporizador de inactividad
function startIdleTimer() {
    timer = setTimeout(salir, 180000); // 180000 ms = 3 minutos
}

// Reiniciar el temporizador
function resetTimer() {
    clearTimeout(timer);
    startIdleTimer();
}

// Escuchar eventos de interacción del usuario
window.onload = function() {
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
};

// Validar al cargar la página
validar();
