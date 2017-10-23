
require('babel-register')();
const Adapter = require('enzyme-adapter-react-14');
var Enzyme = require('enzyme');
Enzyme.configure({ adapter: new Adapter() })


var JSDOM = require('jsdom').JSDOM

var exposedProperties = ['window', 'navigator', 'document'];
var {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.window = document.defaultView;

global.localStorage = {
        access_token: '',
        getItem: function () {
            return ''
        }
    }

Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

documentRef = document;