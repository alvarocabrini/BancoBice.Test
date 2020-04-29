using BancoBice.Test.Presentation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;

namespace BancoBice.Test.Presentation.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ElementsController : ControllerBase
  {
    private readonly ILogger<ElementsController> _logger;

    public ElementsController(ILogger<ElementsController> logger)
    {
      _logger = logger;
    }

    [HttpGet]
    [Route("last")]
    public IEnumerable<object> GetLast()
    {
      var httpResponseMessage = Utils.HttpRequest(
          Utils.UriCreate("http://www.indecon.online/last"),
          null,
          "application/json",
          HttpMethod.Get,
          string.Empty
      ).Result;

      var contentResponse = httpResponseMessage.Content.ReadAsStringAsync().Result;
      dynamic deserializeObject = JsonConvert.DeserializeObject(contentResponse);

      var numberOfRecords = ((JContainer)deserializeObject).Count;
      object[] objects = new object[numberOfRecords];
      var i = 0;

      foreach (var item in deserializeObject)
      {
        objects[i] = new
        {
          Name = item.First.key.Value,
          Description = item.First.name.Value,
          item.First.value.Value,
          Unit = item.First.unit.Value,
          DateTime = Utils.TimeStampStampToDateTime((int)item.First.date.Value)
        };

        i++;
      }

      return objects;
    }

    [HttpGet("{date}/{element}", Name = "Get")]
    public IEnumerable<object> Get(DateTime date, string element)
    {
      var httpResponseMessage = Utils.HttpRequest(
          Utils.UriCreate($"http://www.indecon.online/date/{element}/{date}"),
          null,
          "application/json",
          HttpMethod.Get,
          string.Empty
      ).Result;

      var contentResponse = httpResponseMessage.Content.ReadAsStringAsync().Result;
      dynamic deserializeObject = JsonConvert.DeserializeObject(contentResponse);

      object[] objects = new object[1];

      objects[0] = new
      {
        Name = deserializeObject.key.Value,
        Description = deserializeObject.name.Value,
        deserializeObject.value.Value,
        Unit = deserializeObject.unit.Value,
        DateTime = Utils.TimeStampStampToDateTime((int)deserializeObject.date.Value)
      };

      return objects;
    }

    [HttpGet]
    public IEnumerable<object> GetElements()
    {
      var httpResponseMessage = Utils.HttpRequest(
          Utils.UriCreate("http://www.indecon.online/last"),
          null,
          "application/json",
          HttpMethod.Get,
          string.Empty
      ).Result;

      var contentResponse = httpResponseMessage.Content.ReadAsStringAsync().Result;
      dynamic deserializeObject = JsonConvert.DeserializeObject(contentResponse);

      var numberOfRecords = ((JContainer)deserializeObject).Count;
      object[] objects = new object[numberOfRecords];
      var i = 0;

      foreach (var item in deserializeObject)
      {
        var itemName = item.Name;
        objects[i] = new
        {
          Key = item.Name,
          Value = char.ToUpper(itemName[0]) + itemName.Substring(1)
        };

        i++;
      }

      return objects;
    }

    [HttpGet("{element}")]
    public IEnumerable<object> GetHistorical(string element)
    {
      var httpResponseMessage = Utils.HttpRequest(
          Utils.UriCreate($"http://www.indecon.online/values/{element}"),
          null,
          "application/json",
          HttpMethod.Get,
          string.Empty
      ).Result;

      var contentResponse = httpResponseMessage.Content.ReadAsStringAsync().Result;
      dynamic deserializeObject = JsonConvert.DeserializeObject(contentResponse);
      var numberOfRecords = ((JContainer)deserializeObject["values"]).Count;

      object[] objectsValue = new object[numberOfRecords];
      var i = 0;

      var allDates = new List<DateValue>();

      foreach (var item in deserializeObject["values"])
      {
        var date = Utils.TimeStampStampToDateTime(int.Parse(item.Name));
        var value = item.Value.Value;

        allDates.Add(new DateValue
        {
          Date = date,
          Value = value
        });

        objectsValue[i] = new
        {
          Date = date,
          Value = value
        };

        i++;
      }

      var uniqueDate = allDates.Select(x => x.Date).GroupBy(x => new { x.Month, x.Year }).Select(x => x.Key).Distinct().ToList();

      var maxYear = uniqueDate.Max(x => x.Year);
      var maxMonth = uniqueDate.Where(x => x.Year == maxYear).Max(x => x.Month);
      var maxDate = uniqueDate.First(x => x.Year == maxYear && x.Month == maxMonth);

      for (i = maxDate.Month + 1; i <= 12; i++)
      {
        uniqueDate.Add(
          new { Month = i, Year = maxYear }
        );

        var lastTwelveMonth = allDates
          .Skip(allDates.Count - 12).ToList();

        var averageLastTwelveMonthValue = lastTwelveMonth
          .Select(x => x.Value)
          .Average();

        var thirdLastMonth = lastTwelveMonth[^3];
        var secondLastMonth = lastTwelveMonth[^2];
        var lastMonth = lastTwelveMonth.Last();

        var handleValue = thirdLastMonth.Value > secondLastMonth.Value
          ? secondLastMonth.Value > lastMonth.Value
            ? "down"
            : "equal"
          : secondLastMonth.Value > lastMonth.Value
            ? "equal"
            : "up"
          ;

        double proyectedValue = 0;

        var averangeLastThirdMonths = (thirdLastMonth.Value + secondLastMonth.Value + lastMonth.Value) / 3;
        var averangeDiference = (averageLastTwelveMonthValue - averangeLastThirdMonths);
        averangeDiference = averangeDiference < 0 ? (averangeDiference * -1) : averangeDiference;

        proyectedValue = handleValue switch
        {
          "down" => averageLastTwelveMonthValue - averangeDiference,
          "up" => averageLastTwelveMonthValue + averangeDiference,
          _ => averageLastTwelveMonthValue,
        };

        allDates.Add(new DateValue
        {
          Date = new DateTime(maxYear, i, 1),
          Value = proyectedValue
        });
      }

      object[] objectsUniqueDateWithAvergeValue = new object[uniqueDate.Count()];

      for (i = 0; i < uniqueDate.Count(); i++)
      {
        objectsUniqueDateWithAvergeValue[i] = new
        {
          uniqueDate[i].Year,
          uniqueDate[i].Month,
          AverageValue = allDates.Where(x =>
            x.Date.Month == uniqueDate[i].Month
            && x.Date.Year == uniqueDate[i].Year).Average(x => x.Value)
        };
      }

      object[] objectLastDate = new object[1];
      objectLastDate[0] = new
      {
        LastDate = maxDate
      };

      object[] objects = new object[3];
      objects[0] = objectsUniqueDateWithAvergeValue;
      objects[1] = objectLastDate;
      objects[2] = deserializeObject["unit"].Value;

      return objects;
    }
  }
}