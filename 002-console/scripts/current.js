#!/usr/bin/env node

const { argv } = require("yargs");
const { year, y, month, m, date, d } = argv;
const curr = new Date();

if (year || y) {
    console.log('Текущий год: ', curr.getFullYear());
} else if (month || m) {
    console.log('Текущий месяц: ', curr.getMonth());
} else if (date || d) {
    console.log('Дата в календарном месяце: ', curr.getDate());
} else {
    console.log('Текущая дата и время в формате ISO: ', curr.toISOString());
}