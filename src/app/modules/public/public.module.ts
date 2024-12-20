import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './component/public/public.component';
import { PublicRoutes } from './public.routing';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { StockSectionComponent } from './components/stock-section/stock-section.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutes,
    NgxSkeletonLoaderModule
  ],
  declarations: [
    PublicComponent,
    NavbarComponent,
    MainSectionComponent,
    StockSectionComponent
  ],
})
export class PublicModule { }
