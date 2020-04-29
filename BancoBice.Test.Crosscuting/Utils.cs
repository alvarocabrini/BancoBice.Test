#define UtilHttp

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace BancoBice.Test.Crosscuting
{
  public static class Utils
  {
    public static DateTime TimeStampStampToDateTime(int timeStamp) => new DateTime(1970, 1, 1, 0, 0, 0, 0).AddSeconds(timeStamp).ToUniversalTime();

    public static Uri UriCreate(string baseUrl, string relativeUrl) => new Uri(baseUrl + relativeUrl);

    public static Uri UriCreate(string uri) => new Uri(uri);

    public static async Task<HttpResponseMessage> HttpRequest(
        Uri uri,
        IEnumerable<HttpRequestHeader> httpRequestHeaders,
        string mediaType,
        HttpMethod httpMethod,
        string requestContent
    )
    {
#if DEBUG && UtilHttp
      var httpClientHandler = new HttpClientHandler
      {
        ServerCertificateCustomValidationCallback = (F, U, C, K) => { return true; }
      };

      var httpClient = new HttpClient(httpClientHandler)
      {
        Timeout = TimeSpan.FromMinutes(60)
      };
#else
      var httpClient = new HttpClient
      {
        Timeout = TimeSpan.FromMinutes(60)
      };
#endif

      httpClient.DefaultRequestHeaders.Clear();
      httpClient.DefaultRequestHeaders.Accept.Clear();
      httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(mediaType));

      foreach (var item in httpRequestHeaders ?? Enumerable.Empty<HttpRequestHeader>())
      {
        httpClient.DefaultRequestHeaders.Add(item.Name, item.Value);
      }

      var request = new HttpRequestMessage(httpMethod, uri)
      {
        Content = new StringContent(requestContent, Encoding.UTF8, mediaType)
      };

      return await httpClient.SendAsync(request);
    }
  }
}
