// JavaScript Document
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

// Elementos del formulario
const txtPosic = document.querySelector('#txtPosic');
const txtSigno = document.querySelector('#txtSigno');
const txtRango = document.querySelector('#txtRango');
const txtArchi = document.querySelector('#txtArchi');
const txtElemento = document.querySelector('#txtElemento');
const txtAstro = document.querySelector('#txtAstro');
const txtPiedra = document.querySelector('#txtPiedra');
const btnUpdate = document.querySelector('#btnUpdate');

// Obtener el ID del signo zodiacal desde la URL
const params = new URLSearchParams(window.location.search);
const signoId = params.get('id');

// Cargar datos del signo zodiacal
if (signoId) {
    db.collection("datosZodiaco").doc(signoId).get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            txtPosic.value = data.posic;
            txtSigno.value = data.signo;
            txtRango.value = data.rango;
            txtElemento.value = data.elemento;
            txtAstro.value = data.astro;
            txtPiedra.value = data.piedra;
        } else {
            console.log("No se encontró el documento.");
        }
    }).catch((error) => {
        console.error("Error al obtener el documento:", error);
    });
}

// Actualizar el signo zodiacal
btnUpdate.addEventListener('click', function() {
    const archivo = txtArchi.files[0];
    let uploadPromise = Promise.resolve(); // Inicializa una promesa resuelta

    if (archivo) {
        const nomarch = archivo.name;
        const metadata = {
            contentType: archivo.type
        };
        uploadPromise = container.child('zodiaco/' + nomarch).put(archivo, metadata)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                // Actualiza el documento con la nueva URL de la imagen
                return db.collection("datosZodiaco").doc(signoId).update({
                    "posic": parseInt(txtPosic.value),
                    "signo": txtSigno.value,
                    "rango": txtRango.value,
                    "url": url,
                    "elemento": txtElemento.value,
                    "astro": txtAstro.value,
                    "piedra": txtPiedra.value
                });
            });
    } else {
        // Si no se sube una nueva imagen, solo se actualizan los demás campos
        uploadPromise = db.collection("datosZodiaco").doc(signoId).update({
            "posic": parseInt(txtPosic.value),
            "signo": txtSigno.value,
            "rango": txtRango.value,
            "elemento": txtElemento.value,
            "astro": txtAstro.value,
            "piedra": txtPiedra.value
        });
    }

    uploadPromise.then(() => {
        alert("Registro actualizado correctamente");
        limpiar();
    }).catch((error) => {
        alert("Error al actualizar el registro: " + error);
    });
});

// Función para limpiar el formulario
function limpiar() {
    txtPosic.value = '';
    txtSigno.value = '';
    txtRango.value = '';
    txtArchi.value = '';
    txtElemento.value = 'Fuego'; // Valor predeterminado
    txtAstro.value = '';
    txtPiedra.value = '';
    txtPosic.focus();
}
