import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcreateadvertComponent } from './modalcreateadvert.component';

describe('ModalcreateadvertComponent', () => {
  let component: ModalcreateadvertComponent;
  let fixture: ComponentFixture<ModalcreateadvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalcreateadvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcreateadvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
