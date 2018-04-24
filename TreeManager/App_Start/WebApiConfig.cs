using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace TreeManager
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //CORS
            var enableCorsAttribute = new EnableCorsAttribute("*",
                                               "Origin, Content-Type, Accept",
                                               "GET, PUT, POST, DELETE, OPTIONS");
            config.EnableCors(enableCorsAttribute);
            // Konfiguracja i usługi składnika Web API
            config.Formatters.JsonFormatter.SupportedMediaTypes
                .Add(new MediaTypeHeaderValue("text/html"));

            // Trasy składnika Web API
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
