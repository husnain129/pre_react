var ReactDOMServer = require("react-dom/server");
var React = require("react");
var fs = require("fs");
var { getItem } = require("./main");
var { Item, getStaticSiteProps } = require("./dist/Item");
function generateStatic() {
  let props = getStaticSiteProps().props;
  let rendered = ReactDOMServer.renderToString(
    React.createElement(Item, props)
  );

  fs.writeFile("dist/static.html", rendered, function (err) {
    if (err) {
      throw err;
    }
    console.log("Build complete");
  });
}

console.log("Build Started");
generateStatic();

module.exports = generateStatic;
