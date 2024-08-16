//About page / FAQ DISPLAY
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      faqItem.classList.toggle('active');
  });
});

/*Filter*/
document.addEventListener('DOMContentLoaded', function() {
  const filterForm = document.getElementById('filterForm');
  const productList = document.getElementById('productList');
  const products = Array.from(productList.getElementsByClassName('product-card'));

  function filterAndSortProducts() {
      const priceRange = document.getElementById('priceRange').value;
      const sortBy = document.getElementById('sortBy').value;

      console.log('Price Range:', priceRange); // Debugging
      const maxPrice = parseFloat(priceRange);

      let filteredProducts = products.filter(product => {
          const productPrice = parseFloat(product.getAttribute('data-price'));
          console.log('Product Price:', productPrice); // Debugging
          if (priceRange === 'all') return true;
          return productPrice <= maxPrice;
      });

      filteredProducts.sort((a, b) => {
          const priceA = parseFloat(a.getAttribute('data-price'));
          const priceB = parseFloat(b.getAttribute('data-price'));

          if (sortBy === 'asc') {
              return priceA - priceB;
          } else if (sortBy === 'desc') {
              return priceB - priceA;
          } else {
              return 0;
          }
      });

      productList.innerHTML = '';
      filteredProducts.forEach(product => productList.appendChild(product));
  }

  filterForm.addEventListener('change', filterAndSortProducts);
  filterAndSortProducts(); // Initial load
});

//Product box
// Function to update the total cost based on quantity
function updateTotal() {
  const quantity = document.getElementById('quantity').value;
  const priceElement = document.getElementById('price');
  const price = parseFloat(priceElement.textContent.replace(/₱|,/g, '')); // Extract numeric value from the price element
  const total = price * quantity;
  document.getElementById('totalCost').innerText = `₱${total.toLocaleString()}`;
  document.getElementById('totalPrice').value = `₱${total.toLocaleString()}`;
}

// Initial total price calculation
updateTotal();

// Event listener for "Buy Now" button click
document.getElementById('buyNowButton').addEventListener('click', function() {
  const quantity = document.getElementById('quantity').value;
  
  // Get the product name from the h2 element
  const productName = document.querySelector('.product-details h2').textContent;
  
  // Update the modal fields
  document.getElementById('itemName').value = productName;
  document.getElementById('itemNumber').value = quantity;

  // Show the modal
  var myModal = new bootstrap.Modal(document.getElementById('purchaseModal'));
  myModal.show();
});

// Event listener for form submission in the modal
document.getElementById('purchaseForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Handle form submission logic here
  alert('Purchase confirmed! Thank you for your order.');

  // Hide the modal
  var myModalEl = document.getElementById('purchaseModal');
  var modal = bootstrap.Modal.getInstance(myModalEl);
  modal.hide();
});
