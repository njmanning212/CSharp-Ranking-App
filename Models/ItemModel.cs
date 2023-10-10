using Microsoft.AspNetCore.SignalR;
using Microsoft.Net.Http.Headers;

namespace RankingApp.Models;

public class ItemModel
{
  public int Id { get; set; }
  public string Title { get; set; }
  public int ImageID {get; set;}
  public int Ranking { get; set; }
  public int ItemType { get; set; }
  
}