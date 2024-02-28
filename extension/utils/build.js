// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";
process.env.ASSET_PATH = "/";

var webpack = require("webpack"),
  path = require("path"),
  fs = require("fs"),
  config = require("../webpack.config"),
  ZipPlugin = require("zip-webpack-plugin");

delete config.chromeExtensionBoilerplate;

config.mode = "production";

var packageInfo = JSON.parse(fs.readFileSync("package.json", "utf-8"));
var manifest = JSON.parse(fs.readFileSync("src/manifest.json", "utf-8"));

config.plugins = (config.plugins || []).concat(
  new ZipPlugin({
    filename: `${packageInfo.name}-${manifest.version}.zip`,
    path: path.join(__dirname, "../", "zip"),
  })
);

webpack(config, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
});
