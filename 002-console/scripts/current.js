#!/usr/bin/env node

const { argv } = require("yargs");
const { year, y, month, m, date, d, _ } = argv;
const curr = new Date();
const isSub = _.includes('sub');
const isAdd = _.includes('add');

const change = (curr) => {
    const sign = isSub ? -1 : 1

    if (year || y) {
        curr.setFullYear(curr.getFullYear() + sign * (year || y));
    } else if (month || m) {
        curr.setMonth(curr.getMonth() + sign * (month || m));
    } else if (date || d) {
        curr.setDate(curr.getDate() + sign * (date || d));
    }

    return new Date(curr);
}

if (isAdd || isSub) { 
    console.log('Текущая дата и время в формате ISO: ', change(curr).toISOString());
} else if (year || y) {
    console.log('Текущий год: ', curr.getFullYear());
} else if (month || m) {
    console.log('Текущий месяц: ', curr.getMonth());
} else if (date || d) {
    console.log('Дата в календарном месяце: ', curr.getDate());
} else {
    console.log('Текущая дата и время в формате ISO: ', curr.toISOString());
}