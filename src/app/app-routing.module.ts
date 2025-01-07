import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoListaComponent } from './components/produto/produto-lista/produto-lista.component';

const routes: Routes = [{
  path: '', component: ProdutoListaComponent, children: [
    {
      path: 'produtolista', component: ProdutoListaComponent 
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
