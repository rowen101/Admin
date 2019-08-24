using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json.Linq;
using adminv2.Utils;
using Newtonsoft.Json;
using adminv2.Models;
using System.Net;
using System.IO;
using adminv2.ActionFilters;
using static adminv2.Utils.GlobalParams;

namespace adminv2.Controllers
{
   
    public class AccountController : Controller
    {
        Procedure procedure = new Procedure();

        // GET: Account
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
          

            return View();
        }

        public ActionResult TestLogin()
        {
            return View();
        }

        public JsonResult setCookie(string userid, string email, string fullname, string fname, string userHascode, string empId, string token)
        {
            try
            {
                HttpCookie cookie = new HttpCookie("_214");
                cookie["userHascode"] = userHascode;
                cookie["userid"] = userid;
                cookie["fname"] = fname;
                cookie["empId"] = empId;
                cookie["email"] = email;
                cookie["fullname"] = fullname;
                cookie["sitecode"] = string.Empty;//set empty value
                cookie["sissionId"] = procedure.GenerateSissionCode();
                cookie["token"] = token;
                Response.Cookies.Add(cookie);

                return Json(new { hasError = false }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { hasError = true, errorMessage = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }

        public ActionResult Connect(string id, string token)
        {


            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(procedure.GetUrlConfig(configname.CoreApi) + "account/FastloginHascode/?hascode=" + id + "&appname=PaloUp");
            request.Method = "GET";
            request.Headers["Token"] = token;
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
            string userid = jResult["userId"].ToString();
            string emplId = jResult["emplId"].ToString();
            string username = jResult["username"].ToString();
            string fullname = jResult["firstname"].ToString() + ' ' + jResult["lastname"].ToString();
            string fname = jResult["firstname"].ToString();

            setCookie(userid, username, fullname, fname, id, emplId, token);

            return RedirectToAction("Index", "Apps", new { id = id });
        }


        public ActionResult Logout()
        {
            Session.RemoveAll();
            HttpCookie cookie = new HttpCookie("_214");
            cookie.Expires = DateTime.Now.AddDays(-1);
            Response.Cookies.Add(cookie);

            return RedirectToAction("Login");
        }
    }
}