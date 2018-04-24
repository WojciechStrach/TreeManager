using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TreeManager.Models
{
    public class TreeNode
    {
        public Int32 Id { get; set; }  
        public String Label { get; set; }
        public dynamic Ancestor { get; set; }
        public Dictionary<Int32,String> Children { get; set; }
    }
}