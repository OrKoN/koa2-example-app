'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

var _pageviews = require('../config/collections/pageviews');

var _pageviews2 = _interopRequireDefault(_pageviews);

var _postreads = require('../config/collections/postreads');

var _postreads2 = _interopRequireDefault(_postreads);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var key = null;

try {
  key = require('../config/key');
} catch (err) {
  console.error('../config/key.json is not found. Please create it.');
  process.exit(1);
}

exports.default = {
  collections: {
    pageviews: new _collection2.default(_pageviews2.default),
    postreads: new _collection2.default(_postreads2.default)
  },
  cors: require('../config/cors'),
  key: key
};