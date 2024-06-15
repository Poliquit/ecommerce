document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.item');
    const addToCartButton = document.getElementById('add-to-cart');
    const buyNowButton = document.getElementById('buy-now');
  
    items.forEach(item => {
      item.addEventListener('click', function() {
        const itemName = item.dataset.name;
        const itemPrice = item.dataset.price;
        const itemDescription = item.dataset.description;
        const itemImgSrc = item.src;
  
        const previewImg = document.querySelector('.preview-img');
        const previewName = document.querySelector('.preview-name');
        const previewDescription = document.querySelector('.preview-description');
        const previewPrice = document.querySelector('.preview-price');
  
        previewImg.src = itemImgSrc;
        previewName.textContent = itemName;
        previewDescription.textContent = itemDescription;
        previewPrice.textContent = `Price: ${itemPrice}`;
  
        // Show the preview section
        const previewSection = document.querySelector('.preview-section');
        previewSection.style.display = 'block';
  
        // Store item details in the button's dataset
        addToCartButton.dataset.name = itemName;
        addToCartButton.dataset.price = itemPrice;
        addToCartButton.dataset.description = itemDescription;
        addToCartButton.dataset.imgSrc = itemImgSrc;
      });
    });
  
    addToCartButton.addEventListener('click', function() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const itemName = this.dataset.name;
      const itemPrice = this.dataset.price;
      const itemDescription = this.dataset.description;
      const itemImgSrc = this.dataset.imgSrc;
      const itemQuantity = document.querySelector('.quantity').value;
  
      const cartItem = {
        id: Date.now(),
        name: itemName,
        price: itemPrice,
        description: itemDescription,
        imgSrc: itemImgSrc,
        quantity: itemQuantity,
        shipping: false,
        reviewed: false
      };
  
      cart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  
    buyNowButton.addEventListener('click', function() {
      alert('Proceeding to checkout!');
      // Implement buy now functionality
    });
  });
  
