import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalconfirmfinishadvertComponent } from './modalconfirmfinishadvert.component';

describe('ModalconfirmfinishadvertComponent', () => {
  let component: ModalconfirmfinishadvertComponent;
  let fixture: ComponentFixture<ModalconfirmfinishadvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalconfirmfinishadvertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalconfirmfinishadvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
