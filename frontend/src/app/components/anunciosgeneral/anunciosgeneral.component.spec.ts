import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnunciosgeneralComponent } from './anunciosgeneral.component';

describe('AnunciosgeneralComponent', () => {
  let component: AnunciosgeneralComponent;
  let fixture: ComponentFixture<AnunciosgeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnunciosgeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnunciosgeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
