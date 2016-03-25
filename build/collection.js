'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var redis = require('promise-redis')();
var db = redis.createClient();

var Collection = function () {
  function Collection(json) {
    _classCallCheck(this, Collection);

    this.name = json.name;
    this.attributes = json.attributes;
    this.groupBy = json.groupBy;
  }

  _createClass(Collection, [{
    key: 'countBy',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(attr, val) {
        var count;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return db.hget(this.name + '_by_' + attr, val);

              case 2:
                count = _context.sent;
                return _context.abrupt('return', Number(count));

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function countBy(_x, _x2) {
        return ref.apply(this, arguments);
      }

      return countBy;
    }()
  }, {
    key: 'count',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var count;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return db.zcount('' + this.name, '-inf', '+inf');

              case 2:
                count = _context2.sent;
                return _context2.abrupt('return', Number(count));

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function count() {
        return ref.apply(this, arguments);
      }

      return count;
    }()
  }, {
    key: 'add',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(event) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return db.zadd('' + this.name, 1, JSON.stringify(event));

              case 2:
                _context3.next = 4;
                return this._incrGroups(event);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function add(_x3) {
        return ref.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: '_incrGroups',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(event) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, attr;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context4.prev = 3;
                _iterator = this.groupBy[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context4.next = 12;
                  break;
                }

                attr = _step.value;
                _context4.next = 9;
                return db.hincrby(this.name + '_by_' + attr, event[attr], 1);

              case 9:
                _iteratorNormalCompletion = true;
                _context4.next = 5;
                break;

              case 12:
                _context4.next = 18;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4['catch'](3);
                _didIteratorError = true;
                _iteratorError = _context4.t0;

              case 18:
                _context4.prev = 18;
                _context4.prev = 19;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 21:
                _context4.prev = 21;

                if (!_didIteratorError) {
                  _context4.next = 24;
                  break;
                }

                throw _iteratorError;

              case 24:
                return _context4.finish(21);

              case 25:
                return _context4.finish(18);

              case 26:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 14, 18, 26], [19,, 21, 25]]);
      }));

      function _incrGroups(_x4) {
        return ref.apply(this, arguments);
      }

      return _incrGroups;
    }()
  }, {
    key: 'clear',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, attr;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return db.del('' + this.name);

              case 2:
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context5.prev = 5;
                _iterator2 = this.groupBy[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context5.next = 14;
                  break;
                }

                attr = _step2.value;
                _context5.next = 11;
                return db.del(this.name + '_by_' + attr);

              case 11:
                _iteratorNormalCompletion2 = true;
                _context5.next = 7;
                break;

              case 14:
                _context5.next = 20;
                break;

              case 16:
                _context5.prev = 16;
                _context5.t0 = _context5['catch'](5);
                _didIteratorError2 = true;
                _iteratorError2 = _context5.t0;

              case 20:
                _context5.prev = 20;
                _context5.prev = 21;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 23:
                _context5.prev = 23;

                if (!_didIteratorError2) {
                  _context5.next = 26;
                  break;
                }

                throw _iteratorError2;

              case 26:
                return _context5.finish(23);

              case 27:
                return _context5.finish(20);

              case 28:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[5, 16, 20, 28], [21,, 23, 27]]);
      }));

      function clear() {
        return ref.apply(this, arguments);
      }

      return clear;
    }()
  }]);

  return Collection;
}();

exports.default = Collection;