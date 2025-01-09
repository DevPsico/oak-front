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
registerLocaleData(localePt);  // Registrando a localidade pt-BR

@NgModule({
  declarations: [
    AppComponent, 
    ProdutoListaComponent, ProdutoCadComponent
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
    MatInputModule
 
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' } // Define o locale para pt-BR
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }