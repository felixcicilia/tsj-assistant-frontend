import { Directive, ElementRef, HostListener, Input } from '@angular/core'

@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxMouseMoveDirective {
  @Input('parallaxScale') parallaxScale: number = 1

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    const element = this.elementRef.nativeElement
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = event.clientX - centerX
    const distanceY = event.clientY - centerY

    const percentX = distanceX / (rect.width / 2)
    const percentY = distanceY / (rect.height / 2)

    Array.from(element.children).forEach((child: Element) => {
      const childElement = child as HTMLElement
      const depth = parseFloat(childElement.getAttribute('data-depth') || '0')
      childElement.style.transform = `translate(${
        -percentX * this.parallaxScale * depth
      }%, ${-percentY * this.parallaxScale * depth}%)`
    })
  }
}
