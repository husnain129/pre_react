var ReactDOMServer = require("react-dom/server");
var React = require("react");
var express = require("express");
var { Item, getServerSideProps } = require("./dist/Item");
const generateStatic = require("./build");

function runServer() {
  var app = express();

  app.get("/ssr", (req, res) => {
    let props = getServerSideProps({ req, res }).props;
    let rendered = ReactDOMServer.renderToString(
      React.createElement(
        "div",
        { id: "root" },
        React.createElement(Item, props)
      )
    );
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        ${rendered}
        <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="Item.js"></script> 
        <script>
        
        let root = document.querySelector("#root");

        var item = React.createElement(Item,JSON.parse('${JSON.stringify(
          props
        )}'));
        ReactDOM.hydrate(item, root);
        
        </script>
    </body>
    </html>
    `);
  });

  app.use(express.static(__dirname + "/dist"));

  let interval = null;

  app.get("/static", (req, res) => {
    res.sendFile(__dirname + "/dist/static.html");
    if (!interval) {
      interval = setInterval(() => {
        console.log("Triggering build");
        generateStatic();
        clearInterval(interval);
        interval = null;
      }, 10000);
    }
  });
  app.listen(3000);
}

runServer();
