import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input()
  highlightColor: string = 'yellow';

  constructor(private el: ElementRef) {
    //el.nativeElement.style.backgroundColor = 'yellow';
    //el.nativeElement 로 하면 NODE가 된다.
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = null;
  }

}
