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

            pets.forEach(pet => {
                const card = document.createElement("div");
                card.className = "pet-adoption-card";

                card.innerHTML = `
        <div class="image-profile-container">
          <img src="${pet.image}" alt="imagen de perfil" class="logo-image">
        </div>
        <div class="description-card-container">
          <div class="name">${pet.name}</div>
          <div class="description">${pet.description}</div>
          <div class="characteristic-container">
            ${pet.characteristics.map(char => `
              <div class="characteristic">
                <div class="material-symbols-outlined icon">${char.icon}</div>
                <div class="description">${char.description}</div>
              </div>
            `).join('')}
          </div>
          <button class="generic-button adopt-pet" onclick="window.open('${pet.adoptUrl}', '_blank')">Adoptar</button>
        </div>
      `;

                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error al cargar las mascotas:", error);
        });
}, 100)
