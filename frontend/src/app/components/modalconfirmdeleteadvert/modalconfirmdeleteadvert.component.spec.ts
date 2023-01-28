import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalconfirmdeleteadvertComponent } from './modalconfirmdeleteadvert.component';

describe('ModalconfirmdeleteadvertComponent', () => {
  let component: ModalconfirmdeleteadvertComponent;
  let fixture: ComponentFixture<ModalconfirmdeleteadvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalconfirmdeleteadvertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalconfirmdeleteadvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
