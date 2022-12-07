import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalasgeneralComponent } from './palasgeneral.component';

describe('PalasgeneralComponent', () => {
  let component: PalasgeneralComponent;
  let fixture: ComponentFixture<PalasgeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalasgeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PalasgeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
