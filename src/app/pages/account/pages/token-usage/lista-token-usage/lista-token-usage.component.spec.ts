import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTokenUsageComponent } from './lista-token-usage.component';

describe('ListaTokenUsageComponent', () => {
  let component: ListaTokenUsageComponent;
  let fixture: ComponentFixture<ListaTokenUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTokenUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTokenUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
