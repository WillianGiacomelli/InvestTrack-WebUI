import { TransactionHttpService } from './../../../../../../services/investments/transaction/transaction-http.service';
import { Component, inject, Input, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserAuthenticationService } from '../../../../../../../../shared/services/userAuthentication.service';
import { WalletBehaviorService } from '../../../../../../services/wallet/wallet-behavior.service';
import { DatePipe } from '@angular/common';
import { InvestmentsCategoryHttpService } from '../../../../../../services/investments/category/investments-category-http.service';
import { InvestmentCategoryResponse } from '../../../../../../../../core/models/investment/category/InvestmentCategoryResponse';
import { InvestmentsBrokerHttpService } from '../../../../../../services/investments/broker/investments-broker-http.service';
import { InvestmentBrokerResponse } from '../../../../../../../../core/models/investment/broker/InvestmentBrokerResponse';
import { AssetHttpService } from '../../../../../../services/investments/asset/asset-http.service';
import { InvestmentCategoryEnum } from '../../../../../../../../core/enums/investmentCategoryEnum';
import Swal from 'sweetalert2';
import { ActionBehaviorService } from '../services/action-behavior.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() options: any;
  @Input() data: any;
  public isEdit: boolean = false;
  public addAssetForm!: FormGroup;
  public investmentCategories: InvestmentCategoryResponse[] = [];
  public investmentBrokers: InvestmentBrokerResponse[] = [];
  public investmentType: typeof InvestmentCategoryEnum = InvestmentCategoryEnum;
  public investmentTypeSelected!: InvestmentCategoryEnum | null;
  private _modalService = inject(NgbModal);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _userAuthenticationService: UserAuthenticationService = inject(UserAuthenticationService);
  private _toastService: ToastrService = inject(ToastrService);
  private _walletBehaviorService: WalletBehaviorService = inject(WalletBehaviorService);
  private _investmentsCategoryHttpService: InvestmentsCategoryHttpService = inject(InvestmentsCategoryHttpService);
  private _investmentsBrokerHttpService: InvestmentsBrokerHttpService = inject(InvestmentsBrokerHttpService);
  private _assetHttpService: AssetHttpService = inject(AssetHttpService);
  private _transactionHttpService: TransactionHttpService = inject(TransactionHttpService);
  private _actionBehaviorService: ActionBehaviorService = inject(ActionBehaviorService);
  public datePipe: DatePipe = inject(DatePipe);


  closeResult: WritableSignal<string> = signal('');

  constructor() {
    const wallet = this._walletBehaviorService.getWallet();
    const walletId = wallet![0].id;

    this.addAssetForm = this._formBuilder.group({
      ticker: ['',Validators.required],
      amount: ['',Validators.required],
      buyingPrice: ['',Validators.required],
      lastTransaction: ['',Validators.required],
      walletId: [walletId],
      categoryId: ['',Validators.required],
      brokerId: ['',Validators.required],
    });
    this._getInvestmentCategory();
    this._getInvestmentBroker();
  }
  ngOnInit(): void {
  }

  public remove(){
    Swal.fire({
      title: `Deseja remover a transação referete ao ativo:  ${this.data.investment.ticker}?. Também será removido dos seus investimentos.`,
      showCancelButton: true,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sim`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (!!result.isConfirmed) {
        this._removeTransaction();
      }
    })
  }

  public edit(content: TemplateRef<any>){
    this.setDataToEdit();
    this.investmentTypeSelected = this.data.investment.categoryId;
    this.isEdit = true;
    this.open(content)
  }

  private setDataToEdit(){
    this.addAssetForm.setValue({
      ticker: this.data.investment.ticker,
      amount: this.data.investment.amount,
      buyingPrice: this.data.investment.buyingPrice,
      lastTransaction: this.data.investment.lastTransaction,
      walletId: this.data.investment.walletId,
      categoryId: this.data.investment.categoryId,
      brokerId: this.data.investment.brokerId,
    })
  }

  private _removeTransaction() {
    this._transactionHttpService.removeTransactionById(this.data.id)
      .subscribe({
        next: (res) => {
          this._actionBehaviorService.setIsDataChanged(true);
          this._toastService.success('Transação removida com sucesso.', 'Sucesso',{
            progressBar: true,
          });
        },
        error: (error) => {
          this._toastService.error(error.error.message, 'Erro',{
            progressBar: true,
          });
        }
      })
  }

  private _getInvestmentBroker() {
    this._investmentsBrokerHttpService.getInvestmentBroker()
      .subscribe({
        next: (res: any) => {
          let brokers = res.data[0];
          this.investmentBrokers = brokers;
        },
        error: (error) => {
          this._toastService.error(error.error.message, 'Erro',{
            progressBar: true,
          });
        }
      })
  }

  private _getInvestmentCategory() {
    this._investmentsCategoryHttpService.getInvestmentCategory()
      .subscribe({
        next: (res: any) => {
          let categories = res.data[0];
          this.investmentCategories = categories;
        },
        error: (error) => {
          this._toastService.error(error.error.message, 'Erro',{
            progressBar: true,
          });
        }
      })
  }

  public onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    this.investmentTypeSelected = +selectedValue as InvestmentCategoryEnum;

    this.addAssetForm.get('categoryId')?.setValue(+selectedValue);
  }

  public onBrokerChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    this.addAssetForm.get('brokerId')?.setValue(+selectedValue);
  }

  public onDateSelect(date: { year: number; month: number; day: number }): void {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const formattedDate = this.datePipe.transform(jsDate, 'dd/MM/yyyy');
    this.addAssetForm.setValue({
      birthDate: formattedDate,
    });

    this.addAssetForm.updateValueAndValidity();

  }

  open(content: TemplateRef<any>) {
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        if (this.isEdit) {
          this._editAsset();
          return;
        }
         this._postAsset();
      }
    );
  }
  private _editAsset() {
    const transaction = {
      ...this.addAssetForm.value,
      id: this.data.id,
      investmentId: this.data.investment.id
    }
    this._transactionHttpService.editTransaction(transaction)
      .subscribe({
        next: (res) => {
          this.addAssetForm.reset();
          this._actionBehaviorService.setIsDataChanged(true);
          this.investmentTypeSelected = null;
          this._toastService.success('Transação editada com sucesso.', 'Sucesso',{
            progressBar: true,
          });
        },
        error: (error) => {
          this._toastService.error(error.error.message, 'Erro',{
            progressBar: true,
          });
        }
      })
  }

  private _postAsset() {
    this._assetHttpService.postAsset(this.addAssetForm.value)
    .subscribe({
      next: (res) => {
        this.addAssetForm.reset();
        this._actionBehaviorService.setIsDataChanged(true);
        this.investmentTypeSelected = null;
        this._toastService.success('Ativo adicionado com sucesso.', 'Sucesso',{
          progressBar: true,
        });
      },
      error: (error) => {
        this._walletBehaviorService.setCreatedNewWallet(false);
        this._toastService.error(error.error.message, 'Erro',{
          progressBar: true,
        });
      }
    })
  }
}
