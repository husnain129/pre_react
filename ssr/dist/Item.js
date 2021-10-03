const { getDataFromDB } = require("../api");

if (typeof module != "undefined") var React = require("react");

function Item(props) {
  // React.useEffect(() => {
  //   console.log("Inside component");
  //   setPrice(10);
  // });

  return React.createElement("li", { className: "item" }, [
    props.name + " " + props.price,
  ]);
}

function getServerSideProps({ req, res }) {
  const { name, price } = getDataFromDB();
  return {
    props: { name, price },
  };
}

function getStaticSiteProps() {
  return {
    props: getDataFromDB(),
  };
}

if (typeof module != "undefined") {
  module.exports = {
    Item: Item,
    getServerSideProps: getServerSideProps,
    getStaticSiteProps,
  };
}
