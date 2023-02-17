import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SuperProfileRoutingModule } from './super-profile-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';   
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouteConfigLoadEnd, RouteConfigLoadStart, RouterModule } from '@angular/router';
import { SuperProfileComponent } from './super-profile.component';



@NgModule({
    
  declarations: [SuperProfileComponent],
  imports: [
    CommonModule,
    SuperProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule, 
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatPaginatorModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ]
})
export class SuperProfileModule { }
