let vegetables = [];
let cartProducts = [];

//traemos información del .json
const getData = () => {
 return fetch('../js/data/data.json')
.then(response => response.json())
.then(data => {
   vegetables = data;
   paintGroceries();
  })

}
const vegetablesList = document.querySelector('.js-vegetables')

//pintamos en pantalla los productos disponibles
const paintGroceries = () => {
 let listCode = ''; 
 for (vegetable of vegetables) {
   if (vegetable.family === "verduras"){
   listCode += `<li id=${vegetable.id} data-bs-toggle="modal" data-bs-target="#exampleModal" data-id=${vegetable.id} class="vegetables-item">`;
   listCode += '<div class="image-content">'
   listCode += `<img class="vegetables-img" src=${vegetable.url} />`;
   listCode += '</div>'
   listCode += `<h6 class="vegetables-name">${vegetable.name}</h6>`;
   listCode += `<p class="vegetables-price">${vegetable.price}€ /Kg </p>`;
   listCode += `</li>`;
 } else if (vegetable.family === "frutas"){
  listCode += `<li data-bs-toggle="modal" data-bs-target="#exampleModal" id=${vegetable.id} data-id=${vegetable.id} class="vegetables-item">`;
  listCode += '<div class="image-content">'
  listCode += `<img class="vegetables-img" src=${vegetable.url} />`;
  listCode += '</div>'
  listCode += `<h6 class="vegetables-name">${vegetable.name}</h6>`;
  listCode += `<p class="vegetables-price">${vegetable.price}€ /Kg </p>`;;
  listCode += `</li>`;
 }
}
vegetablesList.innerHTML = listCode;
showModal();
}

//ventana modal de cada producto
const modalWindow = document.querySelector('.modal-content')
const showModal = () => {
  const modalTriger = document.querySelectorAll('.vegetables-item');
  const handelModal = (ev) => {
    modalCard = '';
    const product = ev.currentTarget.id
    for (const item of vegetables) {
    
      if (product === item.id){
        modalCard += `<div class="modal-header" id=${item.id}>`;
        modalCard += `<h5 class="modal-title" id="exampleModalLabel">${item.name}</h5>`;
        modalCard += `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
        modalCard += `</div>`;
        modalCard += `<div modal-body> `;
        modalCard += `<img class="modal-img" src=${item.url} alt="Fodo de ${item.name}"`
        modalCard += '</div>';
        modalCard += '<div class="modal-footer">'
        modalCard += `<button type="button" class="btn btn-outline-secondary minusBtn" id=${item.id}><img class="cart-icon" src="../css/icons/menos.svg" alt="Quitar uno de la lista"/></button>`
        modalCard += `<p class="js-modal-number">${item.quantity}<p>`;
        modalCard += `<button type="button" class="btn btn-outline-secondary plusBtn" id=${item.id}><img class="cart-icon" src="../css/icons/mas.svg" alt="Añadir uno a la lista"/></button>`;
        modalCard += `</div>`;
        modalCard += `</div>`;
      }
    }
    modalWindow.innerHTML = modalCard;
    //llamar a la función de la modal para incrementar o decrementar productos
    handleAddProduct(); 
    handleRestProduct();
  }
  modalTriger.forEach((item) => item.addEventListener('click', handelModal));
  }

//Añadir al carrito
const handleAddProduct = () => {
  const addBtn = document.querySelector('.plusBtn');
  const addProduct = () => {
    let foundProduct;
    for (const item of vegetables) {
      if (item.id === addBtn.id)
      item.quantity += 1;
      }
    if (foundProduct === undefined) {
      for (const item of vegetables) {
        if (addBtn.id === item.id){
          cartProducts.push(item);
              }
      }
    }
    for (const item of cartProducts) {
      if (item.id === addBtn.id){
        foundProduct = item;
      }
    }
   
    //pintar el número de productos en el carrito y en la tarjeta modal
    paintCartNumber(foundProduct);
    
  }
  addBtn.addEventListener('click', addProduct);
  
}

//Restar del carrito o eliminar el producto

const handleRestProduct = () => {
  const minusBtn = document.querySelector('.minusBtn');
  const restProduct = () => {
    console.log('me han clicado', minus.id);
    for (const item of vegetables) {
      if (minusBtn.id === item.id){
        console.log(item);
      }
    } 
  }
 minusBtn.addEventListener('click', restProduct);
  
}

//Pintar el número de productos
const paintCartNumber = (foundProduct) => {
  //Pinar en la modal
  const modalNumber = document.querySelector('.js-modal-number');
  modalNumber.innerHTML = foundProduct.quantity;
  paintCart();
  }

  //pintar carrito
const paintCart = () => {
  const cart = document.querySelector('.js-cartShow');
  console.log(cart);
  let cartCode = '';
  for (const item of cartProducts) {
    if (item.quantity >=0){
    cartCode += `<tr>`;
    cartCode += `<th scope="tow"></th>`;
    cartCode += `<td>${item.name}</td>`;
    cartCode += `<td class="quantity">`;
    cartCode += `<button class="btn btn-outline-secondary js-minusBtn btn-cart"><img class="cart-icon" src="./css/icons/menos.svg" alt="Restar uno a la lista" /></button>`;
    cartCode += `<p class="js-modal-number">${item.quantity}</p>`;
    cartCode += `<button class="btn btn-outline-secondary js-plusBtn btn-cart">`
    cartCode += `<img class="cart-icon" src="./css/icons/mas.svg" alt="Añadir uno a la lista" /></button>`;
    cartCode += `</td>`;
    cartCode += `<td c><p class="price-text">${item.price}€`;
    cartCode += `<img class="trash-icon" src="./css/icons/trash.svg" alt="Eliminar" /></p>`;
    cartCode += `</td>`;
  }
}
  cart.innerHTML = cartCode;
  
}
    

//ejecución de eventos
getData();