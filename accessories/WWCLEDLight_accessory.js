"use strict";

const uuid = require('../index.js').uuid;
const Accessory = require('../index.js').Accessory;
const Service = require('../index.js').Service;
const Characteristic = require('../index.js').Characteristic;

const mraa = require('mraa');

let accessory = new Accessory('WWC LED Light', uuid.generate('some-string'));

accessory.username = '33:44:55:66:77:88';
accessory.pincode = '000-00-001';

let service = accessory.addService(Service.Lightbulb, 'WWC LED Light');
let onCharacteristic = service.getCharacteristic(Characteristic.On);

let ledGpio = new mraa.Gpio(2);
ledGpio.dir(mraa.DIR_OUT);
ledGpio.write(0);

let isOn = false;

onCharacteristic.on('set', (value, callback) => {
    isOn = value;
    if(isOn)
        ledGpio.write(1);
    else
        ledGpio.write(0);
    callback(null);
});

onCharacteristic.on('get', callback => {
    callback(null, isOn);
});

module.exports.accessory = accessory;