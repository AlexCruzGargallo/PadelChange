import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalacreateComponent } from './palacreate.component';

describe('PalacreateComponent', () => {
  let component: PalacreateComponent;
  let fixture: ComponentFixture<PalacreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalacreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PalacreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
