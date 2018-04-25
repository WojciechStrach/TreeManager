import { Component, OnInit } from '@angular/core';
import { TreeApiService } from '../tree-api.service';
import { Tree } from '../models/Tree';
import { forEach } from '@angular/router/src/utils/collection';
import { TreeNode } from '../models/TreeNode';
// import { Tree, Tree } from '@angular/router/src/utils/tree';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  treeContent: String;

  constructor(private treeApiService: TreeApiService) { }

  ngOnInit() {
    this.loadTreesAndNodes();
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
