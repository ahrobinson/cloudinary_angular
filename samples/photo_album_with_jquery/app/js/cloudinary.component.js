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
var CloudinaryImage = (function () {
    function CloudinaryImage(heroService, route, location) {
        this.heroService = heroService;
        this.route = route;
        this.location = location;
    }
    CloudinaryImage.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id']; // String to int
            _this.heroService.getHero(id)
                .then(function (hero) { return _this.hero = hero; });
        });
    };
    CloudinaryImage.prototype.goBack = function () {
        this.location.back();
    };
    CloudinaryImage.prototype.save = function () {
        var _this = this;
        this.heroService.update(this.hero)
            .then(function () { return _this.goBack(); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CloudinaryImage.prototype, "hero", void 0);
    CloudinaryImage = __decorate([
        core_1.Directive({
            selector: 'cl-image'
        }), 
        __metadata('design:paramtypes', [Object, Object, Location])
    ], CloudinaryImage);
    return CloudinaryImage;
}());
exports.CloudinaryImage = CloudinaryImage;
//# sourceMappingURL=cloudinary.component.js.map