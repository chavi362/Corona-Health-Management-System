import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnvaccinatedClientsComponent } from './unvaccinated-clients.component';

describe('UnvaccinatedClientsComponent', () => {
  let component: UnvaccinatedClientsComponent;
  let fixture: ComponentFixture<UnvaccinatedClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnvaccinatedClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnvaccinatedClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
