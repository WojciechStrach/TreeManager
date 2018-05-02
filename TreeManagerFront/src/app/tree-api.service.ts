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
    return this.http.get('http://localhost:62260/api/tree', httpOptions);
  }

  getAllTreeNodes(treeName: String) {
    return this.http.post('http://localhost:62260/api/tree?treeName=' + treeName, httpOptions);
  }

  addNewTree(treeName: String) {
    return this.http.post('http://localhost:62260/api/tree/addNewTree?treeName=' + treeName, httpOptions);
  }

  editTreeName(treeId: number, newTreeName: String) {
    return this.http.post('http://localhost:62260/api/tree/editTreeName?treeId=' + treeId + '&newTreeName=' + newTreeName , httpOptions);
  }

  deleteTree(treeId: number) {
    return this.http.post('http://localhost:62260/api/tree/deleteTree?treeId=' + treeId, httpOptions);
  }

  addNewNode(label: String, ancestor: number, assignment: number) {
      return this.http.post
    ('http://localhost:62260/api/tree/addNewNode?label=' + label + '&ancestor=' + ancestor + '&assignment=' + assignment, httpOptions);
  }

}
