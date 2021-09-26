#!/usr/bin/env node

const { argv } = require('yargs');
const util = require('util');
const fs = require('fs');
const { _ } = argv;

const file = util.promisify(fs.readFile)

file(`logs/${_[0]}`, 'utf8').then((data) => {
    const values = data.split('');
    console.log('Общее количество партий:', values.length);
    const winNo = values.reduce((prev, curr) => {
        return Number(curr) ? [prev[0] + 1, prev[1]] : [prev[0], prev[1] + 1]
    }, [0, 0])
    console.log('Количество выигранных:', winNo[0], 'Количество проигранных партий:', winNo[1]);
    console.log('Процентное соотношение выигранных партий:', Math.round(winNo[0] / values.length * 100));
}).catch((err) => {
    console.log(err);
})