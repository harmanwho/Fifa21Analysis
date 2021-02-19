# Could EA Sports Fifa player ratings be a real-life predictor of football club performances?

https://observablehq.com/@harmanwho/could-ea-sports-fifa-player-ratings-be-a-real-life-predictor@222

View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
python -m SimpleHTTPServer
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@4
npm install https://api.observablehq.com/d/2533abec4460c568.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "@harmanwho/could-ea-sports-fifa-player-ratings-be-a-real-life-predictor";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~
