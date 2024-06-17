document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const shippingItemsContainer = document.querySelector('.shipping-items');
    const reviewsItemsContainer = document.querySelector('.review-items');
    const clearReviewsButton = document.querySelector('.clear-reviews');

    function renderItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        cartItemsContainer.innerHTML = '';
        shippingItemsContainer.innerHTML = '';
        reviewsItemsContainer.innerHTML = '';

        cart.forEach(item => {
            const itemElement = createItemElement(item);

            if (item.shipping) {
                shippingItemsContainer.appendChild(itemElement);

                itemElement.querySelector('.order-receive').addEventListener('click', function() {
                    moveToReviews(item.id);
                });
            } else if (!item.reviewed) {
                cartItemsContainer.appendChild(itemElement);

                itemElement.querySelector('.remove-item').addEventListener('click', function() {
                    removeItem(item.id);
                });

                itemElement.querySelector('.quantity-input').addEventListener('change', function() {
                    updateQuantity(item.id, this.value);
                });

                itemElement.querySelector('.move-to-shipping').addEventListener('click', function() {
                    moveToShipping(item.id);
                });
            }
        });

        const reviewedItems = cart.filter(item => item.reviewed);
        reviewedItems.forEach(item => {
            const itemElement = createItemElement(item, true);
            reviewsItemsContainer.appendChild(itemElement);

            if (item.rating) {
                // Display rated stars
                itemElement.querySelector('.rating').textContent = `Rating: ${item.rating}/5`;
            } else {
                // Render star rating input
                const ratingInput = createRatingInput(item.id);
                itemElement.querySelector('.rating').appendChild(ratingInput);
            }
        });
    }

    function createItemElement(item, isReviewSection = false) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <div class="item-details">
                <img src="${item.imgSrc}" class="img-fluid rounded mb-3" alt="${item.name}" />
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <div class="price-quantity-remove">
                        ${item.shipping ? `<p>Quantity: ${item.quantity}</p>` : `
                            <input type="number" class="form-control quantity-input" value="${item.quantity}" min="1" data-id="${item.id}" ${isReviewSection ? 'disabled' : ''}>
                            ${!isReviewSection ? `<button class="btn remove-item" data-id="${item.id}"><i class='bx bxs-trash'></i></button>` : ''}
                        `}
                    </div>
                    ${!isReviewSection && item.shipping ? `<button class="btn btn-success order-receive" data-id="${item.id}">Order Receive</button>` : ''}
                    ${!isReviewSection && !item.shipping ? `<button class="btn btn-primary move-to-shipping" data-id="${item.id}">Checkout</button>` : ''}
                    ${isReviewSection ? `<div class="rating"></div>` : ''}
                </div>
            </div>
        `;
        return itemElement;
    }

    function createRatingInput(itemId) {
        const ratingInput = document.createElement('input');
        ratingInput.setAttribute('type', 'number');
        ratingInput.setAttribute('min', '1');
        ratingInput.setAttribute('max', '5');
        ratingInput.setAttribute('placeholder', 'Enter rating (1-5)');
        ratingInput.classList.add('form-control', 'rating-input');

        ratingInput.addEventListener('change', function() {
            const rating = parseInt(this.value, 10);
            if (rating >= 1 && rating <= 5) {
                submitRating(itemId, rating);
                this.setAttribute('disabled', true);
            } else {
                alert('Please enter a rating between 1 and 5.');
            }
        });

        return ratingInput;
    }

    function submitRating(id, rating) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, rating };
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        renderItems();
    }

    function moveToShipping(id) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, shipping: true };
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        renderItems();
    }

    function moveToReviews(id) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, shipping: false, reviewed: true };
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        renderItems();
    }

    function removeItem(id) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        renderItems();
    }

    function updateQuantity(id, quantity) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, quantity: parseInt(quantity, 10) };
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        renderItems();
    }

    function clearReviews() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => !item.reviewed);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderItems();
    }

    clearReviewsButton.addEventListener('click', clearReviews);

    renderItems();
});