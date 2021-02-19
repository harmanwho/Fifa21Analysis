// https://observablehq.com/@john-guerra/table-2-tree@167
import define1 from "./58f97db817aadd06@169.js";
import define2 from "./5432439324f2c616@170.js";
import define3 from "./9ac406907b45efa2@40.js";
import define4 from "./1371b3b2446a73b4@274.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Table 2 Tree

**[Also consider using d3 hierarchy d3@6](https://observablehq.com/@d3/d3-group-d3-hierarchy)**

A simple function to transform a table into the format expected in d3 for trees. 

## Usage

~~~js
import { table2Tree } from "@john-guerra/table-2-tree"
~~~

and then
~~~js
table2Tree(yourData, ["list", "of", "attributes", "to", "nest"])
~~~

You can pass an optional third attribute for computing the value, which can be an attribute name or an aggregation function that receive the rows that fall on each node

## Example
`
)});
  main.variable(observer("treeData")).define("treeData", ["table2Tree","data","attribs","d3"], function(table2Tree,data,attribs,d3){return(
table2Tree(data, attribs, v => d3.mean(v, d => d.lat))
)});
  main.variable(observer("viewof attribs")).define("viewof attribs", ["multiAutoSelect","data"], function(multiAutoSelect,data){return(
multiAutoSelect({
  options: Object.keys(data[0]),
  value: ["age", "race"],
  title: "Select the attributes to group by"
})
)});
  main.variable(observer("attribs")).define("attribs", ["Generators", "viewof attribs"], (G, _) => G.input(_));
  main.variable(observer()).define(["chart"], function(chart){return(
chart
)});
  main.variable(observer("viewof data")).define("viewof data", ["dataInput","initialValue"], function(dataInput,initialValue){return(
dataInput({ initialValue })
)});
  main.variable(observer("data")).define("data", ["Generators", "viewof data"], (G, _) => G.input(_));
  main.variable(observer("initialValue")).define("initialValue", ["loadSocrata","url"], function(loadSocrata,url){return(
loadSocrata(url, { progressive: false })
)});
  main.variable(observer("table2Tree")).define("table2Tree", ["d3","rollupsToTree"], function(d3,rollupsToTree){return(
function(data, attribs, value = undefined) {
  const valueFn = v =>
    value === undefined
      ? v.length // Default value count nodes
      : value instanceof Function // If value is a function just pass it
      ? value(v)
      : d3.sum(v, d => +d[value]); // If value is not a function assume it is an attribute and sum it

  return rollupsToTree(
    d3.rollups(...[data, valueFn].concat(...attribs.map(a => d => d[a])))
  );
}
)});
  main.variable(observer("rollupsToTree")).define("rollupsToTree", function(){return(
function(rollupsData) {
  const makeTreeNode = d => {
    let res = {
      name: d[0]
    };

    if (Array.isArray(d[1])) res.children = rollupsToTree(d[1]);
    else res.value = d[1];
    return res;
  };

  function rollupsToTree(groupedData) {
    if (!groupedData) return;

    return groupedData.map(makeTreeNode);
  }

  return {
    name: "",
    children: Array.isArray(rollupsData)
      ? rollupsToTree(rollupsData)
      : [{ name: "", value: rollupsData }]
  };
}
)});
  main.variable(observer("url")).define("url", function(){return(
"https://data.cityofberkeley.info/resource/4tbf-3yt8.csv"
)});
  const child1 = runtime.module(define1);
  main.import("loadSocrata", child1);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3-array")
)});
  const child2 = runtime.module(define2).derive([{name: "treeData", alias: "data"}], main);
  main.import("chart", child2);
  const child3 = runtime.module(define3);
  main.import("multiAutoSelect", child3);
  const child4 = runtime.module(define4);
  main.import("dataInput", child4);
  return main;
}
