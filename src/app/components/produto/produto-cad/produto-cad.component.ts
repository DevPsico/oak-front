import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-cad',
  templateUrl: './produto-cad.component.html',
  styleUrls: ['./produto-cad.component.css']
})
export class ProdutoCadComponent implements OnInit {

  produto: Produto = {
    nomeProduto: '',
    descricaoProduto: '',
    valorProduto: 0,
    disponivelParaVenda: false
  };

  nome = new FormControl(null, Validators.minLength(5));
  descricao = new FormControl(null, Validators.minLength(5));
  valor = new FormControl(null, Validators.required);
  dispVenda = new FormControl(null, Validators.required);

  constructor(
    private fb: FormBuilder, 
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nome.setValue(''); // Inicializar com string vazia
    this.descricao.setValue('');
    this.valor.setValue(0);  // Inicializar com 0, se necessário
    this.dispVenda.setValue(false); // Inicializar com false, para checkbox
  }

  validaCampos(): boolean {
    console.log('Nome válido: ', this.nome.valid);
    console.log('Descrição válida: ', this.descricao.valid);
    console.log('Valor válido: ', this.valor.valid);
    console.log('Disponível para venda válido: ', this.dispVenda.valid);

    return this.nome.valid && this.descricao.valid && this.valor.valid && this.dispVenda.valid;
  }

  cadastrarProduto(): void {
    if (this.validaCampos()) {
        // Preencher o objeto produto com os dados do formulário
    this.produto.nomeProduto = this.nome.value;  // Atribuindo o valor correto
    this.produto.descricaoProduto = this.descricao.value;  // Atribuindo o valor correto
    this.produto.valorProduto = this.valor.value;  // Atribuindo o valor correto
    this.produto.disponivelParaVenda = this.dispVenda.value;  // Atribuindo o valor correto

    console.log('Produto antes de enviar:', this.produto);

    

      // Chamar o serviço para cadastrar o produto no backend
      this.produtoService.cadastrarProduto(this.produto).subscribe(
        (response) => {
          console.log('Produto cadastrado com sucesso!', response);

          
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erro ao cadastrar produto', error);
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }
}
