const API = 'https://fakestoreapi.com/products';
const getProductsButton = document.getElementById('products-button');
const productsContainer = document.querySelector('.products-container');

async function fecthData() {
  const response = await fetch(API);
  const data = await response.json();
  return data;
}

async function getData() {
  const products = await fecthData();
  console.log(products);

  for (let product in products) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img src="${products[product].image}" alt="${products[product].title}">
      <h3>${products[product].title}</h3>
      <p>${products[product].price}</p>
      <p>${products[product].description}</p>
    `;
    productsContainer.appendChild(productCard);
    productCard.classList.add("product-card");
  }
}

getData();