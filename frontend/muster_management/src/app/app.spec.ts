import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app'; // CORRECTED: Changed 'App' to 'AppComponent'
import { LoginComponent } from './login/login.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, LoginComponent], // Include both standalone components for the test environment
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent); // CORRECTED: Use AppComponent
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the login module view wrapper', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Tells Angular to run change detection and render the child components
    await fixture.whenStable();
    
    const compiled = fixture.nativeElement as HTMLElement;
    // CORRECTED: Verify that the app successfully renders our main portal header instead of the deleted default text
    expect(compiled.querySelector('h1')?.textContent).toContain('MUSTER MANAGEMENT SYSTEM');
  });
});