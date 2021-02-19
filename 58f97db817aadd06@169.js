// https://observablehq.com/@john-guerra/socrata-load-multiples-pages@169
import define1 from "./e76d2c695f356743@677.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Socrata load multiple pages

This notebook connects to a socrata api and downloads multiple pages of data using the $offset and $limit parameters. It yields the data progressively as it continues downloading it. Here is an example with the [NYC Citywide Payroll data](https://data.cityofnewyork.us/City-Government/Citywide-Payroll-Data-Fiscal-Year-/k397-673e).

Usage: 

Create a cell named url with the string of your socrata url, and then 
~~~js
import {loadSocrata} from  "@john-guerra/socrata-load-multiples-pages"
~~~

and then

~~~js
data = loadSocrata(myUrl)
~~~
## Example`
)});
  main.variable(observer("socrataURL")).define("socrataURL", function(){return(
"https://data.cityofnewyork.us/resource/k397-673e.csv"
)});
  main.variable(observer("data")).define("data", ["loadSocrata","socrataURL"], function(loadSocrata,socrataURL){return(
loadSocrata(socrataURL)
)});
  main.variable(observer("loadSocrata")).define("loadSocrata", ["d3"], function(d3){return(
async function* loadSocrata(_url, options = {}) {
  const before = new Date();
  let {
    progressive = true,
    max_pages = 100,
    rows_per_page = 50000,
    start_offset = 0
  } = { ...options };

  const url = new URL(_url);

  let data = [],
    res,
    i = 0;

  while (i++ < max_pages) {
    url.searchParams.set("$limit", rows_per_page);
    url.searchParams.set("$offset", data.length + start_offset);

    res = await fetch(url.href).then(res =>
      url.pathname.includes(".json")
        ? res.json()
        : res.text().then(txt => d3.csvParse(txt))
    );

    if (!res || res.length === 0) {
      console.log(`Data downloaded in ${(new Date() - before) / 1000} seconds`);
      break;
    }
    data = data.concat(res);

    if (progressive) yield data;
  }

  yield data;
}
)});
  main.variable(observer()).define(["md","viewof visualizeIt"], function(md,$0){return(
md`---
# Visualize it? 

check this -> ${$0} to see a summary of the data with [navio](https://navio.dev) below. Depending of the size of the dataset, it could take a while to load
`
)});
  main.variable(observer()).define(["visualizeIt","navio","data"], function(visualizeIt,navio,data)
{
  if (visualizeIt) {
    const before = new Date();
    const div = navio(data);
    console.log(`NAVIO Loaded in ${(new Date() - before) / 1000} seconds`);
    return div;
  }
  return;
}
);
  main.variable(observer("viewof visualizeIt")).define("viewof visualizeIt", ["html"], function(html){return(
html`<input type="checkbox">`
)});
  main.variable(observer("visualizeIt")).define("visualizeIt", ["Generators", "viewof visualizeIt"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("navio", child1);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3-dsv")
)});
  return main;
}
