import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from 'src/app/models/produto';
import { Router } from '@angular/router'; // Importe o Router

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.css']
})
export class ProdutoListaComponent implements OnInit {


  PRODUTO_DATA: Produto[] = [
  { nomeProduto: 'Hydrogen', descricaoProduto: 'Hydrogen', valorProduto: 1.0079, disponivelParaVenda: true} ,
  { nomeProduto: 'Helium', descricaoProduto: 'Helium', valorProduto: 4.0026, disponivelParaVenda:false },
  { nomeProduto: 'Lithium', descricaoProduto: 'Lithium', valorProduto: 6.941, disponivelParaVenda: true },
  { nomeProduto: 'Beryllium', descricaoProduto: 'Beryllium', valorProduto: 9.0122, disponivelParaVenda: true },
  { nomeProduto: 'Boron', descricaoProduto:'Boron', valorProduto: 10.811, disponivelParaVenda: true },
  { nomeProduto: 'Carbon', descricaoProduto: 'Carbon', valorProduto: 12.0107, disponivelParaVenda: true },
  { nomeProduto: 'Nitrogen', descricaoProduto: 'Nitrogen', valorProduto: 14.0067, disponivelParaVenda: true },
  { nomeProduto: 'Oxygen', descricaoProduto:'Oxygen', valorProduto: 15.9994, disponivelParaVenda: false },
  { nomeProduto: 'Fluorine', descricaoProduto: 'Fluroine', valorProduto: 18.9984, disponivelParaVenda: true },
  ];
 

  displayedColumns: string[] = [ 'nome', 'descricao','valor',  'dispVenda'];
  dataSource = new MatTableDataSource<Produto>(this.PRODUTO_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private router: Router) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  navigateToCadastroProduto(): void {
    this.router.navigate(['/cadastroprod']); // Navega para a página de cadastro
  }


}