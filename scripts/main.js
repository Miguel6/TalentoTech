
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


function openShop()
{
    let baseURL= '';
    if (window.location.hostname === 'localhost') {
        baseURL = '/TalentoTech/';
    } else if (window.location.hostname.includes('netlify.app')) {
        baseURL = '/';
    } else {
        baseURL = '/';
    }
    window.open(location.origin + baseURL + '/pages/shop.html', '_blank')
}
