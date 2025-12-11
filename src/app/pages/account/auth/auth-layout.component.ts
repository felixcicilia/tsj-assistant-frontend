import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'auth-layout',
  standalone: true,
  imports: [RouterModule, NgbTooltipModule],
  template: `
    <div class="vh-100 d-flex flex-column">
      <main class="page-wrapper">
        <div class="d-lg-flex position-relative h-100">
          <a
            class="text-nav btn btn-icon bg-light border rounded-circle position-absolute top-0 end-0 p-0 mt-3 me-3 mt-sm-4 me-sm-4"
            routerLink="/"
            ngbTooltip="Back to home"
            data-bs-toggle="tooltip"
            placement="left"
            title="Back to home"
            aria-label="Back to home"
          >
            <i class="ai-home"></i>
          </a>

          <ng-content></ng-content>

          <div
            class="w-50 bg-size-cover bg-repeat-0 bg-position-center"
            style="background-image: url(assets/img/account/cover.jpg)"
          ></div>
        </div>
      </main>
    </div>
  `,
})
export class AuthLayoutComponent {}
