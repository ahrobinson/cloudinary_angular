'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* App Module */
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var photo_list_component_1 = require('./photo-list.component');
var photo_upload_jquery_component_1 = require('./photo-upload-jquery.component');
var cloudinary_image_directive_1 = require('./cloudinary-image.directive');
var cloudinary_transformation_directive_1 = require('./cloudinary-transformation.directive');
var cloudinary_image_source_directive_1 = require('./cloudinary-image-source.directive');
var photo_album_service_1 = require('./photo-album.service');
var cloudinary_service_1 = require('./cloudinary.service');
var cloudinary_configuration_service_1 = require('./cloudinary-configuration.service');
var app_routing_1 = require('./app.routing');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                photo_list_component_1.PhotoListComponent,
                photo_upload_jquery_component_1.PhotoUploadJqueryComponent,
                cloudinary_image_source_directive_1.CloudinaryImageSourceDirective,
                cloudinary_image_directive_1.CloudinaryImageDirective,
                cloudinary_transformation_directive_1.CloudinaryTransformationDirective
            ],
            exports: [
                cloudinary_image_source_directive_1.CloudinaryImageSourceDirective,
                cloudinary_image_directive_1.CloudinaryImageDirective,
                cloudinary_transformation_directive_1.CloudinaryTransformationDirective
            ],
            providers: [
                cloudinary_service_1.Cloudinary,
                cloudinary_configuration_service_1.CloudinaryConfiguration,
                photo_album_service_1.PhotoAlbum
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
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
//# sourceMappingURL=app.module.js.map