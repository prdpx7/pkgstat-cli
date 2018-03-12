#!/usr/bin/env node
'use strict'
const pkgstat = require('pkgstat')
const program = require('commander')
const chalk = require('chalk')
const pkgversion = require('./package.json').version
const languages = ['ruby', 'node', 'python']
var pkgName = ''
function availability (lang, status) {
  return ((status === 404 ? chalk.green(' ✔ Available') : chalk.red(' ✖ Taken')) + chalk.bold(' in ' + lang))
}
function isTaken (pkgName, lang) {
  pkgstat(pkgName, lang).then(resp => {
    console.log(availability(lang, resp.statusCode))
  })
}
function displayMetaData (pkgName, lang) {
  pkgstat(pkgName, lang)
        .then(resp => {
          console.log('------------------')
          if (resp.statusCode === 404) {
            console.log(pkgName, 'pkg name is', availability(lang, 404))
          } else if (resp.statusCode === 200) {
            var output = [
              chalk.green('Name ') + chalk.bold(resp.name),
              chalk.green('Author ') + chalk.bold(resp.author),
              chalk.green('Description ') + chalk.bold(resp.description),
              chalk.green('Total Downloads in Last 30 Days ' + chalk.bold(resp.totalDownloadsLastMonth || 'NA')),
              chalk.green('URL ') + chalk.bold(resp.url),
              chalk.green('Homepage ') + chalk.bold(resp.source),
              chalk.green('License ') + chalk.bold(resp.license),
              chalk.green('Version ') + chalk.bold(resp.version)
            ]

            console.log(output.join('\n'))
          }
        })
}

program
    .description('Search pkg name availablity and pkg info on npm,pypi and rubygems')
    .version(pkgversion)
    .option('-s , --search <pkg>', 'search for pkg name availability in npm,pip and gems')
    .option('--node <pkgName>', 'info on node pkg from npm')
    .option('--python <pkgName>', 'info on python pkg from pypi')
    .option('--ruby <pkgName>', 'info on ruby pkg from rubygems')
    .parse(process.argv)
if (program.search) {
  pkgName = program.search
  console.log(chalk.bold(pkgName), chalk.bold('pkg name is....'))
  languages.forEach(lang => isTaken(pkgName, lang))
} else if (program.node) {
  pkgName = program.node
  displayMetaData(pkgName, 'node')
} else if (program.ruby) {
  pkgName = program.ruby
  displayMetaData(pkgName, 'ruby')
} else if (program.python) {
  pkgName = program.python
  displayMetaData(pkgName, 'python')
} else if (program.args.length > 0) {
  var name = program.args.join(' ')
  displayMetaData(name, 'node')
  displayMetaData(name, 'ruby')
  displayMetaData(name, 'python')
} else {
  console.log('see `pkgstat --help` for more info')
}
