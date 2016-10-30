import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs/Rx';

import { PhotoAlbum } from './photo-album.service'
import { Photo } from './photo'

@Component({
  moduleId: module.id,
  selector: 'photo-list',
  templateUrl: 'photo-list.component.html',
  styleUrls: ['photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  private photos: Observable<Photo[]>;
  private errorOccurred: boolean = false;
  private subscription: Subscription;

  constructor(
    private photoAlbum: PhotoAlbum
  ) { }

  ngOnInit(): void {
    this.photos = this.photoAlbum.getPhotos();
    // this.subscription = this.photos.subscribe(
    //   data => console.log('PhotoListComponent1', data),
    //   err => {
    //     this.errorOccurred = true;
    //     console.log('PhotoListComponent2', err)
    //   },
    //   () => console.log('PhotoListComponent3', 'yay')
    // );
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
