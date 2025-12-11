import {
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
} from '@angular/core'

@Component({
  selector: 'component-preloader',
  standalone: true,
  imports: [],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.scss',
})
export class PreloaderComponent implements AfterViewInit {
  @ViewChild('pageLoading') pageLoading!: ElementRef

  ngAfterViewInit(): void {
    if (this.pageLoading.nativeElement) {
      setTimeout(() => {
        this.pageLoading.nativeElement.classList.remove('active')
      }, 500)
    }
  }
}
