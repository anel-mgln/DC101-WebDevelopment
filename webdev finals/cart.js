document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart from Local Storage or initialize an empty array

    const addToCartButtons = document.querySelectorAll('.shop .btn');

    addToCartButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const box = event.target.closest('.box');
            const imgSrc = box.querySelector('img').src;
            const title = box.querySelector('h3').textContent;
            const price = box.querySelector('.price').textContent;

            const item = { imgSrc, title, price };
            cart.push(item);

            // Save cart back to Local Storage
            localStorage.setItem('cart', JSON.stringify(cart));

            alert(`${title} has been added to your cart!`);
        });
    });
});
