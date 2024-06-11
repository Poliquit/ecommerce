document.addEventListener('DOMContentLoaded', function() {
    var shopLink = document.getElementById('navbarDropdown');

    shopLink.addEventListener('click', function(event) {
      window.location.href = '/shop.html';
    });
  });


  document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.item');
  
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
        previewPrice.textContent = `Price: $${itemPrice}`;
  
        // Show the preview section
        const previewSection = document.querySelector('.preview-section');
        previewSection.style.display = 'block';
      });
    });
  
    // Optional: Implement 'Add to Cart' and 'Buy Now' functionality
    const addToCartButton = document.getElementById('add-to-cart');
    const buyNowButton = document.getElementById('buy-now');
  
    addToCartButton.addEventListener('click', function() {
      alert('Added to cart!');
      // Implement add to cart functionality
    });
  
    buyNowButton.addEventListener('click', function() {
      alert('Proceeding to checkout!');
      // Implement buy now functionality
    });
  });
  