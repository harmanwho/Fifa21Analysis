// https://observablehq.com/@john-guerra/file-input-with-default-value@274
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("intro")).define("intro", ["md"], function(md){return(
md`# File input with default value

A file input for data files that tries to guess the data format with an initialValue. Supports csv, json and jsonArray

\`\`\`js
import {dataInput} from "@john-guerra/file-input-with-default-value"
\`\`\`

`
)});
  main.variable(observer("viewof data")).define("viewof data", ["dataInput"], function(dataInput){return(
dataInput({
  initialValue: [{name:"Your Initial Data"}],
  delimiter:',', // Optional
  format: "auto" // Optional, one of MongoExport, JSON, CSV, CSVNoAutoType
})
)});
  main.variable(observer("data")).define("data", ["Generators", "viewof data"], (G, _) => G.input(_));
  main.variable(observer()).define(["data"], function(data){return(
data
)});
  main.variable(observer("dataInput")).define("dataInput", ["loadJSON","loadMongoExport","loadCSVAutoType","loadCSV","html","Files"], function(loadJSON,loadMongoExport,loadCSVAutoType,loadCSV,html,Files){return(
function dataInput({initialValue, accept = "", delimiter = ",", format="auto"} = {}) {
   const processFile = data => {
     if (format==="auto") {
       try { return loadJSON(data, delimiter); } catch { console.log("Failed with json"); }
       try { return loadMongoExport(data); } catch{ console.log("Failed with MongoExport"); }       
       try { return loadCSVAutoType(data, delimiter); } catch { console.log("Failed with CSV AutoType"); }
       try { return loadCSV(data); } catch { console.log("Failed with CSV"); }
       return initialValue;
     } else {
       switch(format) {
         case "JSON": 
           try { return loadJSON(data, delimiter); } catch { 
             console.log("Failed with json"); return initialValue; 
           }
         case "MongoExport": 
           try { return loadMongoExport(data); } catch{ 
             console.log("Failed with MongoExport"); 
             return initialValue; 
           }       
         case "CSV": 
           try { return loadCSVAutoType(data, delimiter); } catch { 
             console.log("Failed with CSV AutoType"); 
             return initialValue; 
           }
         case "CSVNoAuto": 
           try { return loadCSV(data); } catch { 
             console.log("Failed with CSV"); 
             return initialValue; 
           }
       }       
     }
      
  }  
  
  const form = html`<form><input name=i type="file" accept="${accept}">`;
  form.i.onchange = () => {
    form.value = Files
      .text(form.i.multiple ? form.i.files : form.i.files[0])      
      .then(processFile);
    form.dispatchEvent(new CustomEvent("input"));
  };
  form.value = initialValue;
  return form;
}
)});
  main.variable(observer("loadMongoExport")).define("loadMongoExport", function(){return(
(data) => {
  console.log("Trying Mongo export");
  const res = [];
  for (let row of data.split("\n")){
    if(row === "") { continue; } 
    try{
      row = JSON.parse(row);
      res.push(row);
    } catch(e3){
      break;
    }        
  }      
  if (res.length>0) {
    return res; 
  } else {
    throw "Error parsing MongoExport";
  }
}
)});
  main.variable(observer("loadJSON")).define("loadJSON", function(){return(
(data) => {
  console.log("Trying JSON");
  return JSON.parse(data);        
}
)});
  main.variable(observer("loadCSVAutoType")).define("loadCSVAutoType", ["d3"], function(d3){return(
(data, delimiter) => { 
  console.log("Trying CSV autotype");
  return d3.dsvFormat(delimiter).parse(data, d3.autoType);
}
)});
  main.variable(observer("loadCSV")).define("loadCSV", ["d3"], function(d3){return(
(data, delimiter) => {     
  console.log("Trying CSV");  
  return d3.dsvFormat(delimiter).parse(data);
}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3")
)});
  return main;
}
