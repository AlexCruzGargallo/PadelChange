import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsearchracketComponent } from './modalsearchracket.component';

describe('ModalsearchracketComponent', () => {
  let component: ModalsearchracketComponent;
  let fixture: ComponentFixture<ModalsearchracketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalsearchracketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsearchracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
