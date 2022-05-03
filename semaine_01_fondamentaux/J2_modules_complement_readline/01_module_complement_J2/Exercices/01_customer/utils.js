
export const TVA = 0.2 ;

export function priceTTC( priceHT ){

  return parseFloat(priceHT * ( 1 + TVA ))
}

// TODO reduce pour calculer le total
export function total( products) {

}