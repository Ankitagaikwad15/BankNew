import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionMoneyComponent } from './transaction-money.component';

const routes: Routes = [{ path: '', component: TransactionMoneyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionMoneyRoutingModule { }
