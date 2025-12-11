import { Component, HostListener, ElementRef, type OnInit } from '@angular/core'

@Component({
  selector: 'component-back-to-top',
  standalone: true,
  imports: [],
  templateUrl: './back-to-top.component.html',
})
export class BackToTopComponent implements OnInit {
  constructor(private eleRef: ElementRef) {}

  offsetFromTop!: number
  button!: HTMLElement
  progress!: SVGGeometryElement | null
  length!: number

  ngOnInit() {
    this.button = this.eleRef.nativeElement.querySelector('.btn-scroll-top')
    const scrollOffset = 450
    if (!this.button) return
    this.offsetFromTop = parseInt(scrollOffset.toString(), 10)
    this.progress = this.button.querySelector('svg circle')
    if (this.progress) {
      this.length = this.progress.getTotalLength()
      this.progress.style.strokeDasharray = this.length.toString()
      this.progress.style.strokeDashoffset = this.length.toString()
      this.showProgress()
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const target = window
    if (target && target.scrollY > this.offsetFromTop) {
      this.button.classList.add('show')
    } else {
      this.button.classList.remove('show')
    }
    this.showProgress()
  }

  showProgress() {
    const scrollPercent =
      (document.body.scrollTop + document.documentElement.scrollTop) /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)
    const draw = this.length * scrollPercent
    if (this.progress)
      this.progress.style.strokeDashoffset = (this.length - draw).toString()
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
