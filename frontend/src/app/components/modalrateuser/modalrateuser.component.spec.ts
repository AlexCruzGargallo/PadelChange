import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalrateuserComponent } from './modalrateuser.component';

describe('ModalrateuserComponent', () => {
  let component: ModalrateuserComponent;
  let fixture: ComponentFixture<ModalrateuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalrateuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalrateuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
