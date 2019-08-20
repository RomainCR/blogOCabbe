import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[];
  booksSubscription: Subscription

  constructor(
    private booksService: BooksService,
    private router: Router) { }


  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.emitBooks();
  }

  onLove(i) {
    this.books[i].loveIts += 1;
    console.log(this.books[i].loveIts);
    this.booksService.saveBooks();
  }

  onDont(i) {
    this.books[i].loveIts -= 1;
    console.log(this.books[i].loveIts);
    this.booksService.saveBooks();
  }

  getColor(i) {
    if (this.books[i].loveIts > 0) {
      return "green";
    } else if (this.books[i].loveIts < 0) {
      return "red";
    }
  }

  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

}
