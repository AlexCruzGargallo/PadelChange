import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalainfoComponent } from './palainfo.component';

describe('PalainfoComponent', () => {
  let component: PalainfoComponent;
  let fixture: ComponentFixture<PalainfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalainfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PalainfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
