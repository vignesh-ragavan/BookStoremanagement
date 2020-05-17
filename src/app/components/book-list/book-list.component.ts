import { Component, OnInit } from "@angular/core";
import { BookService } from "src/app/services/book.service";
import { Book } from "src/app/common/book";

import { ActivatedRoute } from "@angular/router";
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';


@Component({
  selector: "app-book-list",

  // templateUrl: './book-list.component.html',

  templateUrl: "./book-grid.component.html",

  styleUrls: ["./book-list.component.css"],
})
export class BookListComponent implements OnInit {
  books: Book[];
  CurrentCatgoryId: number;
  searchMode: boolean;
  pageOfItems:Array<Book>;
  pageSize:number=6;

  constructor(
    private _bookService: BookService,
    private activatedRoute: ActivatedRoute,private cartService:CartService
  ) {}


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {this.listBooks()});
  }

  pageClick(pageOfItems:Array<Book>)
  {
    this.pageOfItems=pageOfItems;
  }
  handleListBooks() {
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has(
      "id"
    );

    if (hasCategoryId) {
      this.CurrentCatgoryId = +this.activatedRoute.snapshot.paramMap.get("id");
    } else {
      this.CurrentCatgoryId = 1;
    }

    this._bookService
      .getbooks(this.CurrentCatgoryId)
      .subscribe((data) => (this.books = data));
  }
  handlesearchBook() {
    const keyword: string = this.activatedRoute.snapshot.paramMap.get(
      "keyword" );
    this._bookService.searchbooks(keyword).subscribe((data) => {
    this.books=data;
    });
  }


listBooks()
{
  this.searchMode = this.activatedRoute.snapshot.paramMap.has("keyword");

  if (this.searchMode)
   {
    this.handlesearchBook();
  } 
  else {
    this.handleListBooks();
  }}
  addToCart(book:Book)
  {
    console.log(`book name:${book.name},and price:${book.unitPrice}`);
    const cartItem=new CartItem(book);
    this.cartService.addToCart(cartItem);
  }
}
