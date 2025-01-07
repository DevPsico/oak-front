import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from 'src/app/models/produto';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.css']
})
export class ProdutoListaComponent implements OnInit {


  PRODUTO_DATA: Produto[] = [
    {nome: 'Hydrogen', valor: 1.0079},
  {  nome: 'Helium', valor: 4.0026},
  {  nome: 'Lithium', valor: 6.941},
  { nome: 'Beryllium', valor: 9.0122},
  { nome: 'Boron', valor: 10.811},
  {nome: 'Carbon', valor: 12.0107},
  {nome: 'Nitrogen', valor: 14.0067},
  { nome: 'Oxygen', valor: 15.9994},
  {nome: 'Fluorine', valor: 18.9984},
  ];
 

  displayedColumns: string[] = [ 'nome', 'valor'];
  dataSource = new MatTableDataSource<Produto>(this.PRODUTO_DATA);

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}