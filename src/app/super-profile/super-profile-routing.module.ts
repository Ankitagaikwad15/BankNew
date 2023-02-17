import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperProfileComponent } from './super-profile.component';

const routes: Routes = [{ path: '', component: SuperProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperProfileRoutingModule { }
