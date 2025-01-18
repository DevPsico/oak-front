import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.services';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.css']
})
export class ProdutoListaComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'descricao', 'valor', 'dispVenda', 'acoes'];
  dataSource = new MatTableDataSource<Produto>([]); // Inicializa com array vazio

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private produtoService: ProdutoService, 
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.listarProdutos().subscribe(
      (produtos) => {
        console.log('Produtos recebidos:', produtos);
  
        // Ordena os produtos pelo valor do menor para o maior
        this.dataSource.data = produtos.sort((a, b) => a.valorProduto - b.valorProduto);
        
        // Atualiza o paginador
        this.dataSource.paginator = this.paginator;
  
        // Reseta o índice da página para 0 para que o paginador volte à primeira página
        this.paginator.pageIndex = 0;
      },
      (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }
  

  alterarProduto(produto: any): void {
    console.log('Editar produto:', produto);
  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Tem certeza que deseja editar o produto "${produto.nomeProduto}"?`,
        action: 'editar'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Se o usuário confirmar, redireciona para a tela de edição
        this.router.navigate(['/cadastroprod', produto.id]);
      } else {
        console.log('Edição cancelada');
      }
    });
  }
  
  deletarProduto(id: number): void {
    const produto = this.dataSource.data.find(p => p.id === id); // Encontre o produto com base no id
  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Tem certeza que deseja excluir o produto "${produto?.nomeProduto}"?`,  // Passa o nome do produto
        action: 'deletar'  // Ação de exclusão
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.produtoService.deletarProduto(id).subscribe(
          () => {
            console.log(`Produto com ID ${id} excluído com sucesso`);
            this.carregarProdutos(); // Recarrega a lista de produtos
          },
          (error) => {
            console.error('Erro ao excluir produto:', error);
          }
        );
      } else {
        console.log('Exclusão cancelada');
      }
    });
  }

  navigateToCadastroProduto(): void {
    this.router.navigate(['/cadastroprod']);
  }
}