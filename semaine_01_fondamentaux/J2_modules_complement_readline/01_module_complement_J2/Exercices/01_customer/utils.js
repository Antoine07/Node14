import 'dotenv/config';

const { TVA : TVA_ENV } =  process.env;

export const TVA = TVA_ENV ;

export function priceTTC( priceHT ){

  return parseFloat(priceHT * ( 1 + TVA ))
}

// TODO reduce pour calculer le total
export function total( products) {

}