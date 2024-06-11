document.addEventListener('DOMContentLoaded', function() {
    var shopLink = document.getElementById('navbarDropdown');

    shopLink.addEventListener('click', function(event) {
      window.location.href = '/shop.html';
    });
  });


// shop checkout
document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.item');
  const previewImg = document.getElementById('preview-img');
  const previewName = document.getElementById('preview-name');
  const previewPrice = document.getElementById('preview-price');
  const previewQuantity = document.getElementById('preview-quantity');
  const previewDescription = document.getElementById('preview-description');

  items.forEach(item => {
    item.addEventListener('click', function() {
      const itemName = this.getAttribute('data-name');
      const itemPrice = this.getAttribute('data-price');
      const itemDescription = this.getAttribute('data-description');
      const itemImgSrc = this.getAttribute('src');

      // Update preview section
      previewImg.src = itemImgSrc;
      previewName.textContent = itemName;
      previewPrice.textContent = `Price: $${itemPrice}`;
      previewDescription.textContent = itemDescription;
    });
  });

  document.getElementById('add-to-cart').addEventListener('click', function() {
    alert('Added to cart!');
    // Implement add to cart functionality
  });

  document.getElementById('buy-now').addEventListener('click', function() {
    alert('Proceeding to checkout!');
    // Implement buy now functionality
  });
});