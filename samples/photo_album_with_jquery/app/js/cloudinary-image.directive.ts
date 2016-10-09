import { Directive, ElementRef, Input, Renderer } from '@angular/core';

import { Cloudinary } from './cloudinary.service';

@Directive({
  selector: 'cl-image'
})
export class CloudinaryImageDirective {

  constructor(el: ElementRef, renderer: Renderer, private cloudinary: Cloudinary) {
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
    renderer.setText(el.nativeElement, cloudinary.getText());
    
    console.log(cloudinary.getInstance().url('myphotoalbum', {format: 'json', type: 'list'}));
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

}
