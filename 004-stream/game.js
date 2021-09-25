#!/usr/bin/env node

const readline = require('readline');
const { argv } = require('yargs');
const path = require('path');
const fs = require('fs');
const { _ } = argv;

let number = String(Math.round(Math.random()) + 1);
const dir = path.join(__dirname, 'logs');

fs.mkdir(dir, (err) => {
    if (err) {
        if (err.code !== 'EEXIST') {
            throw new Error(err);
        }
    } 
});

const file = path.join(__dirname, 'logs', _[0]);

console.log('Орел или решка (1 или 2)?');
const input = readline.createInterface(process.stdin);

input.on('line', (str) => {
    let content = 0;
    
     if (number === str) {
        console.log('Угадал! Давай еще?');
        content = 1;
    } else {
        console.log('Не угадал.. Попробуешь еще?)');
        number = String(Math.round(Math.random()) + 1);
    }

    fs.appendFile(
        file,
        content,
        err => {
            if (err) throw new Error(err)
        }
    )
})

input.on('error', (err) => {
    console.log(err)
})

