let cart = [];
let cartCount = 0;
let totalPrice = 0;

/**
 * Adds a product to the cart and updates the cart count and total price.
 * @param {string} productName - The name of the product.
 * @param {number} price - The price of the product.
 */
function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    cartCount++;
    totalPrice += price;

    document.getElementById('cart-count').innerText = cartCount;
    updateCartDisplay();
    alert(`${productName} has been added to your cart!`);
}

/**
 * Updates the cart display section with items, total count, and price.
 */
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalItems = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');

    // Clear the existing cart items
    cartItemsContainer.innerHTML = '';

    // Display each item in the cart
    cart.forEach((item, index) => {
        const itemElement = document.createElement('p');
        itemElement.textContent = `${index + 1}. ${item.name} - ₹${item.price}`;
        cartItemsContainer.appendChild(itemElement);
    });

    // Update total items and price
    totalItems.innerText = cartCount;
    totalPriceElement.innerText = totalPrice;
}

/**
 * Handles the proceed to payment action by showing a summary.
 */
/**
 * Handles the proceed to payment action by showing a summary and payment options.
 */
/**
 * Opens UPI payment links with pre-filled details.
 */
function initiateUpiPayment() {
    const upiBaseUrl = "upi://pay";
    const upiId = "9182660766@ybl"; // Replace with your UPI ID
    const payeeName = "SeedShop"; // Replace with your payee name
    const transactionNote = "Purchase from SeedShop"; // Add a description
    const currency = "INR"; // Fixed currency
    const amount = totalPrice; // Use cart total price

    // UPI payment link
    const upiLink = `${upiBaseUrl}?pa=${upiId}&pn=${payeeName}&tn=${transactionNote}&am=${amount}&cu=${currency}`;


    // Update UPI app links
    document.getElementById("gpay-link").href = upiLink;
    document.getElementById("phonepe-link").href = upiLink;
    document.getElementById("paytm-link").href = upiLink;
    document.getElementById("bhim-link").href = upiLink;

    alert(`UPI payment links updated with total amount: ₹${amount}`);
}

// Call this function when the payment modal opens
proceedToPayment = function () {
    if (cartCount === 0) {
        alert('Your cart is empty. Please add some items first.');
    } else {
        document.getElementById("modal-total-items").innerText = cartCount;
        document.getElementById("modal-total-price").innerText = totalPrice;

        initiateUpiPayment(); // Update payment links dynamically
        document.getElementById("payment-modal").style.display = "flex";
    }
};

/**
 * Closes the payment modal.
 */
function closePaymentModal() {
    const modal = document.getElementById('payment-modal');
    modal.style.display = 'none';

    // Reset cart (optional: only if payment completed)
    cart = [];
    cartCount = 0;
    totalPrice = 0;
    document.getElementById('cart-count').innerText = cartCount;
    updateCartDisplay();
}
/**
 * Searches for products in the grid.
 */
function searchProduct() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');

    products.forEach((product) => {
        const productName = product.querySelector('h3').innerText.toLowerCase();
        if (productName.includes(searchValue)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
