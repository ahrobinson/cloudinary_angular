import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { PhotoAlbum } from './photo-album.service'
import { Photo } from './photo'
import { CloudinaryImageSourceDirective } from './cloudinary-image-source.directive';

@Component({
  moduleId: module.id,
  selector: 'photo-list',
  templateUrl: 'photo-list.component.html',
  styleUrls: ['photo-list.component.css'],
  providers: [PhotoAlbum, CloudinaryImageSourceDirective]
})
export class PhotoListComponent implements OnInit {

  private photos: Photo[];

  constructor(
    private photoAlbum: PhotoAlbum,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.photos = [];
    this.photoAlbum.getPhotos() // Try to use promise directly instead of copying the state here
    .then(photos => {
      this.photos = photos;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
