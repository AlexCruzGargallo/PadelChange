import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioinfoComponent } from './anuncioinfo.component';

describe('AnuncioinfoComponent', () => {
  let component: AnuncioinfoComponent;
  let fixture: ComponentFixture<AnuncioinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnuncioinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
