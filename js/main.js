let vegetables = [];
let cartProducts = [];

//traemos información del .json
const getData = () => {
 return fetch('./js/data/data.json')
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
   listCode += `<li id=${vegetable.id} data-bs-toggle="modal" data-bs-target="#exampleModal" class="vegetables-item js-listItem"  draggable="true">`;
   listCode += '<div class="image-content">'
   listCode += `<img class="vegetables-img" src=${vegetable.url} id=${vegetable.id} />`;
   listCode += '</div>'
   listCode += `<h6 class="vegetables-name">${vegetable.name}</h6>`;
   listCode += `<p class="vegetables-price">${vegetable.price}€ /Kg </p>`;
   listCode += `</li>`;
 } else if (vegetable.family === "frutas"){
  listCode += `<li data-bs-toggle="modal" data-bs-target="#exampleModal" id=${vegetable.id} class="vegetables-item js-listItem"  draggable="true">`;
  listCode += '<div class="image-content">'
  listCode += `<img class="vegetables-img" src=${vegetable.url} id=${vegetable.id} />`;
  listCode += '</div>'
  listCode += `<h6 class="vegetables-name">${vegetable.name}</h6>`;
  listCode += `<p class="vegetables-price">${vegetable.price}€ /Kg </p>`;;
  listCode += `</li>`;
 }
}
vegetablesList.innerHTML = listCode;
showModal();
dragEvent();
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
        modalCard += `<img class="modal-img" src=${item.url} alt="Fodo de ${item.name}"/>`;
        modalCard += `<p class="modal-description">${item.description}</p>`;
        modalCard += '</div>';
        modalCard += '<div class="modal-footer">'
        modalCard += `<button type="button" class="btn btn-outline-secondary minusBtn" id=${item.id}><img class="cart-icon" src="../css/icons/menos.svg" alt="Quitar uno de la lista"/></button>`
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

//Pintar el carrito de la compa
const cartElement = document.querySelector('.js-cartShow');
const getCartItemHtmlCode = item => {
  let totalPrice = item.quantity*item.price;
  totalPrice = totalPrice.toFixed(2)
  let cartCode = '';
  cartCode += `<tr>`;
  cartCode += `<th scope="tow"></th>`;
  cartCode += `<td>${item.name}</td>`;
  cartCode += `<td class="quantity">`;
  cartCode += `<button class="btn btn-outline-secondary minusBtnCart btn-cart"id=${item.id}><img class="cart-icon" src="./css/icons/menos.svg" alt="Restar uno a la lista" /></button>`;
  cartCode += `<p class="js-modal-number">${item.quantity}</p>`;
  cartCode += `<button class="btn btn-outline-secondary plusBtnCart btn-cart addProduct" id=${item.id}>`
  cartCode += `<img class="cart-icon" src="./css/icons/mas.svg" alt="Añadir uno a la lista" /></button>`;
  cartCode += `</td>`;
  cartCode += `<td><p class="price-text">${totalPrice}€`;
  cartCode += `<img class="trash-icon" id=${item.id} src="./css/icons/trash.svg" alt="Eliminar" /></p>`;
  cartCode += `</td>`;
  return cartCode; 
}

//Pintar el total del carro de la compra
const getCartTotalHtmlCode = () => {
  let cartCodeTotal = '';
  cartCodeTotal += `<tr class="cart-total">`;
  cartCodeTotal += `<td class="total-line">Total</td>`;
  cartCodeTotal += `<td class="total-line">${getTotalPrice()}€</td>`;
  cartCodeTotal += `</tr>`;
  return cartCodeTotal;
}

//F(x) que calcula el precio total de la compra
const getTotalPrice = () => {
  let total = 0;
  let finalNumber = 0;
  for (const item of cartProducts) {
    total += item.price * item.quantity
    finalNumber =  total.toFixed(2);
  }
  return finalNumber;
}

//f(x) ejecutadora de las que pintan el carrito y el total de los productos del carrito de la compra
const paintCartItems = () => {
  cartElement.innerHTML = '';
  for (const item of cartProducts) {
  cartElement.innerHTML += getCartItemHtmlCode(item)
  }
  cartElement.innerHTML += getCartTotalHtmlCode();
  listenCartAddBtns();
  listenCartDeleteBtns();
  listenTrashBtns();
}

//Añadir al carrito desde la modal
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
  addBtn.addEventListener('click', addProduct)  
}  

