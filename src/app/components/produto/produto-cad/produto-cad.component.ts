import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.services';
import { ActivatedRoute, Router } from '@angular/router';

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

  idProduto: number | null = null; // Para armazenar o ID do produto em edição

  constructor(
    private fb: FormBuilder, 
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute, // Para acessar parâmetros da rota
    
  ) { }

  ngOnInit(): void {
    this.nome.setValue(''); // Inicializar com string vazia
    this.descricao.setValue('');
    this.valor.setValue(0);  // Inicializar com 0, se necessário
    this.dispVenda.setValue(false); // Inicializar com false, para checkbox

    this.idProduto = Number(this.route.snapshot.paramMap.get('id')); // Obtém o ID da rota, se existir

    if (this.idProduto) {
      this.carregarProduto(); // Se for edição, carrega os dados do produto
    }
  }

  // Método para carregar os dados do produto para edição
  carregarProduto(): void {
    if (this.idProduto) {
      this.produtoService.buscarProdutoPorId(this.idProduto).subscribe(
        (produto) => {
          console.log('Produto carregado para edição:', produto);

          // Preenche os campos do formulário com os dados do produto
          this.nome.setValue(produto.nomeProduto);
          this.descricao.setValue(produto.descricaoProduto);
          this.valor.setValue(produto.valorProduto);
          this.dispVenda.setValue(produto.disponivelParaVenda);
        },
        (error) => {
          console.error('Erro ao carregar produto:', error);
        }
      );
    }
  }

  validaCampos(): boolean {
    console.log('Nome válido: ', this.nome.valid);
    console.log('Descrição válida: ', this.descricao.valid);
    console.log('Valor válido: ', this.valor.valid && this.valor.value > 1);
    console.log('Disponível para venda válido: ', this.dispVenda.valid);

    return (
      this.nome.valid &&
      this.descricao.valid &&
      this.valor.valid &&
      this.valor.value > 1 &&
      this.dispVenda.valid
    );
  }

  cadastrarProduto(): void {
    if (this.validaCampos()) {
        // Preencher o objeto produto com os dados do formulário
    this.produto.nomeProduto = this.nome.value;  // Atribuindo o valor correto
    this.produto.descricaoProduto = this.descricao.value;  // Atribuindo o valor correto
    this.produto.valorProduto = this.valor.value;  // Atribuindo o valor correto
    this.produto.disponivelParaVenda = this.dispVenda.value;  // Atribuindo o valor correto

    console.log('Produto antes de enviar:', this.produto);

    if (this.idProduto) {
      // Chamar o serviço para alterar o produto
      this.produtoService.alterarProduto(this.idProduto, this.produto).subscribe(
        (response) => {
          console.log('Produto alterado com sucesso!', response);
          this.router.navigate(['/']); // Retorna para a lista
        },
        (error) => {
          console.error('Erro ao alterar produto', error);
        }
      );
    } else {
      // Chamar o serviço para cadastrar o produto
      this.produtoService.cadastrarProduto(this.produto).subscribe(
        (response) => {
          console.log('Produto cadastrado com sucesso!', response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erro ao cadastrar produto', error);
        }
      );
    }
  }
}}