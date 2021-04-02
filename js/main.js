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
    handleDeleteProduct();
  }
  modalTriger.forEach((item) => item.addEventListener('click', handelModal));

  }

//Pintar el número de productos
const paintCartNumber = (foundItem) => {
  const modalNumber = document.querySelector('.js-modal-number');
  return modalNumber.innerHTML = foundItem.quantity;
  }

const cartElement = document.querySelector('.js-cartShow');
const getCartItemHtmlCode = item => {
  let cartCode = '';
  cartCode += `<tr>`;
  cartCode += `<th scope="tow"></th>`;
  cartCode += `<td>${item.name}</td>`;
  cartCode += `<td class="quantity">`;
  cartCode += `<button class="btn btn-outline-secondary minusBtn btn-cart"><img class="cart-icon" src="./css/icons/menos.svg" alt="Restar uno a la lista" /></button>`;
  cartCode += `<p class="js-modal-number">${item.quantity}</p>`;
  cartCode += `<button class="btn btn-outline-secondary plusBtnCart btn-cart addProduct">`
  cartCode += `<img class="cart-icon" src="./css/icons/mas.svg" alt="Añadir uno a la lista" /></button>`;
  cartCode += `</td>`;
  cartCode += `<td><p class="price-text">${item.price * item.quantity}€`;
  cartCode += `<img class="trash-icon" src="./css/icons/trash.svg" alt="Eliminar" /></p>`;
  cartCode += `</td>`;
  return cartCode; 
}
const getCartTotalHtmlCode = () => {
  let cartCodeTotal = '';
  cartCodeTotal += `<tr class="cart-total">`;
  cartCodeTotal += `<td>Total</td>`;
  cartCodeTotal += `<td>${getTotalPrice()}€</td>`;
  cartCodeTotal += `</tr>`;
  return cartCodeTotal;
}
const getTotalPrice = () => {
  let total = 0;
  for (const item of cartProducts) {
    total += item.price * item.quantity
  }
  return total;
}
const paintCartItems = () => {
  cartElement.innerHTML = '';
  for (const item of cartProducts) {
  cartElement.innerHTML += getCartItemHtmlCode(item)
  }
  cartElement.innerHTML += getCartTotalHtmlCode();
  
}

//Añadir al carrito
const handleAddProduct = () => {
  const addBtn = document.querySelector('.plusBtn');
  const addProduct = (ev) => {
    const clickedId = ev.currentTarget.id;
    let foundItem;
    for (const item of cartProducts) {
      if (item.id === clickedId){
        foundItem = item;
        }
      }
      let foundProduct;
      if (foundItem === undefined){
        for (const product of vegetables) {
         if (product.id === clickedId){
           foundProduct = product;
          }
        }
       cartProducts.push(foundProduct)
      } else {
        foundItem.quantity +=1;
      }
    paintCartItems();
    paintCartNumber(foundItem);
  }
  addBtn.addEventListener('click', addProduct);
}  

//Restar del carrito
/* const handleDeleteProduct = () => {
  const deleteBtn = document.querySelector('.minusBtn');
  const deleteProduct = (ev) => {
    const clickedId = ev.currentTarget.id;
    let foundItem;
    for (const item of cartProducts) {
      if (item.id === clickedId){
        foundItem = item;
        if (foundItem.quantity >= 1){
          foundItem.quantity -= 1
        } else {

        }
        }
      }
      if (foundItem === undefined){
        for (const product of vegetables) {
         if (product.id === clickedId){
           foundProduct = product;
          }
        }
       cartProducts.push(foundProduct)
      } else {
        foundItem.quantity +=1;
      }
    paintCartItems();
    paintCartNumber(foundItem);
  }
  deleteBtn.addEventListener('click', deleteProduct);
}  */
//evento de comprar
const buy = document.querySelector('.js-buyIt');

const handleBuy = () => {
  alert('Enhorabuena por la compra')
}

buy.addEventListener('click', handleBuy);

//ejecución de eventos
getData();
paintCartItems();