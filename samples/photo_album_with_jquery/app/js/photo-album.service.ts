import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Photo } from './photo';
import { Cloudinary } from './cloudinary.service';

@Injectable()
export class PhotoAlbum {
  constructor(private http: Http, private cloudinary: Cloudinary) { }

  getPhotos(): Promise<Photo[]> {
    // instead of maintaining the list of images, we rely on the 'myphotoalbum' tag
    // and simply retrieve a list of all images with that tag.
    let url = this.cloudinary.getInstance().url('myphotoalbum', { format: 'json', type: 'list' })
      //cache bust
      + "?" + Math.ceil(new Date().getTime() / 1000);
    return this.http
      .get(url)
      .toPromise()
      .then(res => res.json().resources as Photo[]);
  }
}
