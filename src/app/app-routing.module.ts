import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoListaComponent } from './components/produto/produto-lista/produto-lista.component';
import { ProdutoCadComponent } from './components/produto/produto-cad/produto-cad.component';

const routes: Routes = [{
  
    path: '', component: ProdutoListaComponent
  },
  
  {
    path: 'cadastroprod', component: ProdutoCadComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
