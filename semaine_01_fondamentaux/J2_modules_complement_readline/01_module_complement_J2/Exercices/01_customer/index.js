import { products } from "./products.js";
import { priceTTC as funcPriceTTC, TVA, total } from "./utils.js";

// Price TTC

console.log(funcPriceTTC(10))


products.map((product) => {
    product.priceTTC = funcPriceTTC(product.priceHT)
    return product;
});

console.log(products);

// { ...product }

// spread operator crée une copie peu profonde avec un diff sur une clé
const productsTTCHT = products.map((product) =>({ ...product, priceTTC : funcPriceTTC(product.priceHT)  }));

console.log(productsTTCHT)