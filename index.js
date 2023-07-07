const productList = document.getElementById('productList');

fetch('https://striveschool-api.herokuapp.com/api/product/', {
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
    const spinnerContainer = document.getElementById('spinner-container')
    spinnerContainer.classList.add('d-none')
    const row = document.getElementById('row');
    data.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('col', 'mt-5');
      productItem.innerHTML = `
        <div class="card    text-bg-dark border-success h-100 " >
          <img src="${product.imageUrl}" class="card-img-top h-50 "
           
           alt="${product.name}">
          <div class="card-body  d-flex flex-column align-items-center justify-content-evenly">
            <h3 class="card-title">${product.name}</h3>
            <h5>${product.brand}</h5>
            <div class= "d-flex align-items-center"> 
            <p class="card-text ">${product.description} </p>
            <p class = "mx-5 fw-bold"> ${product.price}€ </p>
            </div>
            <div> 
            <a href="#" class="btn btn-outline-warning edit-button" data-product-id="${product._id}">Modifica</a>
            <a href="#" class="btn btn-outline-primary detail-button" data-product-id="${product._id}">Dettagli</a>
            </div>
          </div>
        </div>
      `;
      row.appendChild(productItem);
    });

    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        const productId = button.dataset.productId;
        window.location.href = `admin.html?id=${productId}`;
      });
    });
    const  detailButton = document.querySelectorAll('.detail-button');
    detailButton.forEach(button => {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        const productId = button.dataset.productId;
        window.location.href = `detail.html?id=${productId}`;
      });
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });


