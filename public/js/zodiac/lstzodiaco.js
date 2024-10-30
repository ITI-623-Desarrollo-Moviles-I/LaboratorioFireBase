/*var db = firebase.apps[0].firestore();
const contenedorTarjetas = document.querySelector('#tarjetas-container');
db.collection("datosZodiaco").orderBy('posic', 'asc').get().then(function(query) {
    let salida = '';
    query.forEach(function(doc) {
        salida += `
            <div class="col-md-4">
                <div class="card">
                    <img src="${doc.data().url}" class="card-img-top img-fluid img-thumbnail" alt="${doc.data().signo}">
                    <div class="card-body">
                        <h5 class="card-title">${doc.data().signo}</h5>
                        <p class="card-text"><strong>Rango:</strong> ${doc.data().rango}</p>
                        <p class="card-text"><strong>Elemento:</strong> ${doc.data().elemento}</p>
                        <p class="card-text"><strong>Astro:</strong> ${doc.data().astro}</p>
                        <p class="card-text"><strong>Piedra Preciosa:</strong> ${doc.data().piedra}</p>
                    </div>
                </div>
            </div>
        `;
    });
    contenedorTarjetas.innerHTML = salida;
});*/
var db = firebase.apps[0].firestore();
const contenedorTarjetas = document.querySelector('#tarjetas-container');

db.collection("datosZodiaco").orderBy('posic', 'asc').get().then(function(query) {
    let salida = '';
    query.forEach(function(doc) {
        const data = doc.data();
        salida += `
            <div class="col-md-4">
                <div class="card">
                    <img src="${data.url}" class="card-img-top img-fluid img-thumbnail" alt="${data.signo}">
                    <div class="card-body">
                        <h5 class="card-title">${data.signo}</h5>
                        <p class="card-text"><strong>Rango:</strong> ${data.rango}</p>
                        <p class="card-text"><strong>Elemento:</strong> ${data.elemento}</p>
                        <p class="card-text"><strong>Astro:</strong> ${data.astro}</p>
                        <p class="card-text"><strong>Piedra Preciosa:</strong> ${data.piedra}</p>
                        <a href="editar.html?id=${doc.id}" class="btn btn-primary">Editar</a>
                    </div>
                </div>
            </div>
        `;
    });
    contenedorTarjetas.innerHTML = salida;
});

