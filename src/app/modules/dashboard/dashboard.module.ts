import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { NgbCalendar, NgbCollapseModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { WalletComponent } from './components/wallet/component/wallet.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    DashboardComponent,
    WalletComponent,
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutes,
    NgbDatepickerModule,
    NgbCollapseModule
  ]
})
export class DashboardModule { }
