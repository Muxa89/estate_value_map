"use strict";

let ConcatSource;
try {
  ConcatSource = require("webpack-core/lib/ConcatSource");
} catch (e) {
  ConcatSource = require("webpack-sources").ConcatSource;
}

const fs = require("fs");
const util = require("util");
const exists = util.promisify(fs.exists);
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const { resolve } = require("path");
const VERSION = "VERSION";

class GreasemonkeyBannerPlugin {
  constructor(options) {
    this.distPath = options.distPath;
    this.getBanner = options.getBanner;
    this.versionFile = resolve(this.distPath, VERSION);
  }

  apply(compiler) {
    compiler.hooks.emit.tapPromise("GreasemonkeyBannerPlugin", compilation =>
      exists(this.versionFile)
        .then(versionFileExists => {
          if (!versionFileExists) {
            return writeFile(this.versionFile, String(1));
          }
        })
        .then(() => readFile(this.versionFile))
        .then(version => {
          version = version.toString();
          compilation.chunks.forEach(chunk => {
            const fileName = chunk.files[0];
            compilation.assets[fileName] = new ConcatSource(
              this.getBanner(version++),
              compilation.assets[fileName]
            );
          });
          return version;
        })
        .then(version => writeFile(this.versionFile, version))
    );
  }
}

module.exports = GreasemonkeyBannerPlugin;
