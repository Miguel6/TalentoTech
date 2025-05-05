
fetch('./pages/adopt.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('adopt').innerHTML = html;
    })
    .catch(error => {
        console.error('Error cargando el archivo:', error);
    });



fetch('./pages/home.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('home').innerHTML = html;
    })
    .catch(error => {
        console.error('Error cargando el archivo:', error);
    });