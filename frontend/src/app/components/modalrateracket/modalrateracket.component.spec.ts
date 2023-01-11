import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalrateracketComponent } from './modalrateracket.component';

describe('ModalrateracketComponent', () => {
  let component: ModalrateracketComponent;
  let fixture: ComponentFixture<ModalrateracketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalrateracketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalrateracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
