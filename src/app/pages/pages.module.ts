import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { ChildrensComponent } from './childrens/childrens.component';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule} from '@angular/material/table';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';

import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [ChildrensComponent, PagesComponent],
  imports: [  
    CommonModule,
    BrowserAnimationsModule,  
    FormsModule,
    ReactiveFormsModule,
    RouterModule,   
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
  ],
  exports:[ChildrensComponent,PagesComponent],  
})
export class PagesModule { }
