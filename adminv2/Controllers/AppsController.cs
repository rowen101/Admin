using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using adminv2.Utils;
using adminv2.Models;
using System.Net;
using System.IO;
using adminv2.ActionFilters;

namespace adminv2.Controllers
{

    public class AppsController : Controller
    {
        Procedure procedure = new Procedure();

        // GET: Apps
        public ActionResult Index(string id)
        {
            string strId = string.Empty;
            string sessionId = string.Empty;

            HttpCookie cookie2 = Request.Cookies["_214"];
            List<MenuModel> menuModel = new List<MenuModel>();

            try
            {
                if (string.IsNullOrEmpty(id))
                    return RedirectToAction("Login", "Account");

                if (cookie2 != null)
                {


                    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(procedure.GetUrlConfig(GlobalParams.configname.CoreApi) + "account/get-app-menu-v2/?sysid=1&userid=" + cookie2["userid"].ToString());
                    request.Method = "GET";
                    request.Headers["Token"] = cookie2["token"].ToString();
                    HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                    Stream responseStream = response.GetResponseStream();
                    JObject jResult = null;
                    string jsonString = string.Empty;

                    using (StreamReader reader = new StreamReader(responseStream))
                    {
                        jsonString = reader.ReadToEnd();
                        reader.Close();
                    }

                    foreach (var row in JRaw.Parse(jsonString))
                    {
                        string jChildMenu = row["pages"].ToString();
                        List<MenuModel> childMenu = new List<MenuModel>();

                        foreach (var row2 in JRaw.Parse(jChildMenu))
                        {
                            childMenu.Add(new MenuModel
                            {
                                icon = row2["icon"].ToString(),
                                name = row2["name"].ToString(),
                                stage = row2["stage"].ToString(),
                                type = row2["type"].ToString()
                            });
                        }

                        menuModel.Add(new MenuModel
                        {
                            icon = row["icon"].ToString(),
                            name = row["name"].ToString(),
                            stage = row["stage"].ToString(),
                            type = row["type"].ToString(),
                            pages = childMenu
                        });

                    }

                    return View(menuModel);
                }
                else
                {
                    return RedirectToAction("Login", "Account");
                }

            }
            catch (Exception ex)
            {
                return RedirectToAction("SignOut");
            }

        }
           

        public ActionResult SignOut()
        {

            //clean user data
            HttpCookie cookie = Request.Cookies["_214"];
            cookie.Expires = DateTime.Now.AddYears(-1);
            Response.Cookies.Add(cookie);

            //clean menu data
            HttpCookie cookie2 = new HttpCookie("_105");
            cookie2.Expires = DateTime.Now.AddYears(-1);
            Response.Cookies.Add(cookie2);

            return RedirectToAction("Login", "Account");
        }
    }
}