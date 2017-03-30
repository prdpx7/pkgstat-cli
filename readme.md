# pkgstat-cli [![Build Status](https://travis-ci.org/zuck007/pkgstat-cli.svg?branch=master)](https://travis-ci.org/zuck007/pkgstat-cli) [![MITlicensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/zuck007/pkgstat-cli/master/LICENSE)
> search package name availability and pkg info on npm,pypi and rubygems.

## Install
```
$ npm install -g pkgstat-cli
```
## Usage
```
$ pkgstat --help
Usage: pkgstat [options]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -s , --search <pkg>  search for pkg name availability in npm,pip and gems
    --node <pkg_name>    info on node pkg from npm
    --python <pkg_name>  info on python pkg from pypi
    --ruby <pkg_name>    info on ruby pkg from rubygems
```
## Demo
![](screenshot.png)