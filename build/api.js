'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var api = (0, _koaRouter2.default)();

var validateCollection = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
    var collection;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            collection = ctx.params.collection;

            if (collection in ctx.collections) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', ctx.throw(404));

          case 3:
            _context.next = 5;
            return next();

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function validateCollection(_x, _x2) {
    return ref.apply(this, arguments);
  };
}();

var validateKey = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, next) {
    var authorization;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            authorization = ctx.request.headers.authorization;

            if (!(authorization !== ctx.authorizationHeader)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt('return', ctx.throw(401));

          case 3:
            _context2.next = 5;
            return next();

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function validateKey(_x3, _x4) {
    return ref.apply(this, arguments);
  };
}();

api.get('/:collection/:attribute/:value/count', validateKey, validateCollection, function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ctx, next) {
    var _ctx$params, collection, attribute, value, count;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ctx$params = ctx.params;
            collection = _ctx$params.collection;
            attribute = _ctx$params.attribute;
            value = _ctx$params.value;
            _context3.next = 6;
            return ctx.collections[collection].countBy(attribute, value);

          case 6:
            count = _context3.sent;


            ctx.body = {
              count: count
            };

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return ref.apply(this, arguments);
  };
}());

api.post('/:collection', validateKey, validateCollection, function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(ctx, next) {
    var collection, count;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            collection = ctx.params.collection;
            _context4.next = 3;
            return ctx.collections[collection].add(ctx.request.body);

          case 3:
            count = _context4.sent;


            ctx.status = 201;

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x7, _x8) {
    return ref.apply(this, arguments);
  };
}());

exports.default = api;