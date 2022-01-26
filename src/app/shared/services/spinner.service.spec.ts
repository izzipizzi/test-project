import { TestBed } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show spinner', (done: DoneFn) => {
    service.show();
    service.isLoading.subscribe((value) => {
      expect(value).toBeTrue();
      done();
    });
  });

  it('should hide spinner', (done: DoneFn) => {
    service.hide();
    service.isLoading.subscribe((value) => {
      expect(value).toBeFalse();
      done();
    });
  });
});
