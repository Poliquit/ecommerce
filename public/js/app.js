document.addEventListener('DOMContentLoaded', function() {
    var shopLink = document.getElementById('navbarDropdown');

    shopLink.addEventListener('click', function(event) {
      window.location.href = '/shop.html';
    });
  });
