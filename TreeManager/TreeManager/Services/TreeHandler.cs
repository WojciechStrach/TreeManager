using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TreeManager.Models;
using MySql.Data.MySqlClient;
using System.Diagnostics;

namespace TreeManager.Services
{
    public class TreeHandler
    {
        MysqlDatabaseHandler database;

        public TreeHandler()
        {
            database = new MysqlDatabaseHandler();
        }

        public List<TreeNode> GetAllNodesOfTree(String treeName)
        {
            List<TreeNode> completeTree = new List<TreeNode>();
            int treeID = new int();


            MySqlDataReader treeData = database.Select("SELECT ID FROM `treeList` WHERE TreeName = " + "'" + treeName + "'");
            
            while (treeData.Read())
            {
                treeID = Convert.ToInt32((treeData["ID"]));
            }

            treeData.Close();

            TreeNode root = new TreeNode();

            MySqlDataReader treeRoot = database.Select("SELECT * FROM `nodelist` WHERE ASSIGNMENT = " + "'" + treeID + "'" + " AND ANCESTOR IS NULL");


            while (treeRoot.Read())
            {
                root.Id = Convert.ToInt32((treeRoot["ID"]));
                root.Label = Convert.ToString((treeRoot["LABEL"]));
            }

            treeRoot.Close();

            MySqlDataReader treeRootChildrens = database.Select("SELECT * FROM `nodelist` WHERE ANCESTOR = " + "'" + root.Id + "'");

            Dictionary<Int32, String> rootChildrensTemp = new Dictionary<int, string>();

            while (treeRootChildrens.Read())
            {
                rootChildrensTemp.Add(Convert.ToInt32((treeRootChildrens["ID"])), Convert.ToString((treeRootChildrens["LABEL"])));
            }

            treeRootChildrens.Close();

            root.Children = rootChildrensTemp;

            void treeCompleter(TreeNode treeNode)
            {
                foreach(var node in treeNode.Children)
                {
                    TreeNode nodeTemp = new TreeNode();

                    nodeTemp.Id = node.Key;
                    nodeTemp.Label = node.Value;

                    MySqlDataReader nodeChildrens = database.Select("SELECT * FROM `nodelist` WHERE ANCESTOR = " + "'" + nodeTemp.Id + "'");

                    Dictionary<Int32, String> childrensTemp = new Dictionary<int, string>();

                    while (nodeChildrens.Read())
                    {
                        childrensTemp.Add(Convert.ToInt32((nodeChildrens["ID"])), Convert.ToString((nodeChildrens["LABEL"])));
                    }

                    nodeChildrens.Close();

                    nodeTemp.Children = childrensTemp;

                    completeTree.Add(nodeTemp);

                    treeCompleter(nodeTemp);

                }
            }

            treeCompleter(root);

            return completeTree;
        }
    }
}