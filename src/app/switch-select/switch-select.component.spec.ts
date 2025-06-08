import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchSelectComponent } from './switch-select.component';

describe('SwitchSelectComponent', () => {
  let component: SwitchSelectComponent;
  let fixture: ComponentFixture<SwitchSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
