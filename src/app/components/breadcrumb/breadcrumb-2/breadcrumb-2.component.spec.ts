import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Breadcrumb2Component } from './breadcrumb-2.component'

describe('Breadcrumb2Component', () => {
  let component: Breadcrumb2Component
  let fixture: ComponentFixture<Breadcrumb2Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Breadcrumb2Component],
    }).compileComponents()

    fixture = TestBed.createComponent(Breadcrumb2Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
