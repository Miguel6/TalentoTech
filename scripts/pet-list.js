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

                card.querySelector("button").addEventListener("click", () => {
                    dialogContent.innerHTML = `
                <div class="pet-card-body">
                    <div class="left">
                        <img src="${pet.image}" alt="imagen de ${pet.name}" style="max-width: 200px; border-radius: 8px; margin-bottom: 10px;">
                    </div>
                    <div class="right">
                        <h2>${pet.name}</h2>
                        <p>${pet.description}</p>
                        <div style="text-align: left;">
                          ${pet.characteristics.map(char => `
                            <div>
                              <strong class="description">${char.description}:</strong> ${char.value}
                            </div>
                          `).join('')}
                        </div>
                        <a href="${pet.adoptUrl}" target="_blank">Ver ubicación en Google Maps</a>
                    </div>
                </div>
`;
                    dialog.showModal();
                });

                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error al cargar las mascotas:", error);
        });
}, 100);
