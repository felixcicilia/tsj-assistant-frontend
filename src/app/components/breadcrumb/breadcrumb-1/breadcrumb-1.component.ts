import { Component, Input, input } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-breadcrumb-1',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumb-1.component.html',
  styles: ``,
})
export class Breadcrumb1Component {
  @Input() pageTitle!: string
  @Input() title!: string
}
