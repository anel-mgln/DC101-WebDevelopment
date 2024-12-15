document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const cartTotal = document.getElementById('cart-total');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render the cart
    function renderCart() {
        cartItemsContainer.innerHTML = ''; // Clear the container

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartTotal.textContent = '₱0.00';
            return;
        }

        emptyCartMessage.style.display = 'none';
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.title}">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p>${item.price}</p>
                </div>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            // Extract price and add to total
            const itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
            if (!isNaN(itemPrice)) {
                total += itemPrice;
            }
        });

        cartTotal.textContent = `₱${total.toFixed(2)}`;

        // Add event listeners for remove buttons
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                cart.splice(index, 1); // Remove item
                localStorage.setItem('cart', JSON.stringify(cart)); // Update Local Storage
                renderCart(); // Re-render cart
            });
        });
    }

    renderCart(); // Initial render
});
