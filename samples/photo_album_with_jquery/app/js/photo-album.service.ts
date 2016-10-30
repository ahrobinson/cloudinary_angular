import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/operator/map'

import { Photo } from './photo';
import { Cloudinary } from './cloudinary.service';

@Injectable()
export class PhotoAlbum {

  private photos: Observable<Photo[]>;

  constructor(private http: Http, private cloudinary: Cloudinary) {
    // instead of maintaining the list of images, we rely on the 'myphotoalbum' tag
    // and simply retrieve a list of all images with that tag.
    let url = this.cloudinary.getInstance().url('myphotoalbum', { format: 'json', type: 'list' })
      //cache bust
      + "?" + Math.ceil(new Date().getTime() / 1000);

    this.photos = this.http
      .get(url)
      .map((r: Response) => r.json().resources as Photo[]);
  }

  getPhotos(): Observable<Photo[]> {
    return this.photos;
  }

  // addPhoto(photo: Photo): void {
  //   this.photosObserver.next([photo]);
  // }
}
