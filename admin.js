
// get url
const URL = 'https://striveschool-api.herokuapp.com/api/product/';

const form = document.getElementById('productForm');
// get url id for modify the product
const addressBarContent = new URLSearchParams(location.search);
const productId = addressBarContent.get('id');
console.log('product', productId);

// verify if there is a id
if (productId) {
  document.getElementById('button').innerText = 'Modifica';

// do a fatch with the url and id
  fetch(URL + productId, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YjY4OTEyYjUwYzAwMTQ5ZTRlZWMiLCJpYXQiOjE2ODg3MTQ5MzUsImV4cCI6MTY4OTkyNDUzNX0.w1HeZVn7kD2e9qhXar-ufUCe-004q4r0PRCF50q8DBg'
    }
  })
//   verify the id
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Cannot find product with the given ID');
      }
    })

    // put the value inside the form 
    .then(details => {
      document.getElementById('name').value = details.name;
      document.getElementById('description').value = details.description;
      document.getElementById('brand').value = details.brand;
      document.getElementById('immagine').value = details.imageUrl;
      document.getElementById('price').value = details.price;

// create a delete button for deleting the element, it creates only if there is a id
     
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.classList.add('btn', 'btn-danger', 'mt-2');
      deleteButton.addEventListener('click', function() {
        deleteProduct(productId);
      });
      document.getElementById('productForm').appendChild(deleteButton);
      
    })
    .catch(error => {
        console.error('Error:', error);
        const erorrDisplay = document.getElementById('error')
        erorrDisplay.innerText = error
      });
}


// create a reset button present in evry page

const resetButton = document.createElement('button')
resetButton.innerText='Reset'
resetButton.classList.add('btn', 'btn-warning', 'mx-2', 'mt-2')
resetButton.addEventListener('click', function (){
    const Resetconfirmation = confirm('Sei sicuro di voler resettare?');
    if (Resetconfirmation){
        document.getElementById('name').value = ''
        document.getElementById('description').value ='' 
        document.getElementById('brand').value = ''
        document.getElementById('immagine').value = ''
        document.getElementById('price').value = ''
    }
      
})


document.getElementById('productForm').appendChild(resetButton);

form.addEventListener('submit', function(event) {
  event.preventDefault(); 
// getting the values from the form input
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const brand = document.getElementById('brand').value;
  const imageUrl = document.getElementById('immagine').value;
  const price = document.getElementById('price').value;
// creating a payload
  const productData = {
    name: name,
    description: description,
    brand: brand,
    imageUrl: imageUrl,
    price: price
  };
 
  console.log(productData);

//   setting when to use post and when to use put

  let urlToUse
  let methodToUse
// if there is an id use put else post
  if (productId) {
    urlToUse = URL + productId;
    methodToUse = 'PUT';
  } else {
    urlToUse = URL;
    methodToUse = 'POST';
  }


  fetch(urlToUse, {
    method: methodToUse,
    body: JSON.stringify(productData),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YjY4OTEyYjUwYzAwMTQ5ZTRlZWMiLCJpYXQiOjE2ODg3MTQ5MzUsImV4cCI6MTY4OTkyNDUzNX0.w1HeZVn7kD2e9qhXar-ufUCe-004q4r0PRCF50q8DBg'
    }
  })
    .then(res => {
      if (res.ok) {
    // If there is a product id it update the product and you go to index.html
        if (productId) {
          alert('Product updated');
          
        } 
        // else it create a new product and empty the form
        else  {
          alert('Product saved');
          document.getElementById('name').value = '';
          document.getElementById('description').value = '';
          document.getElementById('brand').value = '';
          document.getElementById('immagine').value = '';
          document.getElementById('price').value = '';
        }
      } 
     
      else {
        alert('inserisci i dati richiesti')
        throw new Error('Failed to save/update product');
   
      }
    })
    .then(() => {
      console.log('Product created/updated:', productData);
    })
    .catch(error => {
      console.error('Error:', error);
      const erorrDisplay = document.getElementById('error')
      erorrDisplay.innerText = error
    });
});

function deleteProduct(productId) {
    const deleteURL = URL + productId;
  
    const confirmation = confirm('Sei sicuro di voler eliminare il prodotto?');
  
    if (confirmation) {
      fetch(deleteURL, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YjY4OTEyYjUwYzAwMTQ5ZTRlZWMiLCJpYXQiOjE2ODg3MTQ5MzUsImV4cCI6MTY4OTkyNDUzNX0.w1HeZVn7kD2e9qhXar-ufUCe-004q4r0PRCF50q8DBg'
        }
      })
        .then(res => {
          if (res.ok) {
            alert('Prodotto eliminato');
            window.location.href = 'index.html';
          } else {
            throw new Error('Impossibile eliminare il prodotto');
          }
        })
        .catch(error => {
          console.error('Errore:', error);
          const erorrDisplay = document.getElementById('error')
          erorrDisplay.innerText = error
        });
    }
  }
  