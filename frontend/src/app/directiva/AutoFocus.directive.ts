import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {

@Input() public autoFocus: boolean = false;
public constructor(private el: ElementRef) {}

public  ngAfterContentInit(): void {
  setTimeout(() => {
    this.el.nativeElement.focus();
});
}

}
