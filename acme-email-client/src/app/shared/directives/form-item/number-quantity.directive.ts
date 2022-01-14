import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { turnAlphanumberic } from '@core';
import { D_NUMBER_QUANTITY } from '@shared/constants';

@Directive({
  selector: 'input[dformItem], textarea[dformItem]'
})
export class NumberQuantityDirective {

  @Input() dformItem;
  private el: NgControl;
  constructor(
    private control: NgControl,
    private _el: ElementRef,) {
  }

  charRegex = /[^0-9]*$/;

  /**
   * 
   * @param value []
   */
  // Listen for the input event to also handle copy and paste.
  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Use NgControl patchValue to prevent the issue on validation
    if (this.dformItem === D_NUMBER_QUANTITY) {
      let newValue = '';
      for (var i = 0; i < value.length; i++) {
        if(i == 0 && value == '0') {
          newValue = '';
        } else {
          newValue = turnAlphanumberic(newValue, /^0+(?!$)/) + turnAlphanumberic(value[i], this.charRegex)
        }
      }
      // newValue = turnAlphanumberic(newValue, /^0+(?!$)/);
      if(Number(newValue) == 0) {
        newValue = '';
      }
      if(newValue == '') {
        this._el.nativeElement.value = '';
        this.control.control.patchValue('');
      } else {
        this.control.control.patchValue(turnAlphanumberic(newValue, this.charRegex));
      }
      
    }
  }
  
}
