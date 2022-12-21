import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalaComponent } from './pala.component';

describe('PalaComponent', () => {
  let component: PalaComponent;
  let fixture: ComponentFixture<PalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
