import { Component, OnInit } from '@angular/core';
import { TreeApiService } from '../tree-api.service';
import { Tree } from '../models/Tree';
import { forEach } from '@angular/router/src/utils/collection';
import { TreeNode } from '../models/TreeNode';
import { promise } from 'selenium-webdriver';
import { error } from 'util';
// import { Tree, Tree } from '@angular/router/src/utils/tree';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  treeContent: String;
  // AddTree
  newTreeName: String;
  // EditTreeName
  editTreeId: number;
  editSelectedTreeName: String;
  editTreeNewName: String;
  editlistOfAllTrees;
  // DeleteTree
  deletelistOfAllTrees;
  deleteSelectedTree: String;
  deleteTreeId: number;
  // AddNewNode
  addNodeListOfAllTrees;
  addNodeListOfAllNodesOfTree;
  addNodeAssignment: number;
  addNodeAncestor: number;
  addNodeSelectedTreeName: String;
  addNodeSelectedAncestorName: String;
  addNodeNewNodeName: String;

  constructor(private treeApiService: TreeApiService) { }

  ngOnInit() {
    this.loadTreesAndNodes();
    this.newTreeName = '';
    this.editTreeNewName = '';
    this.editTreeId = null;
    this.editSelectedTreeName = null;
    this.editlistOfAllTrees = null;
    this.addNodeNewNodeName = null;
    this.addNodeAssignment = null;
  }

  getAddNodeListListOfAllNodesOfTree() {

    this.treeApiService.getAllTreeNodes(this.addNodeSelectedTreeName).subscribe(nodesData => {

          let nodesOfTreeList;
          nodesOfTreeList = [];
          for (let i = 0; i < Object(nodesData).length; i++) {
            const treeNodeTemp = new TreeNode();
            treeNodeTemp.Id = nodesData[i].Id;
            treeNodeTemp.Label = nodesData[i].Label;
            treeNodeTemp.Ancestor = nodesData[i].Ancestor;
            nodesOfTreeList.push(treeNodeTemp);

            this.addNodeListOfAllNodesOfTree = nodesOfTreeList;

          }
        });
  }

  addNewNode() {

    if (this.addNodeAncestor === undefined) {
      this.addNodeAncestor = null;
    }

    this.treeApiService.addNewNode(this.addNodeNewNodeName, this.addNodeAncestor, this.addNodeAssignment).subscribe(data => {
      if (data === true) {
        document.getElementById('addNewNodeModalCloser').click();
        document.getElementById('succesModalOpener').click();
        this.loadTreesAndNodes();
      } else {
        document.getElementById('addNewNodeModalCloser').click();
        document.getElementById('errorModalOpener').click();
      }
    }, err => {
      document.getElementById('addNewNodeModalCloser').click();
      document.getElementById('errorModalOpener').click();
    });

  }

  getAddNodeListOfAllTrees() {
    this.addNodeSelectedTreeName = null;
    this.addNodeSelectedAncestorName = null;
    this.treeApiService.getAllTrees().subscribe(data => {
      let treesList;
      treesList = [];

      for (let i = 0; i < Object(data).length; i++) {
        const treeTemp = new Tree();
        treeTemp.id = data[i].Id;
        treeTemp.Name = data[i].Name;
        treesList.push(treeTemp);
      }

      this.addNodeListOfAllTrees = treesList;

    }, err => {
    });
  }

  setAddNewNodeAncestorTreeAndSelectedNodeName(nodeId: number, nodeName: String) {
    this.addNodeSelectedAncestorName = nodeName;
    this.addNodeAncestor = nodeId;
  }

  setAddNewNodeAssignmentTreeAndSelectedTreeName(treeId: number, treeName: String) {
    this.addNodeSelectedTreeName = treeName;
    this.addNodeAssignment = treeId;

    this.getAddNodeListListOfAllNodesOfTree();

  }

  deleteGetListOfAllTrees() {
    this.deleteSelectedTree = null;
    this.deleteTreeId = null;
    this.treeApiService.getAllTrees().subscribe(data => {
      let treesList;
      treesList = [];

      for (let i = 0; i < Object(data).length; i++) {
        const treeTemp = new Tree();
        treeTemp.id = data[i].Id;
        treeTemp.Name = data[i].Name;
        treesList.push(treeTemp);
      }

      this.deletelistOfAllTrees = treesList;

    }, err => {
    });
  }

  setDeleteTreeIdAndSelectedTreeName(treeId: number, treeName: String) {
    this.deleteTreeId = treeId;
    this.deleteSelectedTree = treeName;
  }

  deleteTree() {
    this.treeApiService.deleteTree(this.deleteTreeId).subscribe(data => {
      if (data === true) {
        document.getElementById('deleteTreeModalCloser').click();
        document.getElementById('succesModalOpener').click();
        this.loadTreesAndNodes();
      } else {
        document.getElementById('deleteTreeModalCloser').click();
        document.getElementById('errorModalOpener').click();
      }
    }, err => {
      document.getElementById('deleteTreeModalCloser').click();
      document.getElementById('errorModalOpener').click();
    });

  }

  editGetListOfAllTrees() {
    this.editTreeId = null;
    this.editSelectedTreeName = null;
    this.editTreeNewName = null;
    this.treeApiService.getAllTrees().subscribe(data => {
      let treesList;
      treesList = [];

      for (let i = 0; i < Object(data).length; i++) {
        const treeTemp = new Tree();
        treeTemp.id = data[i].Id;
        treeTemp.Name = data[i].Name;
        treesList.push(treeTemp);
      }

      this.editlistOfAllTrees = treesList;

    }, err => {
    });
  }

  setEditTreeNameIdAndSelectedTreeName(treeId: number, treeName: String) {
    this.editTreeId = treeId;
    this.editSelectedTreeName = treeName;
  }

  editTreeName() {
    this.treeApiService.editTreeName(this.editTreeId, this.editTreeNewName).subscribe(data => {
      if (data === true) {
        document.getElementById('editTreeNameModalCloser').click();
        document.getElementById('succesModalOpener').click();
        this.loadTreesAndNodes();
      } else {
        document.getElementById('editTreeNameModalCloser').click();
        document.getElementById('errorModalOpener').click();
      }
    }, err => {
      document.getElementById('editTreeNameModalCloser').click();
      document.getElementById('errorModalOpener').click();
    });
  }

  addNewTree() {
     this.treeApiService.addNewTree(this.newTreeName).subscribe(data => {
       if (data === true) {
        document.getElementById('addTreeModalCloser').click();
        document.getElementById('succesModalOpener').click();
        this.loadTreesAndNodes();
       } else {
        document.getElementById('addTreeModalCloser').click();
        document.getElementById('errorModalOpener').click();
       }

     }, err => {
        document.getElementById('addTreeModalCloser').click();
        document.getElementById('errorModalOpener').click();
     });
  }

  loadTreesAndNodes() {

    document.getElementById('tree').innerHTML = '';

    this.treeApiService.getAllTrees().subscribe(data => {

      let treesList;
      treesList = [];

      for (let i = 0; i < Object(data).length; i++) {
        const treeTemp = new Tree();
        treeTemp.id = data[i].Id;
        treeTemp.Name = data[i].Name;
        treesList.push(treeTemp);
      }

       for (const treeData of treesList) {

        const paddingValue = 0;

        this.treeApiService.getAllTreeNodes(treeData.Name).subscribe(nodesData => {

            const headerDiv = document.createElement('div');

            headerDiv.innerHTML = '<h2 style="text-align:center;" id="' + treeData.Name + '">' + treeData.Name + '</h2>';

            document.getElementById('tree').appendChild(headerDiv);

          let nodesOfTreeList;
          nodesOfTreeList = [];
          for (let i = 0; i < Object(nodesData).length; i++) {
            const treeNodeTemp = new TreeNode();
            treeNodeTemp.Id = nodesData[i].Id;
            treeNodeTemp.Label = nodesData[i].Label;
            treeNodeTemp.Ancestor = nodesData[i].Ancestor;
            nodesOfTreeList.push(treeNodeTemp);
          }

          for (const htmlData of nodesOfTreeList) {
            if (htmlData.Ancestor === null) {

              if (htmlData.Label === null) {

              } else {


                  const rootDiv = document.createElement('div');
                  rootDiv.id = 'hideDiv' + htmlData.Id;

                  rootDiv.innerHTML = '<div style="text-align:left;padding-top:50px" class="col-md-12" id="' +
                   htmlData.Id +
                   '"><i onclick="nodeToggle(this)" id="arrow' + htmlData.Id +
                   '"  class="icono-arrow1-left"></i><button class="btn" type="text">'
                   + htmlData.Label +
                   '</button></div>';

                  document.getElementById(treeData.Name).appendChild(rootDiv);

              }

            } else {

              if (htmlData.Id === null) {

              } else {

                const nodeDiv = document.createElement('div');
                nodeDiv.id = 'hideDiv' + htmlData.Id;
                nodeDiv.style.display = 'none';

                nodeDiv.innerHTML = '<div style="padding-left:50px;" id="' + htmlData.Id +
                '" class="col-md-12"><i onclick="nodeToggle(this)" class="icono-arrow1-left"></i><button class="btn" type="text">'
                + htmlData.Label + '</button></div>';

                document.getElementById(htmlData.Ancestor).appendChild(nodeDiv);

              }

            }
          }

        });
      }

    }, err => {

    });

  }



}
