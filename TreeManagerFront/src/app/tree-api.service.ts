import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TreeApiService {

  constructor(private http: HttpClient) { }

  //

  getAllTrees() {
    return this.http.get('http://localhost:62260/api/Tree', httpOptions);
  }

  getAllTreeNodes(treeName: String) {
    return this.http.post('http://localhost:62260/api/Tree?treeName=' + treeName, httpOptions);
  }

}
