import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'photo-list',
  templateUrl: 'photo-list.component.html',
//   styleUrls: ['hero-detail.component.css']
})
export class PhotoListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // String to int
    });
  }

  goBack(): void {
    this.location.back();
  }
}
