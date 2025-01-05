import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { NgbCollapseModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { WalletComponent } from './components/wallet/component/wallet.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'
import { WalletInfoComponent } from './components/wallet/components/wallet-info/component/wallet-info.component';
import { EmptyWalletComponent } from './components/wallet/components/empty-wallet/empty-wallet.component';
import { ActionsComponent } from './components/wallet/components/wallet-info/components/actions/actions.component';


@NgModule({
  declarations: [
    DashboardComponent,
    WalletComponent,
    TransactionsComponent,
    NavbarComponent,
    EmptyWalletComponent,
    WalletInfoComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutes,
    NgbDatepickerModule,
    NgbCollapseModule,
    SharedModule,
    NgxSkeletonLoaderModule
  ]
})
export class DashboardModule { }
