import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavigationBar7Component } from './navigation-bar-7.component'

describe('NavigationBar7Component', () => {
  let component: NavigationBar7Component
  let fixture: ComponentFixture<NavigationBar7Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBar7Component],
    }).compileComponents()

    fixture = TestBed.createComponent(NavigationBar7Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
