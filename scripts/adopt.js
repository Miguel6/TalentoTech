import {Dialog} from "./dialog.js";
document.querySelector('.adoption-list-button').addEventListener('click', onMeetThemClick);

fetch('./../pages/dialog.html')
    .then(response => response.text())
    .then(html => {
        document.body.insertAdjacentHTML('beforeend', html);

        const dialog = document.getElementById('pet-dialog');
        const closeDialog = document.getElementById('close-dialog');

        closeDialog.addEventListener('click', () => dialog.close());
    })
    .catch(error => console.error('Error cargando dialog:', error));


setTimeout(() => {
    fetch(CONFIG.PETS_TO_ADOPT_API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo JSON");
            }
            return response.json();
        })
        .then(pets => {
            const container = document.getElementById("pet-container");
            const top3 = pets.slice(0, 3);

            const dialog = document.getElementById("pet-dialog");
            const dialogContent = document.getElementById("dialog-content");
            const closeDialog = document.getElementById("close-dialog");
            closeDialog.addEventListener("click", () => dialog.close());

            top3.forEach(pet => {
                const card = document.createElement("span");
                card.className = "pet-card";
                card.innerHTML = `
                <span class="sphere-image-wrapper">
                  <img src="${pet.image}" alt="Mascota ${pet.name}">
                </span>
                <h2 class="pet-name">${pet.name}</h2>
                <h3>${pet.description}</h3>
                <button class="generic-button meet-him-button">Conocelo</a>`;

                new Dialog().openDialog(card, dialogContent, pet, dialog);
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error al cargar las mascotas:", error);
        });
}, 100)

function onMeetThemClick()
{
    let baseURL= '';
    if (window.location.hostname === 'localhost') {
        baseURL = '/TalentoTech/';
    } else if (window.location.hostname.includes('netlify.app')) {
        baseURL = '/';
    } else {
        baseURL = '/';
    }
    window.open(location.origin + baseURL + '/pages/pet-list.html', '_blank')
}
