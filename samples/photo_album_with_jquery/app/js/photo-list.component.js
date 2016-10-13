"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var photo_album_service_1 = require('./photo-album.service');
var cloudinary_image_source_directive_1 = require('./cloudinary-image-source.directive');
var PhotoListComponent = (function () {
    function PhotoListComponent(photoAlbum, route, location) {
        this.photoAlbum = photoAlbum;
        this.route = route;
        this.location = location;
    }
    PhotoListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.photos = [];
        this.photoAlbum.getPhotos() // Try to use promise directly instead of copying the state here
            .then(function (photos) {
            _this.photos = photos;
        });
    };
    PhotoListComponent.prototype.goBack = function () {
        this.location.back();
    };
    PhotoListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'photo-list',
            templateUrl: 'photo-list.component.html',
            styleUrls: ['photo-list.component.css'],
            providers: [photo_album_service_1.PhotoAlbum, cloudinary_image_source_directive_1.CloudinaryImageSourceDirective]
        }), 
        __metadata('design:paramtypes', [photo_album_service_1.PhotoAlbum, router_1.ActivatedRoute, common_1.Location])
    ], PhotoListComponent);
    return PhotoListComponent;
}());
exports.PhotoListComponent = PhotoListComponent;
//# sourceMappingURL=photo-list.component.js.map