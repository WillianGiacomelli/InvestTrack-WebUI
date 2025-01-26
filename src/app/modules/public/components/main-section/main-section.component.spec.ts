import { By } from "@angular/platform-browser";
import { MainSectionComponent } from "./main-section.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe('MainSectionComponent', () => {
  let component: MainSectionComponent;
  let fixture: ComponentFixture<MainSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainSectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title text', () => {
    const titleElement = fixture.debugElement.query(By.css('h1.title'));
    expect(titleElement.nativeElement.textContent).toContain('A sua plataforma para gestão de investimentos');
  });

  it('should render the subtitle text', () => {
    const subtitleElement = fixture.debugElement.query(By.css('p.subtitle'));
    expect(subtitleElement.nativeElement.textContent).toContain('Gerencie seus investimentos de forma fácil e descomplicada.');
  });

  it('should apply bg-gradient class to the main div', () => {
    const mainDiv = fixture.debugElement.query(By.css('.bg-gradient'));
    expect(mainDiv.nativeElement.classList).toContain('bg-gradient');
  });

  it('should center the content using flexbox', () => {
    const flexContainer = fixture.debugElement.query(By.css('.d-flex'));
    expect(flexContainer.nativeElement.classList).toContain('d-flex');
    expect(flexContainer.nativeElement.classList).toContain('justify-content-center');
    expect(flexContainer.nativeElement.classList).toContain('align-items-center');
  });
});
