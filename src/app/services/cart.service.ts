import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';
import { Book } from '../common/book';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems:CartItem[]=[];
  totalPrice:Subject<number>= new Subject<number>();
  totalQuantity:Subject<number>= new Subject<number>();
  

  constructor() { }

  addToCart(theCartItem:CartItem)
  {
   let alreadyExistsInCart:boolean=false
   let existingCartItem:CartItem=undefined
   if(this.cartItems.length>0){
     existingCartItem=this.cartItems.find(tempCartItem=>tempCartItem.id===theCartItem.id);
    
     alreadyExistsInCart=(existingCartItem!=undefined)
    }
if(alreadyExistsInCart){
  existingCartItem.quantity++;
}
else{
  this.cartItems.push(theCartItem);
}
  this.calculateTotalPrice(theCartItem);
  }
  calculateTotalPrice(theCartItem: CartItem) {

    let totalPriceValue:number=0;
    let totalQuantityValue:number=0;

    for(let currentCartItem of this.cartItems)
    {
      totalPriceValue +=currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue +=currentCartItem.quantity ;
    }
console.log(`total:${totalPriceValue},Total quantity:${totalQuantityValue}`)
this.totalPrice.next(totalPriceValue);
this.totalQuantity.next(totalQuantityValue);
  }
}