//Restar del carrito desde la modal
const handleDeleteProduct = () => {
  const deleteBtn = document.querySelector('.minusBtn');
  const deleteProduct = (ev) => {
    const clickedId = ev.currentTarget.id;
    let foundItem;
    for (const item of cartProducts) {
      if (item.id === clickedId){
        foundItem = item;
        if (foundItem.quantity > 1){
          foundItem.quantity -= 1
        } else {
          let foundIndex;
          for (let index = 0; index < cartProducts.length; index++) {
            if (cartProducts[index].id === clickedId){
              foundIndex = index
            }
          }
          cartProducts.splice(foundIndex,1);
        }
        }
      }
      
    paintCartItems();
  }
  deleteBtn.addEventListener('click', deleteProduct);
}

//Pintar el número de productos en la venta modal
const paintCartNumber = (foundItem) => {
  const modalNumber = document.querySelector('.js-modal-number');
  return modalNumber.innerHTML = foundItem.quantity;
  } 

//f(x) añadir productos desde el carrito
const addCartProduct = (ev) => {
const clickedId = ev.currentTarget.id;
let foundItem;
for (const item of cartProducts) {
  if (item.id === clickedId){
    foundItem = item;
    foundItem.quantity +=1;
    }
  }
  paintCartItems()
}

//f(x) restar productos desde el carrito
const deleteCartProduct = (ev) => {
  const clickedId = ev.currentTarget.id;
  let foundItem;
  for (const item of cartProducts) {
    if (item.id === clickedId){
      foundItem = item;
      if (foundItem.quantity > 1){
        foundItem.quantity -=1;
      }else{
        let foundIndex;
          for (let index = 0; index < cartProducts.length; index++) {
            if (cartProducts[index].id === clickedId){
              foundIndex = index
            }
          }
          cartProducts.splice(foundIndex,1);
      }
      } 
    }
    paintCartItems()
  }

//Borrar todo el producto desde el carrito
const deleteTheProduct = (ev) => {
  const clickedId = ev.currentTarget.id;
  let foundItem;
  for (const item of cartProducts) {
    if (item.id === clickedId){
      foundItem = item;
      let foundIndex;
        for (let index = 0; index < cartProducts.length; index++) {
          if (cartProducts[index].id === clickedId){
              foundIndex = index
            }
          }
          cartProducts.splice(foundIndex,1);
      }
    }
    paintCartItems()
  }
//Escuchar los botones del carrito
const listenCartAddBtns = () => {
  const cartAddBtns = document.querySelectorAll('.plusBtnCart');
  for (const btn of cartAddBtns) {
    btn.addEventListener('click', addCartProduct)
  }
}
const listenCartDeleteBtns = () => {
  const cartDeleteBtns = document.querySelectorAll('.minusBtnCart');
  for (const btn of cartDeleteBtns) {
    btn.addEventListener('click', deleteCartProduct)
  }
}
const listenTrashBtns = () => {
  const trashBtns = document.querySelectorAll('.trash-icon');
  for (const btn of trashBtns) {
    btn.addEventListener('click', deleteTheProduct)
  }
}
//evento de comprar
const buy = document.querySelector('.js-buyIt');
const handleBuy = () => {
  if (cartProducts.length > 0 ){
    alert('Gracias por su compra.')
  } else{
    alert('Su cesta está vacía.')
  }
}
buy.addEventListener('click', handleBuy);

//drag and drop events
const dropZone = document.querySelector('.drop-section');

const dragEvent = (ev) => {
  let dragItem = document.querySelectorAll('.js-listItem');
  let myProduct;
  const addProduct = (ev) => {
    console.log(ev);
    let foundItem;
    for (const item of cartProducts) {
      if (item.id === ev){
        foundItem = item;
      }
    }
    let foundProduct;
      if (foundItem === undefined){
        for (const product of vegetables) {
         if (product.id === ev){
           foundProduct = product;
          }
        }
       cartProducts.push(foundProduct)
      } else {
        foundItem.quantity +=1;
      }
    paintCartItems();
  }
  const handleDrag = (ev) => {
   myProduct = ev.dataTransfer.setData('text', ev.target.id)
  }
  const dragOver = (ev) => {
    ev.preventDefault();
  }
  const dropProduct = (ev) => {
    ev.preventDefault();
    let id = ev.dataTransfer.getData('text');
    let product = myProduct;
    addProduct(id, product);
  }
  dragItem.forEach((item) => item.addEventListener('dragstart', handleDrag))
  dropZone.addEventListener('dragover', dragOver);
  dropZone.addEventListener('drop', dropProduct);
}
//ejecución de eventos
getData();
paintCartItems();