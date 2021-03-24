let vegetables = [];
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
//pintamos en pantalla los elementos disponibles
const paintGroceries = () => {
 let listCode = ''; 
 for (vegetable of vegetables) {
   if (vegetable.family === "verduras"){
   listCode += `<li id=${vegetable.id} data-id=${vegetable.id} class="vegetables-item js-list-item">`;
   listCode += '<div class="image-content">'
   listCode += `<img class="vegetables-img" src=${vegetable.url} />`;
   listCode += '</div>'
   listCode += `<h6 class="vegetables-title">${vegetable.name}</h6>`;
   listCode += `<p class="vegetables-price">${vegetable.price}€ /Kg </p>`;
   listCode += `</li>`;
 } else if (vegetable.family === "frutas"){
  listCode += `<li id=${vegetable.id} data-id=${vegetable.id} class="vegetables-item js-list-item">`;
  listCode += '<div class="image-content">'
  listCode += `<img class="vegetables-img" src=${vegetable.url} />`;
  listCode += '</div>'
  listCode += `<h6 class="vegetables-title">${vegetable.name}</h6>`;
  listCode += `<p class="vegetables-price">${vegetable.price}€ /Kg </p>`;
  listCode += `</li>`;
 }
}
vegetablesList.innerHTML = listCode;
}


//ventana modal de cada elemento
//no funciona (no pilla cada item)
 const showModal = (id) => {
  console.log(id);
  let modalItem = vegetables.find((vegetable) => {
    return vegetable.id === id
  })
  console.log(modalItem);
}

const trigerModal = () => {
  let modalItem = document.querySelectorAll('.js-list-item');
  console.log(modalItem);
  modalItem.forEach((item) => {
   item.addEventListener('click', () => {
     console.log(item);
   let id = item.attributes['data-id'].value;
   console.log(id);
   showModal(id)
    })
  })
 }

getData();
trigerModal();