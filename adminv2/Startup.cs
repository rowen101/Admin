using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(adminv2.Startup))]
namespace adminv2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
