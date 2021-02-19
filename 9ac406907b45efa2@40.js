// https://observablehq.com/@john-guerra/multi-auto-select@40
import define1 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Multi Auto Select

A selector of multiple items with an autocomplete search box. Based on [@jahkenas/inputs](/@jashkenas/inputs), also submitted as a suggestion there

~~~js
import {multiAutoSelect} from "@john-guerra/multi-auto-select"
~~~
Example:`
)});
  main.variable(observer("viewof mas")).define("viewof mas", ["multiAutoSelect","usa"], function(multiAutoSelect,usa){return(
multiAutoSelect({
  options: usa.objects.states.geometries.map(d => d.properties.name),
  placeholder: "Select some US states . . ."
})
)});
  main.variable(observer("mas")).define("mas", ["Generators", "viewof mas"], (G, _) => G.input(_));
  main.variable(observer()).define(["mas"], function(mas){return(
mas
)});
  main.variable(observer("multiAutoSelect")).define("multiAutoSelect", ["input","html"], function(input,html){return(
function multiAutoSelect(config = {}) {
  const {
    value,
    title,
    description,
    disabled,
    autocomplete = "off",
    placeholder,
    size,
    options,
    list = "options"
  } = Array.isArray(config) ? { options: config } : config;

  const optionsSet = new Set(options);

  const form = input({
    type: "text",
    title,
    description,
    attributes: { disabled },
    action: fm => {
      const addSelectedOption = d => {
        const ele = html`<span style="margin-right: 5px; border: solid 1px #ccc; border-radius: 10px;padding: 2px 5px;">${d} <button style="margin:0px; padding:0px;">✖️</button></span>`;
        ele.querySelector("button").addEventListener("click", b => {
          console.log("delete", d);
          fm.value.splice(fm.value.indexOf(d), 1);
          renderSelection();
          fm.dispatchEvent(new CustomEvent("input"));
          fm.input.focus();
        });
        return ele;
      };

      function renderSelection() {
        fm.output.innerHTML = "";
        for (let o of fm.value) {
          fm.output.appendChild(addSelectedOption(o));
        }
      }

      fm.input.value = "";
      fm.value = value || [];
      fm.onsubmit = e => e.preventDefault();
      fm.input.oninput = function(e) {
        e.stopPropagation();
        if (
          optionsSet.has(fm.input.value) &&
          fm.value.indexOf(fm.input.value) === -1
        ) {
          fm.value.push(fm.input.value);
          renderSelection();
          fm.input.value = "";
          fm.dispatchEvent(new CustomEvent("input"));
        }
      };

      renderSelection();
    },
    form: html`
      <form>
         <input name="input" type="text" autocomplete="off" 
          placeholder="${placeholder ||
            ""}" style="font-size: 1em;" list=${list}>
          <datalist id="${list}">
              ${options.map(d =>
                Object.assign(html`<option>`, {
                  value: d
                })
              )}
          </datalist>
          <br/>
      </form>
      `
  });

  form.output.style["margin-left"] = "0px";

  return form;
}
)});
  const child1 = runtime.module(define1);
  main.import("input", child1);
  main.import("usa", child1);
  return main;
}
