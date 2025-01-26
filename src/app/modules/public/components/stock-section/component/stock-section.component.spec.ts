import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockSectionComponent } from './stock-section.component';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../../../core/models/response/ApiResponse';
import { StockQuote } from '../../../../../core/models/quote/stock/StockQuote';
import { StockApiHttpService } from '../../../services/stock.api.http.service';

// Mocks dos serviços
jest.mock('../../../../services/stock-api-http.service');
jest.mock('ngx-toastr');

describe('StockSectionComponent', () => {
  let component: StockSectionComponent;
  let fixture: ComponentFixture<StockSectionComponent>;
  let stockApiHttpServiceMock: jest.Mocked<StockApiHttpService>;
  let toastrServiceMock: jest.Mocked<ToastrService>;

  beforeEach(async () => {
    const httpClientMock = {} as HttpClient;
    stockApiHttpServiceMock = new StockApiHttpService(httpClientMock) as jest.Mocked<StockApiHttpService>;
    toastrServiceMock = new ToastrService(null as any, null as any, null as any, null as any, null as any) as jest.Mocked<ToastrService>;

    await TestBed.configureTestingModule({
      declarations: [StockSectionComponent],
      providers: [
        { provide: StockApiHttpService, useValue: stockApiHttpServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getStocks on ngOnInit', () => {
    stockApiHttpServiceMock.getStocks.mockReturnValue(of({ data: [], message: '', error: false }));

    component.ngOnInit();
    expect(stockApiHttpServiceMock.getStocks).toHaveBeenCalled();
  });

  it('should update stock data when getStocks returns success', () => {
    // Mock de resposta atualizado conforme a estrutura correta de StockQuote
    const mockResponse: ApiResponse<StockQuote> = {
      data: [
        {
          stock: 'Stock 1',
          name: 'Stock 1',
          close: 100,
          change: 1,
          volume: 1000,
          market_cap: null,
          logo: '',
          sector: '',
          type: '',
        },
      ],
      message: '',
      error: false,
    };

    stockApiHttpServiceMock.getStocks.mockReturnValue(of(mockResponse));

    component.getStocks();
    fixture.detectChanges();

    // Agora estamos apenas utilizando o 'stock' como no modelo de StockQuote
    expect(component.stockAscCloseQuote).toEqual([mockResponse.data[0]]);
    expect(component.stockDescCloseQuote).toEqual([mockResponse.data[0]]);
    // Ajuste similar para fundos e criptos
    expect(component.fundAscCloseQuote).toEqual([mockResponse.data[0]]);
    expect(component.fundDescCloseQuote).toEqual([mockResponse.data[0]]);
    expect(component.cryptoCloseQuote).toEqual([]);  // Ajuste conforme seu modelo
  });

  it('should display an error toast when getStocks fails', () => {
    const errorResponse = { error: { message: 'Error fetching stocks' } };
    stockApiHttpServiceMock.getStocks.mockReturnValue(throwError(errorResponse));

    component.getStocks();
    expect(toastrServiceMock.error).toHaveBeenCalledWith('Error fetching stocks', 'Erro', { progressBar: true });
  });

  it('should group cryptos correctly', () => {
    const cryptos = [
      { name: 'Crypto 1', price: 300 },
      { name: 'Crypto 2', price: 200 },
      { name: 'Crypto 3', price: 150 },
    ];
    const groupedCryptos = component.groupCryptos(cryptos, 2);

    expect(groupedCryptos.length).toBe(2); // Espera-se dois grupos
    expect(groupedCryptos[0].length).toBe(2); // O primeiro grupo deve ter 2 criptos
    expect(groupedCryptos[1].length).toBe(1); // O segundo grupo deve ter 1 cripto
  });

  it('should render stocks and funds lists correctly', () => {
    const mockResponse: ApiResponse<StockQuote> = {
      data: [
        {
          stock: 'Stock 1',
          name: 'Stock 1',
          close: 100,
          change: 1,
          volume: 1000,
          market_cap: null,
          logo: '',
          sector: '',
          type: '',
        },
      ],
      message: '',
      error: false,
    };

    stockApiHttpServiceMock.getStocks.mockReturnValue(of(mockResponse));

    component.getStocks();
    fixture.detectChanges();

    const stockItems = fixture.debugElement.queryAll(By.css('app-asset-item'));
    expect(stockItems.length).toBeGreaterThan(0);
  });
});
