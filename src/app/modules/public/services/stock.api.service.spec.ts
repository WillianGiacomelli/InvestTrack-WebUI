import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { StockApiHttpService } from "./stock.api.http.service";
import { environment } from "../../../../environments/environment";


describe('StockApiHttpService', () => {
  let httpStockService: StockApiHttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StockApiHttpService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    httpStockService = TestBed.inject(StockApiHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('StockApiHttpService should be created', () => {
    expect(httpStockService).toBeTruthy();
  });

  it('should get the assets quotes', () => {
    const mockResponse = {
      data: [
        { id: 1, name: "Asset 1", price: 100 },
        { id: 2, name: "Asset 2", price: 200 },
        { id: 3, name: "Asset 3", price: 300 },
      ],
    };

    httpStockService.getStocks().subscribe((response: any) => {
      expect(response.data).toBeTruthy();
      expect(response.data.length).toBe(3);
      expect(response.data[0].name).toEqual("Asset 1");
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/stock/quote`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

});
