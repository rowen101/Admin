using adminv2.ActionFilters;
using adminv2.Utils;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using adminv2.Utils;

namespace adminv2.Controllers
{
 
    public class AdminController : Controller
    {
        Procedure procedure = new Procedure();
        
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }

        [ActionName("wms-user-list")]
        public ActionResult WmsUserList()
        {
            return View();
        }


        [ActionName("user-list")]
        public ActionResult user()
        {
            ViewBag.typeHeadSource = new HtmlString(JsonConvert.SerializeObject(EmpName()));
            return View();

        }

        [ActionName("user-setup")]
        public ActionResult modifyUser()
        {
            return View();

        }

        public ActionResult pisobranch()
        {
            return View();
        }

        public ActionResult pismbranch()
        {
            return View();
        }

        public ActionResult itsekbranch()
        {
            return View();
        }

        public List<String> EmpName()
        {


            List<string> empName = new List<string>();

            HttpCookie cookie = Request.Cookies["_214"];

            if (Session["typeHead"] != null)
            {
                empName = (List<string>)Session["typeHead"];
                return empName;
            }
            else
            {

                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(procedure.GetUrlConfig(GlobalParams.configname.CoreApi) + "account/get-all-employee/?page=1&size=20000");
                request.Method = "GET";
                request.Headers["Token"] = "MTMwMzgzMDo4ODkyZDgyNS1jZTQyLTQ0OGEtOTNlOS04ZTI1MWI4YWU3ZDd0c2Fm";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream responseStream = response.GetResponseStream();
                JObject jResult = null;
                string jsonString = string.Empty;

                using (StreamReader reader = new StreamReader(responseStream))
                {
                    jsonString = reader.ReadToEnd();
                    reader.Close();
                }

                jResult = JObject.Parse(jsonString);
                string empAccount = jResult["empAccount"].ToString();
                foreach (var row in JRaw.Parse(empAccount))
                {

                    string empname = row["EmpName"].ToString().Replace("'", "");
                    empName.Add(row["EmpID"].ToString());
                    empName.Add(empname);
                    empName.Add(row["EmpEmail"].ToString());
                }

                Session["typeHead"] = empName;
            }
            return empName;
        }


        [ActionName("apps-list")]
        public ActionResult AppsList()
        {
            return View();
        }

        [ActionName("apps-setup")]
        public ActionResult AppsSetup()
        {
            return View();
        }

     
        public ActionResult menuList()
        {
            return View();
        }

        [ActionName("menu-setup")]
        public ActionResult menuSetup()
        {
            return View();
        }

        public ActionResult ServerList()
        {
            return View();

        }

        public ActionResult CoreMail()
        {
            return View();
        }

        public ActionResult CoreBranchMaintenance()
        {
            return View();
        }

        public ActionResult CoreDistrictMaintenance()
        {
            return View();
        }

        public ActionResult CoreCalendarMaintenance()
        {
            return View();
        }

        public ActionResult SystemUpdateMaintenance()
        {
            return View();
        }

        public ActionResult WMSServersMaintenance()
        {
            return View();
        }

        public ActionResult AquilaMaintenance()
        {
            return View();
        }

    }

   
}
