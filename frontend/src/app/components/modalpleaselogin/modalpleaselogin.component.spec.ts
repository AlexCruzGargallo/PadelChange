import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpleaseloginComponent } from './modalpleaselogin.component';

describe('ModalpleaseloginComponent', () => {
  let component: ModalpleaseloginComponent;
  let fixture: ComponentFixture<ModalpleaseloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalpleaseloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalpleaseloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
