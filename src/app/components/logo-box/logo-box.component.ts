import { Component, Input } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'component-logo-box',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './logo-box.component.html',
})

// Use LogoBoxComponent to replace Around's logo with your own Branding Logo in whole App
export class LogoBoxComponent {
  @Input() className?: string
}
