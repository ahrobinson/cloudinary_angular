import { Component, ElementRef, Input, Renderer, AfterContentInit, ContentChildren, QueryList, AfterViewInit, SimpleChange } from '@angular/core';

import { Cloudinary } from './cloudinary.service';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';

@Component({
  selector: 'cl-image',
  inputs: ['public-id'],
  template: `
    <img #cloudinaryImage>
    <ng-content></ng-content>
  `
})
export class CloudinaryImageDirective implements AfterViewInit {

  constructor(private el: ElementRef, renderer: Renderer, private cloudinary: Cloudinary) {
  }

  @ContentChildren(CloudinaryTransformationDirective)
  private transformations: QueryList<CloudinaryTransformationDirective>;

  ngAfterViewInit() {
    this.loadImage(this.el.nativeElement.getAttribute('public-id') || this.el.nativeElement.getAttribute('ng-reflect-public-id'));
  }

  loadImage(publicId: string) {
    const nativeElement = this.el.nativeElement;
    const cloudinary = this.cloudinary.getInstance();
    const img = nativeElement.children[0];
    const options = <any>this.cloudinary.toCloudinaryAttributes(nativeElement.attributes);
    if (this.transformations) {
      options.transformation = [];
      // Support chained transformations
      this.transformations.forEach(transformation => {
        console.log('transformation', transformation);
        options.transformation.push(this.cloudinary.toCloudinaryAttributes(transformation.getAttributes(), /^[^$]/));
      });
    }
    console.log('loadImage', this.transformations);


    if (options.responsive === "" || options.responsive === "true" || options.responsive === true) {
      options.responsive = true;
    }
    var url = cloudinary.url(publicId, options);
    if (options.responsive) {
      cloudinary.Util.setData(img, "src", url);
      cloudinary.cloudinary_update(img, options);
      cloudinary.responsive(options, false);
    } else {
      img.setAttribute('src', url);
    }
  };
}
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
