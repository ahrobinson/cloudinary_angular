import { Directive, ElementRef, Renderer, AfterViewInit, Input } from '@angular/core';

import { Cloudinary } from './cloudinary.service';

const ATTRIBUTE_PREFIX = 'ng-reflect-cl_'
@Directive({
  selector: '[clHref]',//, [clSrc], [clSrcset]',
  inputs: ['clHref']
})
export class CloudinaryImageSourceDirective implements AfterViewInit {
  private attrName: string;

  constructor(private el: ElementRef, private renderer: Renderer, private cloudinary: Cloudinary) {
  }

  ngAfterViewInit() {
    const attrs = this.el.nativeElement.attributes;
    for (var i = attrs.length - 1; i >= 0; i--) {
      if (attrs[i].name.startsWith(ATTRIBUTE_PREFIX)) {
        this.attrName = attrs[i].name.substring(14).toLowerCase();
      }
    }
    let propName = this.attrName;
    let name = this.attrName;

    if (this.attrName === 'href' &&
      toString.call(this.el.nativeElement['href'] === '[object SVGAnimatedString]')) {
      name = 'xlinkHref';
      this.el.nativeElement.setAttribute(name, 'xlink:href');
      propName = null;
    }

    let attrValue = this.el.nativeElement.getAttribute(`${ATTRIBUTE_PREFIX}${this.attrName}`);

    if (!attrValue)
      return;

    attrValue = this.cloudinary.getInstance().url(attrValue, this.cloudinary.toCloudinaryAttributes(this.el.nativeElement.attributes));
    this.el.nativeElement.setAttribute(this.attrName, attrValue);

    // on IE, if "ng:src" directive declaration is used and "src" attribute doesn't exist
    // then calling element.setAttribute('src', 'foo') doesn't do anything, so we need
    // to set the property as well to achieve the desired effect.
    // we use attr[attrName] value since $set can sanitize the url.
    // Check for IE: http://stackoverflow.com/a/32139375/1980950
    var msie = 0; //$document[0].documentMode;
    // if is IE (documentMode contains IE version)
    if (msie && propName) {
      // IE logic here
      this.el.nativeElement[propName] = attrValue;
    }
  };
}
/*

['Src', 'Srcset', 'Href'].forEach(function (attrName) {
  var normalized = 'cl' + attrName;
  attrName = attrName.toLowerCase();
    return {
      priority: 99, // it needs to run after the attributes are interpolated
      link: function (scope, element, attr) {
        var propName = attrName,
          name = attrName;

        if (attrName === 'href' &&
          toString.call(element.prop('href')) === '[object SVGAnimatedString]') {
          name = 'xlinkHref';
          attr.$attr[name] = 'xlink:href';
          propName = null;
        }

        attr.$observe(normalized, function (value) {
          if (!value)
            return;

          value = cloudinary.url(value, toCloudinaryAttributes(element[0].attributes));
          attr.$set(name, value);

          // on IE, if "ng:src" directive declaration is used and "src" attribute doesn't exist
          // then calling element.setAttribute('src', 'foo') doesn't do anything, so we need
          // to set the property as well to achieve the desired effect.
          // we use attr[attrName] value since $set can sanitize the url.
          if ($sniffer.msie && propName) element.prop(propName, attr[name]);
        });
      }
    };
});
*/