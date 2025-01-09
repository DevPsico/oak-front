import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://localhost:8080/produto'; // URL do seu backend

  constructor(private http: HttpClient) { }

  cadastrarProduto(produto: Produto): Observable<Produto> { 
    return this.http.post<Produto>(this.apiUrl, produto); // Usando POST para cadastrar
  }
}
