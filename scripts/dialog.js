export class Dialog {
    openDialog(card, dialogContent, pet, dialog) {
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
    }

}

