import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HorizontalAppMenu } from './horizontal-app-menu.component'

describe('NavigationMenuComponent', () => {
  let component: HorizontalAppMenu
  let fixture: ComponentFixture<HorizontalAppMenu>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalAppMenu],
    }).compileComponents()

    fixture = TestBed.createComponent(HorizontalAppMenu)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
