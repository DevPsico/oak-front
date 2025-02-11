import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.services';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.css']
})
export class ProdutoListaComponent implements OnInit, AfterViewInit {

  @ViewChild('inputBusca') inputBusca: any;  // Referência para o campo de busca
  displayedColumns: string[] = ['nome', 'descricao', 'valor', 'dispVenda', 'acoes'];
  dataSource = new MatTableDataSource<Produto>([]); // Inicializa com array vazio
  produtos: Produto[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private produtoService: ProdutoService, 
    private router: Router,
    public dialog: MatDialog,
  ) {}

    ngAfterViewInit(): void {
    // Foca no campo de busca após a renderização da view
    setTimeout(() => {
      if (this.inputBusca) {
        this.inputBusca.focus();
      }
    });
  }

  ngOnInit(): void {
    this.carregarProdutos();

      // Configura a lógica do filtro para considerar nome e descrição
  this.dataSource.filterPredicate = (produto: Produto, filtro: string) => {
    return produto.nomeProduto.toLowerCase().includes(filtro) ||
           produto.descricaoProduto.toLowerCase().includes(filtro);
  };
  }

  

  carregarProdutos(): void {
    this.produtoService.listarProdutos().subscribe(
      (produtos) => {
        console.log('Produtos recebidos:', produtos);
        
        this.produtos = produtos; // Armazena os produtos originais
        this.dataSource.data = produtos; // Atribui os produtos à dataSource para exibição
  
        // Atualiza o comprimento do paginador
        this.dataSource.paginator = this.paginator;
        this.paginator.pageSize = 5; // Garante que o paginador sempre comece com 5 itens
      },
      (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }


  aplicarBusca(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    this.dataSource.data = this.produtos.filter(produto =>
      produto.nomeProduto.toLowerCase().includes(filtro) ||
      produto.descricaoProduto.toLowerCase().includes(filtro)
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

  gerarPDF() {
    const doc = new jsPDF();
  
    // Título do PDF
    doc.text('Lista de Produtos', 10, 10);
  
    // Definição das colunas
    const colunas = ['Nome', 'Descrição', 'Valor', 'Disponível para Venda'];
  
    // Pegando os dados da tabela
    const linhas = this.dataSource.data.map(p => [
      p.nomeProduto,
      p.descricaoProduto,
      `R$ ${p.valorProduto.toFixed(2)}`, // Formata o valor como moeda
      p.disponivelParaVenda ? 'Sim' : 'Não'
    ]);
  
    // Criando a tabela no PDF
    autoTable(doc, {
      head: [colunas],
      body: linhas,
      startY: 20,
    });
  
    // Baixar o PDF
    doc.save('lista_produtos.pdf');
  }

  navigateToCadastroProduto(): void {
    this.router.navigate(['/cadastroprod']);
  }
}