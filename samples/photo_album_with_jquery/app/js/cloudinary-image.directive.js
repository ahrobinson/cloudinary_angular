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
var cloudinary_service_1 = require('./cloudinary.service');
var cloudinary_transformation_directive_1 = require('./cloudinary-transformation.directive');
var CloudinaryImageDirective = (function () {
    function CloudinaryImageDirective(el, renderer, cloudinary) {
        this.el = el;
        this.cloudinary = cloudinary;
    }
    CloudinaryImageDirective.prototype.ngAfterViewInit = function () {
        this.loadImage(this.el.nativeElement.getAttribute('public-id') || this.el.nativeElement.getAttribute('ng-reflect-public-id'));
    };
    CloudinaryImageDirective.prototype.loadImage = function (publicId) {
        var _this = this;
        var nativeElement = this.el.nativeElement;
        var cloudinary = this.cloudinary.getInstance();
        var img = nativeElement.children[0];
        var options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes);
        if (this.transformations) {
            options.transformation = [];
            // Support chained transformations
            this.transformations.forEach(function (transformation) {
                options.transformation.push(_this.cloudinary.toCloudinaryAttributes(transformation.getAttributes(), /^[^$]/));
            });
        }
        if (options.responsive === "" || options.responsive === "true" || options.responsive === true) {
            options.responsive = true;
        }
        var url = cloudinary.url(publicId, options);
        if (options.responsive) {
            cloudinary.Util.setData(img, "src", url);
            cloudinary.cloudinary_update(img, options);
            cloudinary.responsive(options, false);
        }
        else {
            img.setAttribute('src', url);
        }
    };
    ;
    __decorate([
        core_1.ContentChildren(cloudinary_transformation_directive_1.CloudinaryTransformationDirective), 
        __metadata('design:type', core_1.QueryList)
    ], CloudinaryImageDirective.prototype, "transformations", void 0);
    CloudinaryImageDirective = __decorate([
        core_1.Component({
            selector: 'cl-image',
            inputs: ['public-id'],
            template: "\n    <img>\n    <ng-content></ng-content>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, cloudinary_service_1.Cloudinary])
    ], CloudinaryImageDirective);
    return CloudinaryImageDirective;
}());
exports.CloudinaryImageDirective = CloudinaryImageDirective;
// var Controller = function($scope) {
//   this.addTransformation = function(ts) {
//     $scope.transformations = $scope.transformations || [];
//     $scope.transformations.push(ts);
//   }
// };
// Controller.$inject = ['$scope'];
// return {
//   restrict : 'E',
//   replace: true,
//   transclude : true,
//   template: "<img ng-transclude/>",
//   scope: {},
//   priority: 99,
//   controller: Controller,
//   // The linking function will add behavior to the template
//   link : function(scope, element, attrs) {
//     var options = toCloudinaryAttributes(attrs);
//     var publicId = null;
//     if (scope.transformations) {
//       options.transformation = scope.transformations;
//     }
//     // store public id and load image
//     attrs.$observe('publicId', function(value){
//       if (!value) return;
//       publicId = value;
//       loadImage();
//     });
//     // observe and update version attribute
//     attrs.$observe('version', function(value){
//       if (!value) return;
//       options['version'] = value;
//       loadImage();
//     });
//     if (attrs.htmlWidth) {
//       element.attr("width", attrs.htmlWidth);
//     } else {
//       element.removeAttr("width");
//     }
//     if (attrs.htmlHeight) {
//       element.attr("height", attrs.htmlHeight);
//     } else {
//       element.removeAttr("height");
//     }
//     var loadImage = function() {
//       if (options.responsive === "" || options.responsive === "true" || options.responsive === true) {
//         options.responsive = true;
//       }
//       var url = cloudinary.url(publicId, options);
//       if (options.responsive) {
//         cloudinary.Util.setData(element[0], "src", url);
//         cloudinary.cloudinary_update(element[0], options);
//         cloudinary.responsive(options, false);
//       } else {
//         element.attr('src', url);
//       }
//     };
//   }
// };
//# sourceMappingURL=cloudinary-image.directive.js.map