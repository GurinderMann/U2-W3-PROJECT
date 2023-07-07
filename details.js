
const URL = 'https://striveschool-api.herokuapp.com/api/product/';

const productList = document.getElementById('productList');
const addressBarContent = new URLSearchParams(location.search);
const productId = addressBarContent.get('id');


fetch(URL + productId, {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YjY4OTEyYjUwYzAwMTQ5ZTRlZWMiLCJpYXQiOjE2ODg3MTQ5MzUsImV4cCI6MTY4OTkyNDUzNX0.w1HeZVn7kD2e9qhXar-ufUCe-004q4r0PRCF50q8DBg'
  }
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch products');
    }
  })
  .then(data => {
    const product = data;
      const row = document.getElementById('row');
      const productItem = document.createElement('div');
      productItem.classList.add('col', 'mt-5');
      productItem.innerHTML = `
        <h2 class="text-center  fw-bold">${product.name} </h2>
        <div class="card border-success h-100 mt-5">
          <img src="${product.imageUrl}" class="card-img-top" alt="">
          <div class="card-body d-flex flex-column align-items-center justify-content-evenly">
            <h3 class="card-title fw-bolder">${product.name}</h3>
            <h5 class="fw-bold">${product.brand}</h5>
            <div class= "d-flex align-items-center fs-5"> 
            <p class="card-text ">${product.description} </p>
            <p class = "mx-5 fw-bold "> ${product.price}€ </p>
            </div>
            <a href="#" class="btn btn-outline-success edit-button" data-product-id="${product._id}">Compra ora</a>
            
          </div>
        </div>
      `;
      row.appendChild(productItem);
    })
    .catch(error => {
        console.error('Error:', error);
      });
