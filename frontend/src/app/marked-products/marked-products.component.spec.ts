import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkedProductsComponent } from './marked-products.component';

describe('MarkedProductsComponent', () => {
  let component: MarkedProductsComponent;
  let fixture: ComponentFixture<MarkedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
