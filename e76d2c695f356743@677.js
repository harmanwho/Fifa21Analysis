// https://observablehq.com/@john-guerra/navio@677
import define1 from "./dd4de79703a5a8fd@594.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Navio

[Navio](https://github.com/john-guerra/navio) is a data exploration widget that you can easily include on your code, and that you can even use on an observable to explore some data. Each attribute is represented on a column, and each item as a row. You can:

* Hover for see the selected row and attribute
* Drag for selecting a range
* Click to select all the instances of the hovered value.
* Create nested queries by filtering the results

**Usage for observable**

~~~js
import {navio} from "@john-guerra/navio"

viewof selected = navio(data)
~~~

If you want to **load your own data** use the [navio-load notebook instead](https://observablehq.com/@john-guerra/navio-load)

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Example
[IEEEVIS Publications 1990-2018](https://sites.google.com/site/vispubdata/home)`
)});
  main.variable(observer("viewof selected")).define("viewof selected", ["navio","data"], function(navio,data){return(
navio(data, { attribWidth: 20 })
)});
  main.variable(observer("selected")).define("selected", ["Generators", "viewof selected"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`Here is the selected data:`
)});
  main.variable(observer()).define(["table","selected"], function(table,selected){return(
table(selected, { 
  paged: 25,
  columns : { 
    Abstract: {
        formatter(val, i) {
          if (val) return val.slice(0,100);
          else return val;
        }
      },
    Title: {
        formatter(val, i) {
          if (val) return val.slice(0,100);
          else return val;
        }
      }
    
  }
})
)});
  main.variable(observer("navio")).define("navio", ["d3","html","navio_npm"], function(d3,html,navio_npm){return(
async function navio(data, _options = {}) {
  const options = {
    height: 300, // Navio's height
    attribs: null, // leave as null for all of them

    x0: 0, //Where to start drawing navio in x
    y0: 100, //Where to start drawing navio in y, useful if your attrib names are too long
    maxNumDistictForCategorical: 10, // addAllAttribs uses this for deciding if an attribute is categorical (has less than     maxNumDistictForCategorical categories) or ordered
    maxNumDistictForOrdered: 90, // addAllAttribs uses this for deciding if an attribute is ordered (has less than     maxNumDistictForCategorical categories) or text. Use    maxNumDistictForOrdered : Infinity for never choosing Text

    howManyItemsShouldSearchForNotNull: 100, // How many rows should addAllAttribs search to decide guess an attribute type
    margin: 10, // Margin around navio

    levelsSeparation: 40, // Separation between the levels
    divisionsColor: "white", // Border color for the divisions
    levelConnectionsColor: "rgba(205, 220, 163, 0.5)", // Color for the conections between levels
    divisionsThreshold: 4, // What's the minimum row height needed to draw divisions
    fmtCounts: d3.format(",.0d"), // Format used to display the counts on the bottom
    legendFont: "14px sans-serif", // The font for the header
    nestedFilters: true, // Should navio use nested levels?

    showAttribTitles: true, // Show headers?
    attribWidth: 15, // Width of the columns
    attribRotation: -45, // Headers rotation
    attribFontSize: 13, // Headers font size
    attribFontSizeSelected: 32, // Headers font size when mouse over

    filterFontSize: 10, // Font size of the filters explanations on the bottom

    tooltipFontSize: 12, // Font size for the tooltip
    tooltipBgColor: "#b2ddf1", // Font color for tooltip background
    tooltipMargin: 50, // How much to separate the tooltip from the cursor
    tooltipArrowSize: 10, // How big is the arrow on the tooltip

    digitsForText: 2, // How many digits to use for text attributes

    addAllAttribsRecursionLevel: Infinity, // How many levels depth do we keep on adding nested attributes
    addAllAttribsIncludeObjects: false, // Should addAllAttribs include objects
    addAllAttribsIncludeArrays: false, // Should addAllAttribs include arrays

    nullColor: "#ffedfd", // Color for null values
    defaultColorInterpolator: d3.interpolateBlues,
    defaultColorInterpolatorDate: d3.interpolatePurples,
    defaultColorInterpolatorDiverging: d3.interpolateBrBG,
    defaultColorInterpolatorOrdered: d3.interpolateOranges,
    defaultColorInterpolatorText: d3.interpolateGreys,
    defaultColorRangeBoolean: ["#a1d76a", "#e9a3c9", "white"], //true false null
    defaultColorRangeSelected: ["white", "#b5cf6b"],
    defaultColorCategorical: d3.schemeCategory10,
    ..._options
  };

  let div = html`<div  style="display:block; overflow-x:scroll"></div>`;

  // Create the navio
  const nv = navio_npm(d3.select(div), options.height);

  for (let opt in options) {
    if (opt !== "attribs") {
      nv[opt] = options[opt];
    }
  }

  // Add the data
  nv.data(data);

  if (options.attribs) {
    nv.addAllAttribs(options.attribs);
  } else {
    nv.addAllAttribs();
  }

  nv.updateCallback(() => {
    div.value = nv.getVisible();
    div.dispatchEvent(new CustomEvent("input"));
    // notify(div);
  });

  div.value = data;
  return div;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
## How to implement Navio outside observable?
To create a navio you just need to import d3 (and d3-scale-chromatic if you are using version 4), then create a navio on the selection where you want it to draw, define the attributes and finally setup a update callback. See below for the code running this notebook

\`\`\`javascript
// Create a navio instance
const nv = navio(d3.select(div), height);  
// Add the data
nv.data(data);
// Add all attribs
nv.addAllAttribs();
// Set the initial visible elements, and setup a callback for when selecting new items
mutable visible = nv.getVisible();
// Setup a callback
nv.updateCallback(() => mutable visible = nv.getVisible());

\`\`\`

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## The data

The data comes from the wonderful [vispubdata](http://vispubdata.org) initiative, thanks Petra et al. If you want to try Navio with your own data just fork this Notebook`
)});
  main.variable(observer("data")).define("data", ["d3"], function(d3){return(
d3.csv("https://raw.githubusercontent.com/john-guerra/visPubNetwork/master/IEEE%20VIS%20papers%201990-2018%20-%20Main%20dataset.csv", d3.autoType)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Imports
`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  main.variable(observer("navio_npm")).define("navio_npm", ["require"], function(require){return(
require("navio@latest")
)});
  const child1 = runtime.module(define1);
  main.import("table", child1);
  return main;
}
