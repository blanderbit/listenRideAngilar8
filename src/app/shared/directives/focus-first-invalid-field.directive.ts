import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[lnrFocusFirstInvalidField]'
})
export class FocusFirstInvalidFieldDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('submit', ['$event'])
  onFormSubmit(el) {
    const invalidElements = this.el.nativeElement.querySelectorAll('inputs.ng-invalid');
    if (invalidElements.length > 0) {
      setTimeout(() => {
        invalidElements.item(0).focus();
      }, 500);
    }

  }
}
