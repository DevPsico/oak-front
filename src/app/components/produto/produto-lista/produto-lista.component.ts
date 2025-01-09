import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.css']
})
export class ProdutoListaComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'descricao', 'valor', 'dispVenda'];
  dataSource = new MatTableDataSource<Produto>([]); // Inicializa com array vazio

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.listarProdutos().subscribe(
      (produtos) => {
        console.log('Produtos recebidos:', produtos); // Verifique se os produtos estão sendo recebidos
       
             // Ordena os produtos pelo valor do menor para o maior
      this.dataSource.data = produtos.sort((a, b) => a.valorProduto - b.valorProduto);
        this.dataSource.paginator = this.paginator; // Configura o paginador
      },
      (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  navigateToCadastroProduto(): void {
    this.router.navigate(['/cadastroprod']);
  }
}