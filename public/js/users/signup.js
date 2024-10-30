// JavaScript Document
		/*	// create local database firestore variable
			var db = firebase.apps[0].firestore();
			var auth = firebase.apps[0].auth();

			// create local from webpage inputs
			const txtNombre = document.querySelector('#txtNombre');
			const txtEmail = document.querySelector('#txtEmail');
			const txtContra = document.querySelector('#txtContra');

			// create local insert button
			const btnInsUser = document.querySelector('#btnInsUser');

			// assign button listener
			btnInsUser.addEventListener('click', function () {
				auth.createUserWithEmailAndPassword(txtEmail.value, txtContra.value)
					.then((userCredential) => {
						const user = userCredential.user;
						db.collection("datosUsuarios").add({
							"idemp": user.uid,
							"usuario": txtNombre.value,
							"email": user.email
						}).then(function (docRef) {
							alert("Usuario agregado satisfactoriamente");
							limpiar();
						}).catch(function (FirebaseError) {
							alert("Error al registrar datos del usuario." + FirebaseError);
						});
					})
					.catch((error) => {
						alert("Error al agregar el nuevo usuario: " + error.message);
					});
			});
			
			function limpiar(){
				txtNombre.value = '';
				txtEmail.value = '';
				txtContra.value = '';
				txtNombre.focus();
			}
		*/

		// JavaScript Document
// create local database firestore variable
var db = firebase.apps[0].firestore();
var auth = firebase.apps[0].auth();

// create local from webpage inputs
const txtNombre = document.querySelector('#txtNombre');
const txtEmail = document.querySelector('#txtEmail');
const txtContra = document.querySelector('#txtContra');

// create local insert button
const btnInsUser = document.querySelector('#btnInsUser');

// assign button listener
btnInsUser.addEventListener('click', function () {
    auth.createUserWithEmailAndPassword(txtEmail.value, txtContra.value)
        .then((userCredential) => {
            const user = userCredential.user;
            // Fecha de creación
            const fechaCreacion = new Date().toISOString(); // Formato ISO 8601
            db.collection("datosUsuarios").add({
                "idemp": user.uid,
                "usuario": txtNombre.value,
                "email": user.email,
                "fechaCreacion": fechaCreacion, // Agregar la fecha de creación
                "ultimoAcceso": fechaCreacion // Inicializar último acceso con la fecha de creación
            }).then(function (docRef) {
                alert("Usuario agregado satisfactoriamente");
                limpiar();
            }).catch(function (FirebaseError) {
                alert("Error al registrar datos del usuario." + FirebaseError);
            });
        })
        .catch((error) => {
            alert("Error al agregar el nuevo usuario: " + error.message);
        });
});

// Llamar a esta función cada vez que el usuario inicie sesión
function actualizarUltimoAcceso(uid) {
    const fechaUltimoAcceso = new Date().toISOString(); // Formato ISO 8601
    db.collection("datosUsuarios").doc(uid).update({
        "ultimoAcceso": fechaUltimoAcceso // Actualizar la fecha de último acceso
    }).catch(function (error) {
        console.error("Error al actualizar la fecha de último acceso: ", error);
    });
}

function limpiar(){
    txtNombre.value = '';
    txtEmail.value = '';
    txtContra.value = '';
    txtNombre.focus();
}
