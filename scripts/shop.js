let productList = [];
let cartContainer;

setTimeout(() => {
    fetch(CONFIG.PRODUCTS_API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo JSON");
            }
            return response.json();
        })
        .then(products => {
            productList = products;
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
            
            <button class="generic-button add-button" onclick="addToCart(${product.id})">Agregar</button>
          </div>
        `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });

    cartContainer = document.getElementById('cart');
    renderCart();
}, 100);


function renderCart() {
    const cart = getCart();
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Carrito vacío.</p>';
    } else {
        cart.forEach(item => {
            const div = document.createElement('div');
            div.textContent = `${item.name} - $${item.price}`;
            cartContainer.appendChild(div);
        });
    }
}

function getCart() {
    const cart = sessionStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = productList.find(p => p.id == productId);
    const cart = getCart();
    cart.push(product);
    saveCart(cart);
    renderCart();
}


