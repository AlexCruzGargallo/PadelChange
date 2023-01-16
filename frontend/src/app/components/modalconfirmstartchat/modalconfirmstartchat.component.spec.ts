import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalconfirmstartchatComponent } from './modalconfirmstartchat.component';

describe('ModalconfirmstartchatComponent', () => {
  let component: ModalconfirmstartchatComponent;
  let fixture: ComponentFixture<ModalconfirmstartchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalconfirmstartchatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalconfirmstartchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
