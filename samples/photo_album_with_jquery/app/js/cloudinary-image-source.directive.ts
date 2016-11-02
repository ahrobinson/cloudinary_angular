import { Directive, ElementRef, Renderer, AfterViewInit, Input } from '@angular/core';

import { Cloudinary } from './cloudinary.service';

@Directive({
  selector: '[clHref], [clSrc], [clSrcset]',
  inputs: ['clHref', 'clSrc', 'clSrcset']
})
export class CloudinaryImageSourceDirective implements AfterViewInit {

  private clHref: string;
  private clSrc: string;
  private clSrcset: string;

  constructor(private el: ElementRef, private renderer: Renderer, private cloudinary: Cloudinary) {
  }

  ngAfterViewInit() {
    let attrName, propertyValue
    if (this.clHref) {
      attrName = 'href';
      propertyValue = this.clHref;
    }
    else if (this.clSrc) {
      attrName = 'src';
      propertyValue = this.clSrc;
    }
    else if (this.clSrcset) {
      attrName = 'srcset';
      propertyValue = this.clSrcset;
    }

    let isSvg = false;

    if (this.clHref &&
      toString.call(this.el.nativeElement['href'] === '[object SVGAnimatedString]')) {
      this.el.nativeElement.setAttribute('xlinkHref', 'xlink:href');
      isSvg = true;
    }

    if (!attrName || !propertyValue) {
      throw new Error('Directive value is missing for clHref/clSrc/clSrcset')
    }

    const attrValue = this.cloudinary.url(propertyValue, this.cloudinary.toCloudinaryAttributes(this.el.nativeElement.attributes));
    this.el.nativeElement.setAttribute(attrName, attrValue);

    // on IE, if "ng:src" directive declaration is used and "src" attribute doesn't exist
    // then calling element.setAttribute('src', 'foo') doesn't do anything, so we need
    // to set the property as well to achieve the desired effect.
    // we use attr[attrName] value since $set can sanitize the url.
    // Check for IE: http://stackoverflow.com/a/32139375/1980950
    var msie = 0; //$document[0].documentMode;
    // if is IE (documentMode contains IE version)
    if (msie && !isSvg) {
      // IE logic here
      this.el.nativeElement[attrName] = attrValue;
    }
  };
}
