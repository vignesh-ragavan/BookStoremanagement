import { Component, OnInit } from '@angular/core';
import { BookCategory } from 'src/app/common/book-category';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-bookcategory',
  templateUrl: './bookcategory.component.html',
  styleUrls: ['./bookcategory.component.css']
})
export class BookcategoryComponent implements OnInit {
  bookCategories:BookCategory[]

  constructor(private _bookervice:BookService) { }

  ngOnInit(): void {
    this.listBookCategories()
  }

  listBookCategories()
  {
  this._bookervice.getBookCategories().subscribe(
   data=>this.bookCategories=data
   
   
  );
  }

}
