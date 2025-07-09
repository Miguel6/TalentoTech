import {Dialog} from "./dialog.js";

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

            const dialog = document.getElementById("pet-dialog");
            const dialogContent = document.getElementById("dialog-content");
            const closeDialog = document.getElementById("close-dialog");

            closeDialog.addEventListener("click", () => dialog.close());

            pets.forEach(pet => {
                const card = document.createElement("div");
                card.className = "pet-adoption-card";

                card.innerHTML = `
          <div class="image-profile-container">
            <img src="${pet.image}" alt="imagen de perfil de ${pet.name}" class="logo-image">
          </div>
          <div class="description-card-container">
            <div class="name">${pet.name}</div>
            <div class="description">${pet.description}</div>
            <div class="characteristic-container">
              ${pet.characteristics.map(char => `
                <div class="characteristic">
                  <div class="material-symbols-outlined icon">${char.icon}</div>
                  <div class="description">${char.value}</div>
                </div>
              `).join('')}
            </div>
            <button class="generic-button adopt-pet">Conocelo</button>
          </div>
        `;
                new Dialog().openDialog(card, dialogContent, pet, dialog);
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error al cargar las mascotas:", error);
        });
}, 100);
