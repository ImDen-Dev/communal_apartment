import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunalServiceComponent } from './communal-service.component';

describe('CommunalServiceComponent', () => {
  let component: CommunalServiceComponent;
  let fixture: ComponentFixture<CommunalServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunalServiceComponent]
    });
    fixture = TestBed.createComponent(CommunalServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
