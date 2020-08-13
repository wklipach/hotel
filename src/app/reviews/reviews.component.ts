import { Component, OnInit } from '@angular/core';
import { GlobalRef } from '../services/globalref';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews = [];
  sUrlAvatarGlobal = '';

  constructor(private gr: GlobalRef, private rv: ReviewService) {

    this.sUrlAvatarGlobal = gr.sUrlAvatarGlobal;

  }

  ngOnInit(): void {
    this.rv.getAllReview().subscribe( (reviewres: Array<any>) => {
      this.reviews = reviewres;
      console.log('this.reviews =', this.reviews);
   });
  }

}
