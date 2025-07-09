setTimeout(() => {
    fetch(CONFIG.PRODUCTS_API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo JSON");
            }
            return response.json();
        })
        .then(products => {
            const container = document.getElementById("product-container");

            products.forEach(product => {
                const card = document.createElement("div");
                const formattedPrice = product.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
                card.className = "product-card";

                card.innerHTML = `
          <div class="image-profile-container">
            <img src="${product.urlImage}" alt="imagen de perfil de ${product.name}" class="logo-image">
          </div>
          <div class="description-card-container">
            <div class="name">${product.name}</div>
            <div class="description">${product.description}</div>
            <span class="one-line">
                <div class="stock">Stock: ${product.stock}</div>
                <div class="price">Precio: ${formattedPrice}</div>
            </span>
            
            <button class="generic-button add-button">Agregar</button>
          </div>
        `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
}, 100);
