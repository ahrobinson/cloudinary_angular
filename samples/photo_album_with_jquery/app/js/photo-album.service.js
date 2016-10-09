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
var PhotoAlbum = (function () {
    function PhotoAlbum() {
    }
    PhotoAlbum.prototype.getHeroes = function () {
        return Promise.resolve(HEROES);
    };
    PhotoAlbum.prototype.getHero = function (id) {
        return this.getHeroes()
            .then(function (heroes) { return heroes.find(function (hero) { return hero.id === id; }); });
    };
    PhotoAlbum = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PhotoAlbum);
    return PhotoAlbum;
}());
exports.PhotoAlbum = PhotoAlbum;
/*
photoAlbumServices.factory('album', ['$rootScope', '$resource', 'cloudinary',
  function($rootScope, $resource, cloudinary){
    // instead of maintaining the list of images, we rely on the 'myphotoalbum' tag
    // and simply retrieve a list of all images with that tag.
    var url = cloudinary.url('myphotoalbum', {format: 'json', type: 'list'});
    //cache bust
    url = url + "?" + Math.ceil(new Date().getTime()/1000);
    return $resource(url, {}, {
      photos: {method:'GET', isArray:false}
    });
  }]);
}
*/
//# sourceMappingURL=photo-album.service.js.map