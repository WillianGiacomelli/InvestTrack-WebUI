import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { authInterceptor } from './auth-interceptor';

describe('authInterceptor', () => {
  let cookieService: CookieService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CookieService,
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    cookieService = TestBed.inject(CookieService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add the Authorization header when token exists', () => {
    jest.spyOn(cookieService, 'get').mockReturnValue('mocked-token');

    const testUrl = '/test-endpoint';
    const httpClient = TestBed.inject(HttpClient);

    httpClient.get(testUrl).subscribe();

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.headers.get('Authorization')).toBe('Bearer mocked-token');

    req.flush({});
  });

  it('should not add the Authorization header when token is missing', () => {
    jest.spyOn(cookieService, 'get').mockReturnValue('');

    const testUrl = '/test-endpoint';
    const httpClient = TestBed.inject(HttpClient);
    httpClient.get(testUrl).subscribe();

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.headers.has('Authorization')).toBeFalsy();

    req.flush({});
  });
});
