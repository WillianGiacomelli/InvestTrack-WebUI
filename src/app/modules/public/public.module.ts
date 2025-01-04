import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './component/public/public.component';
import { PublicRoutes } from './public.routing';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { StockSectionComponent } from './components/stock-section/component/stock-section.component';
import { AssetItemComponent } from './components/stock-section/components/asset-item/asset-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { CryptoItemComponent } from './components/stock-section/components/crypto-item/crypto-item.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


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
    StockSectionComponent,
    AssetItemComponent,
    FooterComponent,
    CryptoItemComponent,
    NotFoundComponent
  ],
})
export class PublicModule { }
