using BancoBice.Test.Crosscuting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Net;
using System.Net.Http;
using Xunit;

namespace BancoBice.XUnit
{
  public class TestUri
  {
    [Fact]
    public void UrisStatusOk()
    {
      var httpResponseMessageLast = Utils.HttpRequest(
         Utils.UriCreate("http://www.indecon.online/last"),
         null,
         "application/json",
         HttpMethod.Get,
         string.Empty
     ).Result;

      var contentResponseLast = httpResponseMessageLast.Content.ReadAsStringAsync().Result;
      dynamic deserializeObject = JsonConvert.DeserializeObject(contentResponseLast);

      var firstElement = ((JContainer)deserializeObject).First.Path;
      var date = DateTime.Now.ToString("dd-MM-yyyy");

      var httpResponseMessageDate = Utils.HttpRequest(
          Utils.UriCreate($"http://www.indecon.online/date/{firstElement}/{date}"),
          null,
          "application/json",
          HttpMethod.Get,
          string.Empty
      ).Result;

      var httpResponseMessageHistorical = Utils.HttpRequest(
          Utils.UriCreate($"http://www.indecon.online/values/{firstElement}"),
          null,
          "application/json",
          HttpMethod.Get,
          string.Empty
      ).Result;

      Assert.Equal(HttpStatusCode.OK, httpResponseMessageLast.StatusCode);
      Assert.Equal(HttpStatusCode.OK, httpResponseMessageDate.StatusCode);
      Assert.Equal(HttpStatusCode.OK, httpResponseMessageHistorical.StatusCode);
    }
  }
}
