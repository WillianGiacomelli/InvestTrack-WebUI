import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { environment } from "../../../../../environments/environment";
import { ApiResponse } from "../../../../core/models/response/ApiResponse";
import { WalletResponse } from "../../../../core/models/wallet/response/walletResponse";
import { WalletHttpService } from "./wallet-http.service";
import { provideHttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";

describe('WalletHttpService', () => {
  let service: WalletHttpService;
  let httpTestingController: HttpTestingController;

  const mockWalletResponse: ApiResponse<WalletResponse> = {
    error: false,
    data: [{ id: 1, userId: 1, name: 'carteira' }],
    message: 'Wallet fetched successfully',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalletHttpService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],

    });
    service = TestBed.inject(WalletHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch wallet data correctly (GET)', () => {
    const userId = 1;

    service.getWallet(userId).subscribe((response: any) => {
      expect(response).toEqual(mockWalletResponse);
    });

    const req = httpTestingController.expectOne((req) =>
      req.method === 'GET' &&
      req.url === `${environment.API_URL}/wallet` &&
      req.params.get('userId') === userId.toString()
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockWalletResponse); // Mock the response
  });

  it('should handle error when fetching wallet (GET)', () => {
    const userId = 1;
    const errorMessage = 'Error fetching wallet';

    service.getWallet(userId).subscribe({
      next: () => fail('should have failed with an error'),
      error: (error: any) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      },
    });

    const req = httpTestingController.expectOne((req) =>
      req.method === 'GET' &&
      req.url === `${environment.API_URL}/wallet` &&
      req.params.get('userId') === userId.toString()
    );

    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should post wallet data correctly (POST)', () => {
    const walletData: WalletResponse = { id: 1, userId: 1, name: 'carteira' };

    service.postWallet(walletData).subscribe((response: any) => {
      expect(response).toEqual(mockWalletResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'POST',
      url: `${environment.API_URL}/wallet`,
    });

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(walletData); // Check if the request body is correct
    req.flush(mockWalletResponse); // Mock the response
  });

  it('should handle error when posting wallet data (POST)', () => {
    const walletData: WalletResponse = { id: 1, userId: 1, name: 'carteira' };
    const errorMessage = 'Error posting wallet';

    service.postWallet(walletData).subscribe({
      next: () => fail('should have failed with an error'),
      error: (error: any) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      },
    });

    const req = httpTestingController.expectOne({
      method: 'POST',
      url: `${environment.API_URL}/wallet`,
    });

    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});
