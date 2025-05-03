fetch('./../jsons/bubble-adopt-pets-response.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo JSON");
        }
        return response.json();
    })
    .then(pets => {
        const container = document.getElementById("pet-container");

        pets.forEach(pet => {
            const card = document.createElement("span");
            card.className = "pet-card";
            card.innerHTML = `
                <span class="sphere-image-wrapper">
                  <img src="${pet.image}" alt="Mascota ${pet.name}">
                </span>
                <h2 class="pet-name">${pet.name}</h2>
                <h3>${pet.description}</h3>
                <a href="#" class="adopt-button">Conocelo</a>`;
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Error al cargar las mascotas:", error);
    });
