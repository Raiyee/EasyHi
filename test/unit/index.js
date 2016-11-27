// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import chai from 'chai'
import sinonChai from 'sinon-chai'
import {triggerHTMLEvents, triggerMouseEvents, triggerTouchEvents} from './utils'

localStorage.clear()

chai.use(sinonChai)

global.triggerHTMLEvents = triggerHTMLEvents
global.triggerMouseEvents = triggerMouseEvents
global.triggerTouchEvents = triggerTouchEvents
global.assert = chai.assert
global.expect = chai.expect

// Reset styles
document.body.style.margin = '0px'
document.body.style.padding = '0px'

// ---------------------------------------
// Require Tests
// ---------------------------------------
// for use with karma-webpack-with-fast-source-maps
const __karmaWebpackManifest__ = [] // eslint-disable-line
const inManifest = path => ~__karmaWebpackManifest__.indexOf(path)

// require all `**/*.spec.js`
const testsContext = require.context('./', true, /\.spec\.js$/)

// only run tests that have changed after the first pass.
const testsToRun = testsContext.keys().filter(inManifest);

(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext)

// require `src/**/*.(js|vue)` (for coverage reporting)
const componentsContext = require.context('../../src', true, /^(((?!index|mock|routes|utils).)*\.js)|(.*\.vue)$/)

componentsContext.keys().forEach(componentsContext)
