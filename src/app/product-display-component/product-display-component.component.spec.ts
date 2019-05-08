import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDisplayComponentComponent } from './product-display-component.component';

describe('ProductDisplayComponentComponent', () => {
  let component: ProductDisplayComponentComponent;
  let fixture: ComponentFixture<ProductDisplayComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDisplayComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDisplayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
