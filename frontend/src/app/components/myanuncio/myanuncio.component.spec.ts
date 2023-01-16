import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyanuncioComponent } from './myanuncio.component';

describe('MyanuncioComponent', () => {
  let component: MyanuncioComponent;
  let fixture: ComponentFixture<MyanuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyanuncioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyanuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
