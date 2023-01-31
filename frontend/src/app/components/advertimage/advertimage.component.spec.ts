import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertimageComponent } from './advertimage.component';

describe('AdvertimageComponent', () => {
  let component: AdvertimageComponent;
  let fixture: ComponentFixture<AdvertimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertimageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
