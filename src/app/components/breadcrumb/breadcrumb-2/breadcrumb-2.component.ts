import { Component, Input } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-breadcrumb-2',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumb-2.component.html',
  styles: ``,
})
export class Breadcrumb2Component {
  @Input() pageTitle!: string
  @Input() subTitle!: string
  @Input() title!: string
  @Input() className!: string
  @Input() breadcrumbLink!: string
}
