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
    public class TreeController : ApiController
    {
        public System.Web.Http.Results.JsonResult<List<TreeNode>> GetTreeNodes()
        {
            TreeHandler treeService = new TreeHandler();
            List<TreeNode> treeNodes = treeService.GetAllNodesOfTree("Samochody");

            return Json(treeNodes);
        }
    }
}
