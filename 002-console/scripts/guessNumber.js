#!/usr/bin/env node

const readline = require('readline');
const input = readline.createInterface(process.stdin);
const min = Math.floor(Math.random() * 1000);
let max = Math.floor(Math.random());

while (min >= max) {
    max = Math.floor(Math.random() * 1000);
}

const hiddenNumber = String(Math.floor(Math.random() * (max - min)) + min); 

console.log(`Загадано число в диапазоне от ${min} до ${max}`);

input.on('line', (str) => {
    if (hiddenNumber === str) {
        console.log('Отгадано число', hiddenNumber);
        process.exit();
    } 
    if (hiddenNumber > str) {
        console.log('Больше');
    } else {
        console.log('Меньше');
    }
})