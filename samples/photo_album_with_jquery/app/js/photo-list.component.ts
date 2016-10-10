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
  private shown: boolean = false;

  constructor(
    private photoAlbum: PhotoAlbum,
    private route: ActivatedRoute,
    private location: Location
  ) { 
  }

  ngOnInit(): void {
    this.photos = [];
    this.photoAlbum.getPhotos()
    .then(photos => {
      this.photos = photos;
      photos.forEach(photo=>console.log('PhotoListComponent', photo.public_id))
    });
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // String to int
    });
  }

  goBack(): void {
    this.location.back();
  }
}
