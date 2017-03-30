#!/usr/bin/env node
'use strict';
const pkgstat = require('pkgstat');
const program = require('commander');
const chalk = require('chalk');
const pkgversion = require('./package.json').version;
const languages = ['ruby', 'node', 'python'];
function availability(lang,status){

    return ((status == 404 ? chalk.green(" ✔ Available"): chalk.red(" ✖ Taken")) + chalk.bold(" in " + lang));
}
function isTaken(pkg_name,lang){
    pkgstat(pkg_name,lang).then(resp =>{
        console.log(availability(lang,resp.status));
    })
}
function displayMetaData(pkg_name,lang){
    pkgstat(pkg_name,lang)
        .then(resp => {
            if(resp.status == 404){
                console.log(pkg_name,"pkg name is",availability(lang,404));
            }else if(resp.status == 200){
                var output = [
                    chalk.green("Name ") + chalk.bold(resp.name),
                    chalk.green("Author ") + chalk.bold(resp.author),
                    chalk.green("Description ") + chalk.bold(resp.description),
                    chalk.green("URL ") + chalk.bold(resp.url),
                    chalk.green("Homepage ") + chalk.bold(resp.source),
                    chalk.green("License ") + chalk.bold(resp.license),
                    chalk.green("Version ") + chalk.bold(resp.version)
                ];  
                console.log(output.join("\n"));
            }
        });
}

program
    .description('Search pkg name availablity and pkg info on npm,pypi and rubygems')
    .version(pkgversion)
    .option('-s , --search <pkg>','search for pkg name availability in npm,pip and gems')
    .option('--node <pkg_name>','info on node pkg from npm')
    .option('--python <pkg_name>','info on python pkg from pypi')
    .option('--ruby <pkg_name>','info on ruby pkg from rubygems')
    .parse(process.argv);
if(program.search){
    var pkg_name = program.search;
    console.log(chalk.bold(pkg_name),chalk.bold("pkg name is...."));
    languages.forEach(lang => isTaken(pkg_name,lang));
} else if(program.node){
    var pkg_name = program.node;
    displayMetaData(pkg_name,"node");
}else if(program.ruby){
    var pkg_name = program.ruby;
    displayMetaData(pkg_name,"ruby");
}else if(program.python){
    var pkg_name = program.python;
    displayMetaData(pkg_name,"python");
}
