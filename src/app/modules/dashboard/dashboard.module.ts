import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { NgbCollapseModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { WalletComponent } from './components/wallet/component/wallet.component';
import { TransactionsComponent } from './components/transactions/component/transactions.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'
import { WalletInfoComponent } from './components/wallet/components/wallet-info/component/wallet-info.component';
import { EmptyWalletComponent } from './components/wallet/components/empty-wallet/empty-wallet.component';
import { ActionsComponent } from './components/wallet/components/wallet-info/components/actions/actions.component';
import { EmptyTransactionsComponent } from './components/transactions/components/empty-transactions/empty-transactions.component';
import { ListComponent } from './components/transactions/components/list/list.component';


@NgModule({
  declarations: [
    DashboardComponent,
    WalletComponent,
    TransactionsComponent,
    NavbarComponent,
    EmptyWalletComponent,
    WalletInfoComponent,
    ActionsComponent,
    EmptyTransactionsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutes,
    NgbDatepickerModule,
    NgbCollapseModule,
    SharedModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [DatePipe]
})
export class DashboardModule { }
