// Cart Array to store items
let cart = [];

// Add product to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = {
            id: button.dataset.product,
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
            quantity: 1
        };
        addToCart(product);
    });
});

// Add to Cart function
function addToCart(product) {
    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }
    updateCartDisplay();
}

// Update Cart Display
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItemsDiv.innerHTML += `<p>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>`;
    });

    cartTotal.innerText = total.toFixed(2);
    document.getElementById('cartBtn').innerText = `Cart (${cart.length})`;

    document.getElementById('cartModal').style.display = 'flex';
}

// Close Cart
document.getElementById('closeCartBtn').addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'none';
});

// Proceed to Checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
    alert("Proceeding to Checkout");
    // Implement checkout process here (redirect to checkout page, etc.)
});
