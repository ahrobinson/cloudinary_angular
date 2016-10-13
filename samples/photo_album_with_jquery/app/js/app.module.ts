'use strict';
/* App Module */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { PhotoListComponent } from './photo-list.component';
import { PhotoUploadJqueryComponent } from './photo-upload-jquery.component';
import { CloudinaryImageDirective } from './cloudinary-image.directive';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
import { CloudinaryImageSourceDirective } from './cloudinary-image-source.directive';

import { Cloudinary } from './cloudinary.service';
import { CloudinaryConfiguration } from './cloudinary-configuration.service';

import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    PhotoListComponent,
    PhotoUploadJqueryComponent,
    CloudinaryImageSourceDirective,
    CloudinaryImageDirective,
    CloudinaryTransformationDirective
  ],
  providers: [
    Cloudinary,
    CloudinaryConfiguration
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
var photoAlbumApp = angular.module('photoAlbumApp', [
  'ngRoute',
  'cloudinary',
  'photoAlbumAnimations',
  'photoAlbumControllers',
  'photoAlbumServices'
]);
photoAlbumApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/photos', {
      templateUrl: 'partials/photo-list.html',
      resolve: {
        photoList: function ($q, $rootScope, album) {
          if (!$rootScope.serviceCalled) {
            return album.photos({}, function (v) {
              $rootScope.serviceCalled = true;
              $rootScope.photos = v.resources;
            });
          } else {
            return $q.when(true);
          }
        }
      }
    }).when('/photos/new', {
      templateUrl: 'partials/photo-upload-jquery.html',
      controller: 'photoUploadCtrlJQuery'
    }).otherwise({
      redirectTo: '/photos'
    });
  }]);


 */
