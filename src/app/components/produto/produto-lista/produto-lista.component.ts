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
  { nome: 'Hydrogen', descricao: 'Hydrogen', valor: 1.0079, dispVenda: true} ,
  { nome: 'Helium', descricao: 'Helium', valor: 4.0026, dispVenda:false },
  { nome: 'Lithium', descricao: 'Lithium', valor: 6.941, dispVenda: true },
  { nome: 'Beryllium', descricao: 'Beryllium', valor: 9.0122, dispVenda: true },
  { nome: 'Boron', descricao:'Boron', valor: 10.811, dispVenda: true },
  { nome: 'Carbon', descricao: 'Carbon', valor: 12.0107, dispVenda: true },
  { nome: 'Nitrogen', descricao: 'Nitrogen', valor: 14.0067, dispVenda: true },
  { nome: 'Oxygen', descricao:'Oxygen', valor: 15.9994, dispVenda: false },
  { nome: 'Fluorine', descricao: 'Fluroine', valor: 18.9984, dispVenda: true },
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