// https://observablehq.com/@harmanwho/could-ea-sports-fifa-player-ratings-be-a-real-life-predictor@222
import define1 from "./e76d2c695f356743@677.js";
import define2 from "./dd702465a2499b9a@167.js";
import define3 from "./86ddbc29bd33f9d6@353.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["fifa21topplayers.json",new URL("./files/376b74e1ed2a9fa8554604d82a266b1b95351f979dc87e83702be6fbf9964bb598add5e7ad09987b3f6afcb2948921c86c7bddca83395996ce9f3b389b444324",import.meta.url)],["Screen Shot 2021-02-18 at 11.27.51 PM.png",new URL("./files/7aa4ec05654b00aa6922cccaf0f634e6bb9b6b315f33072ff157c71454b33f73f453e6a950e7d36c9f3244bb621d7a7a649e9efce4355c2408efdb1c55d5ed92",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Could EA Sports Fifa player ratings be a real-life predictor of football club performances?`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Created by [Harman Sidhu](http://github.com/harmanwho)`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Introduction`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`1. Introduction to the data:
  * EA Sports FIFA is a series of association football sports video games developed and released annually by Electronic Arts under the EA Sports label.
  * Players overall rating as well as six scores for the key stats; Pace, Shooting, Passing, Dribbling, Defending, and Physical. These scores are combined with player's international presence, work/effort on the pitch, team coordination and various other factors to calculate the rating.
  * These ratings are used to determine overall team rating and team gameplay to make EA Sports FIFA as close as to real-life experience making it one of the best selling games.
  * Chosen player ratings are based season 2019-2020 performances of the players, and comparable club [data](https://www.uefa.com/memberassociations/uefarankings/club/#/yr/2020) has club performances for the season 2019-2020
2. The Analysis: To determine how good these ratings are as compared to the real-time and real-life performances by comparing the number of highly rated players in a team and the ratings for each of the club and their official UEFA rankings for the 2019-2020 season`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Information about the Data`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Data and Dataset types`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
* Dataset type: Table
* Attribute Types: Categorical and Ordered(Quantitative)
* Ordering Direction: Diverging`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### More Info and data transformation`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`1. [Data](https://www.kaggle.com/ahmettezcantekin/fifa-21-player-ratings): initially in a .csv format was converted to .json file and upload. This .json file was in turn processed to form clusters to generate insights.
2. The analysis of data is based on the Overall [Ratings](https://www.goal.com/en-ae/news/fifa-player-ratings-explained-how-are-the-card-number-stats/1hszd2fgr7wgf1n2b2yjdpgynu) of players based on their real-life performances by EA Sports
3. The data was available in a table format for each individual player and it had to be transformed by grouping for the club name and ratings of the player for each club
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## The Insight`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`As seen in the sunburst chart - the clubs with highest number of highly rated players from the top 101 players data have the largest area in a descending order. Liverpool with 11 players over 85 rating, Barcelona with 10 players and so on. And, if we compare this stat with the official UEFA ratings of the clubs(in the screenshot below) we can see the clubs with highly rated players tend to be more successful in a particular season looking at the presence of FC Bayern Munchen, Real Madrid, FC Barcelona, Juventus, Manchester City FC, PSG and Liverpool FC in the top 12 making 7 out of 12 teams from the sunburst order of clubs. However clubs like Atletico Madrid, Manchester United and Arsenal with some of the higly rated players are still in the top 12 while not being very high up in the sunburst and teams like Sevilla FC and FC Shaktar Donetsk which are not even present(have none of the top 101 rated players) are still in the top 12 in Europe.

Hence, we can say the player ratings from EA Sports data can help draw significant conclusions about team performances in real life but there are some other factors missing that also determine the team success such as team mentality, coach performance, team's athletic and social maturity, and of course the unpredictable nature of football.

Leaving us with the answer - EA Sports FIFA player ratings are a good source predict team performance to an extent.`
)});
  main.variable(observer("image")).define("image", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("Screen Shot 2021-02-18 at 11.27.51 PM.png").image()
)});
  main.variable(observer()).define(["sunburst"], function(sunburst){return(
sunburst
)});
  main.variable(observer("data")).define("data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("fifa21topplayers.json").json()
)});
  main.variable(observer("groupBy")).define("groupBy", function(){return(
function groupBy(data, property) {
    return data.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
         acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
   }, {});
}
)});
  main.variable(observer("groupedData")).define("groupedData", ["groupBy","data"], function(groupBy,data){return(
groupBy(data, 'club_name')
)});
  main.variable(observer("treeData")).define("treeData", ["table2Tree","data"], function(table2Tree,data){return(
table2Tree(data, ["club_name","overall", "short_name", "nationality", "value_eur"])
)});
  main.variable(observer("viewof filtered")).define("viewof filtered", ["navio","data"], function(navio,data){return(
navio(data)
)});
  main.variable(observer("filtered")).define("filtered", ["Generators", "viewof filtered"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("navio", child1);
  const child2 = runtime.module(define2);
  main.import("table2Tree", child2);
  const child3 = runtime.module(define3).derive([{name: "treeData", alias: "data"}], main);
  main.import("chart", "sunburst", child3);
  return main;
}
