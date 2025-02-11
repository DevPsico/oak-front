import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { ProdutoListaComponent } from './components/produto/produto-lista/produto-lista.component'
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProdutoCadComponent } from './components/produto/produto-cad/produto-cad.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';

import localePt from '@angular/common/locales/pt'; 
import { registerLocaleData } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';



registerLocaleData(localePt);  // Registrando a localidade pt-BR

@NgModule({
  declarations: [
    AppComponent, 
    ProdutoListaComponent, ProdutoCadComponent, ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule, 

 
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }, // Define o locale para pt-BR
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  entryComponents: [ConfirmDialogComponent] ,
  bootstrap: [AppComponent]
})
export class AppModule { }