require('babel-polyfill');
const app = require('./build/app').default;
app.listen(4000);
