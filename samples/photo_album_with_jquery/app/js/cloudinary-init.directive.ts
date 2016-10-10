import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[ngInit]'
})
class NgInit {
  @Input() ngInit;
  ngOnInit() {
    if(this.ngInit) { this.ngInit(); }
  }
}