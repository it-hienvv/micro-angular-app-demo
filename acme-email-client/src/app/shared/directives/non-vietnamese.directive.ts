import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { turnAlphanumberic } from '@core';

/**
 * @date 11/03/2019
 * @description directive for number input
 */
@Directive({
  selector: '[nonVietNamese]'
})
export class NonVietNameseDirective {

  characterNumberandTex = /[^a-zA-Z0-9\-'/]$/;

  constructor(private _el: ElementRef,
    private control: NgControl) { }

  @HostListener('paste', ['$event']) onPaste(event: KeyboardEvent) {
    this._el.nativeElement.value = turnAlphanumberic(this._el.nativeElement.value, this.characterNumberandTex);
    this.control.control.setValue(this._el.nativeElement.value, this.characterNumberandTex);
  }

  @HostListener('input', ['$event']) onInputChange(event) {
    this._el.nativeElement.value = turnAlphanumberic(this._el.nativeElement.value, this.characterNumberandTex);
    this.control.control.setValue(turnAlphanumberic(this._el.nativeElement.value, this.characterNumberandTex));
  }
  
}
