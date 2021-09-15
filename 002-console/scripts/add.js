#!/usr/bin/env node

const { argv } = require("yargs");
const { year, y, month, m, date, d } = argv;
let curr = new Date();

if (year || y) {
    curr.setFullYear(curr.getFullYear() + (year || y));
} else if (month || m) {
    curr.setMonth(curr.getMonth() + (month || m));
} else if (date || d) {
    curr.setDate(curr.getDate() + (date || d));
}

const newDate = new Date(curr);

console.log('Текущая дата и время в формате ISO: ',  newDate.toISOString());