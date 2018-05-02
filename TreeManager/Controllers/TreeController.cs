using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Mvc;
using TreeManager.Models;
using TreeManager.Services;

namespace TreeManager.Controllers
{
    [System.Web.Http.RoutePrefix("api/tree")]
    public class TreeController : ApiController
    {
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("")]
        public System.Web.Http.Results.JsonResult<List<TreeNode>> PostTreeNodes([FromUri]string treeName)
        {
            TreeHandler treeService = new TreeHandler();
            List<TreeNode> treeNodes = treeService.GetAllNodesOfTree(treeName);

            return Json(treeNodes);
        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("")]
        public System.Web.Http.Results.JsonResult<List<Tree>> GetAllTrees()
        {
            TreeHandler treeService = new TreeHandler();
            List<Tree> trees = treeService.GetAllTrees();

            return Json(trees);
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("addNewTree")]
        public bool PostAddNewTree(String treeName)
        {
            if(treeName == "" || treeName == null)
            {
                return false;
            } else
            {
                TreeHandler treeService = new TreeHandler();
                bool response = treeService.AddNewTree(treeName);
                return response;
            }
            
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("editTreeName")]
        public bool PostEditTreeName(Int32 treeId, String newTreeName)
        {
            if (newTreeName == "" || newTreeName == "null")
            {
                return false;
            }
            else
            {
                TreeHandler treeService = new TreeHandler();
                bool response = treeService.EditTreeName(treeId, newTreeName);
                return response;
            }
            
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("deleteTree")]
        public bool PostDeleteTree(Int32 treeId)
        {
            TreeHandler treeService = new TreeHandler();
            bool response = treeService.DeleteTree(treeId);
            return response;
        }


        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("addNewNode")]
        public bool PostAddNewNode(String label, Int32? ancestor, Int32 assignment)
        {
            if(label == "" || label == null)
            {
                return false;
            }
            else
            {
                TreeHandler treeService = new TreeHandler();
                bool response = treeService.AddNewNode(label, ancestor, assignment);
                return response;
            }
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("editNodeLabel")]
        public bool PostEditNodeLabel(Int32 nodeId, String newLabel)
        {
            TreeHandler treeService = new TreeHandler();
            bool response = treeService.EditNodeLabel(nodeId, newLabel);
            return response;
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("deleteNode")]
        public bool PostDeleteNode(Int32 nodeId)
        {
            TreeHandler treeService = new TreeHandler();
            bool response = treeService.DeleteNode(nodeId);
            return response;
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("moveNode")]
        public bool PostMoveNode(Int32 nodeId, Int32 newAncestor)
        {
            TreeHandler treeService = new TreeHandler();
            bool response = treeService.MoveNode(nodeId, newAncestor);
            return response;
        }
    }
}
