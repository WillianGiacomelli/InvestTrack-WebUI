import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkTheme = "dark-theme";
  private lightTheme = "light-theme";

  constructor() {
    this.loadTheme();
  }


  public toggleTheme(){
    document.documentElement.classList.toggle(this.darkTheme);
    const theme = document.documentElement.classList.contains(this.darkTheme) ? this.darkTheme : this.lightTheme;
    localStorage.setItem('theme', theme);
}

  private loadTheme(){
    const theme = localStorage.getItem('theme');
    if(theme == this.darkTheme){
      document.documentElement.classList.add(this.darkTheme);
    }
  }

  public isDarkTheme(){
    return document.documentElement.classList.contains(this.darkTheme);
  }
}
