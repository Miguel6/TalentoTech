let productList = [];
let currentCart = [];
let cartContainer;
let subtotal = 0;
let discount = 0;
let total = 0;

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
                const formattedPrice = product.price.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'});
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

    cartContainer = document.getElementById('cart-container');
    renderCart();
}, 100);


function renderCart() {
    const cart = getCart();
    currentCart = cart;
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Carrito vacío.</p>';
    } else {
        cart.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'cart-item-card';

            const formattedPrice = item.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });

            card.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.urlImage}" alt="${item.name}" />
                </div>
                <div class="cart-item-info">
                    <div class="name">${item.name}</div>
                    <div class="description">${item.description}</div>
                    <div class="price">Precio: ${formattedPrice}</div>
                    <div class="quantity">Cantidad: 1</div>
                    <button class="remove-button" data-index="${index}">Eliminar</button>
                </div>
            `;

            cartContainer.appendChild(card);
        });

        document.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }

    updateTotals();
}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
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
    const updatedCart = getCart();
    updatedCart.push(product);
    saveCart(updatedCart);
    renderCart();
}


function updateTotals() {
    subtotal = currentCart.reduce((acc, item) => acc + item.price, 0);
    discount = subtotal >= CONFIG.DISCOUNT_LIMIT ? subtotal * (CONFIG.DISCOUNT_PERCENTAGE / 100) : 0;
    total = subtotal - discount;

    const formattedSubtotal = subtotal.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'});
    const formattedDiscount = discount.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'});
    const formattedTotal = total.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'});

    document.getElementById('subtotal-value').textContent = formattedSubtotal;
    document.getElementById('discount-value').textContent = formattedDiscount;
    document.getElementById('total-value').textContent = formattedTotal;

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.disabled = total <= 0;
    }
}
