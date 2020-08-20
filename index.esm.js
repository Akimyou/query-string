import strictUriEncode from 'strict-uri-encode';
import decodeComponent from 'decode-uri-component';
import splitOnFirst from 'split-on-first';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var queryString = createCommonjsModule(function (module, exports) {

  var isNullOrUndefined = function isNullOrUndefined(value) {
    return value === null || value === undefined;
  };

  function encoderForArrayFormat(options) {
    switch (options.arrayFormat) {
      case 'index':
        return function (key) {
          return function (result, value) {
            var index = result.length;

            if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
              return result;
            }

            if (value === null) {
              return [].concat(_toConsumableArray(result), [[encode(key, options), '[', index, ']'].join('')]);
            }

            return [].concat(_toConsumableArray(result), [[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')]);
          };
        };

      case 'bracket':
        return function (key) {
          return function (result, value) {
            if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
              return result;
            }

            if (value === null) {
              return [].concat(_toConsumableArray(result), [[encode(key, options), '[]'].join('')]);
            }

            return [].concat(_toConsumableArray(result), [[encode(key, options), '[]=', encode(value, options)].join('')]);
          };
        };

      case 'comma':
      case 'separator':
        return function (key) {
          return function (result, value) {
            if (value === null || value === undefined || value.length === 0) {
              return result;
            }

            if (result.length === 0) {
              return [[encode(key, options), '=', encode(value, options)].join('')];
            }

            return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
          };
        };

      default:
        return function (key) {
          return function (result, value) {
            if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
              return result;
            }

            if (value === null) {
              return [].concat(_toConsumableArray(result), [encode(key, options)]);
            }

            return [].concat(_toConsumableArray(result), [[encode(key, options), '=', encode(value, options)].join('')]);
          };
        };
    }
  }

  function parserForArrayFormat(options) {
    var result;

    switch (options.arrayFormat) {
      case 'index':
        return function (key, value, accumulator) {
          result = /\[(\d*)\]$/.exec(key);
          key = key.replace(/\[\d*\]$/, '');

          if (!result) {
            accumulator[key] = value;
            return;
          }

          if (accumulator[key] === undefined) {
            accumulator[key] = {};
          }

          accumulator[key][result[1]] = value;
        };

      case 'bracket':
        return function (key, value, accumulator) {
          result = /(\[\])$/.exec(key);
          key = key.replace(/\[\]$/, '');

          if (!result) {
            accumulator[key] = value;
            return;
          }

          if (accumulator[key] === undefined) {
            accumulator[key] = [value];
            return;
          }

          accumulator[key] = [].concat(accumulator[key], value);
        };

      case 'comma':
      case 'separator':
        return function (key, value, accumulator) {
          var isArray = typeof value === 'string' && value.split('').indexOf(options.arrayFormatSeparator) > -1;
          var newValue = isArray ? value.split(options.arrayFormatSeparator).map(function (item) {
            return decode(item, options);
          }) : value === null ? value : decode(value, options);
          accumulator[key] = newValue;
        };

      default:
        return function (key, value, accumulator) {
          if (accumulator[key] === undefined) {
            accumulator[key] = value;
            return;
          }

          accumulator[key] = [].concat(accumulator[key], value);
        };
    }
  }

  function validateArrayFormatSeparator(value) {
    if (typeof value !== 'string' || value.length !== 1) {
      throw new TypeError('arrayFormatSeparator must be single character string');
    }
  }

  function encode(value, options) {
    if (options.encode) {
      return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
    }

    return value;
  }

  function decode(value, options) {
    if (options.decode) {
      return decodeComponent(value);
    }

    return value;
  }

  function keysSorter(input) {
    if (Array.isArray(input)) {
      return input.sort();
    }

    if (_typeof(input) === 'object') {
      return keysSorter(Object.keys(input)).sort(function (a, b) {
        return Number(a) - Number(b);
      }).map(function (key) {
        return input[key];
      });
    }

    return input;
  }

  function removeHash(input) {
    var hashStart = input.indexOf('#');

    if (hashStart !== -1) {
      input = input.slice(0, hashStart);
    }

    return input;
  }

  function getHash(url) {
    var hash = '';
    var hashStart = url.indexOf('#');

    if (hashStart !== -1) {
      hash = url.slice(hashStart);
    }

    return hash;
  }

  function extract(input) {
    input = removeHash(input);
    var queryStart = input.indexOf('?');

    if (queryStart === -1) {
      return '';
    }

    return input.slice(queryStart + 1);
  }

  function parseValue(value, options) {
    if (options.parseNumbers && !Number.isNaN(Number(value)) && typeof value === 'string' && value.trim() !== '') {
      value = Number(value);
    } else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
      value = value.toLowerCase() === 'true';
    }

    return value;
  }

  function parse(input, options) {
    options = Object.assign({
      decode: true,
      sort: true,
      arrayFormat: 'none',
      arrayFormatSeparator: ',',
      parseNumbers: false,
      parseBooleans: false
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    var formatter = parserForArrayFormat(options); // Create an object with no prototype

    var ret = Object.create(null);

    if (typeof input !== 'string') {
      return ret;
    }

    input = input.trim().replace(/^[?#&]/, '');

    if (!input) {
      return ret;
    }

    var _iterator = _createForOfIteratorHelper(input.split('&')),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var param = _step.value;

        var _splitOnFirst = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '='),
            _splitOnFirst2 = _slicedToArray(_splitOnFirst, 2),
            _key = _splitOnFirst2[0],
            _value = _splitOnFirst2[1]; // Missing `=` should be `null`:
        // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters


        _value = _value === undefined ? null : ['comma', 'separator'].includes(options.arrayFormat) ? _value : decode(_value, options);
        formatter(decode(_key, options), _value, ret);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    for (var _i = 0, _Object$keys = Object.keys(ret); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      var value = ret[key];

      if (_typeof(value) === 'object' && value !== null) {
        for (var _i2 = 0, _Object$keys2 = Object.keys(value); _i2 < _Object$keys2.length; _i2++) {
          var k = _Object$keys2[_i2];
          value[k] = parseValue(value[k], options);
        }
      } else {
        ret[key] = parseValue(value, options);
      }
    }

    if (options.sort === false) {
      return ret;
    }

    return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce(function (result, key) {
      var value = ret[key];

      if (Boolean(value) && _typeof(value) === 'object' && !Array.isArray(value)) {
        // Sort object keys, not values
        result[key] = keysSorter(value);
      } else {
        result[key] = value;
      }

      return result;
    }, Object.create(null));
  }

  exports.extract = extract;
  exports.parse = parse;

  exports.stringify = function (object, options) {
    if (!object) {
      return '';
    }

    options = Object.assign({
      encode: true,
      strict: true,
      arrayFormat: 'none',
      arrayFormatSeparator: ','
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);

    var shouldFilter = function shouldFilter(key) {
      return options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === '';
    };

    var formatter = encoderForArrayFormat(options);
    var objectCopy = {};

    for (var _i3 = 0, _Object$keys3 = Object.keys(object); _i3 < _Object$keys3.length; _i3++) {
      var key = _Object$keys3[_i3];

      if (!shouldFilter(key)) {
        objectCopy[key] = object[key];
      }
    }

    var keys = Object.keys(objectCopy);

    if (options.sort !== false) {
      keys.sort(options.sort);
    }

    return keys.map(function (key) {
      var value = object[key];

      if (value === undefined) {
        return '';
      }

      if (value === null) {
        return encode(key, options);
      }

      if (Array.isArray(value)) {
        return value.reduce(formatter(key), []).join('&');
      }

      return encode(key, options) + '=' + encode(value, options);
    }).filter(function (x) {
      return x.length > 0;
    }).join('&');
  };

  exports.parseUrl = function (input, options) {
    options = Object.assign({
      decode: true
    }, options);

    var _splitOnFirst3 = splitOnFirst(input, '#'),
        _splitOnFirst4 = _slicedToArray(_splitOnFirst3, 2),
        url = _splitOnFirst4[0],
        hash = _splitOnFirst4[1];

    return Object.assign({
      url: url.split('?')[0] || '',
      query: parse(extract(input), options)
    }, options && options.parseFragmentIdentifier && hash ? {
      fragmentIdentifier: decode(hash, options)
    } : {});
  };

  exports.stringifyUrl = function (input, options) {
    options = Object.assign({
      encode: true,
      strict: true
    }, options);
    var url = removeHash(input.url).split('?')[0] || '';
    var queryFromUrl = exports.extract(input.url);
    var parsedQueryFromUrl = exports.parse(queryFromUrl, {
      sort: false
    });
    var query = Object.assign(parsedQueryFromUrl, input.query);
    var queryString = exports.stringify(query, options);

    if (queryString) {
      queryString = "?".concat(queryString);
    }

    var hash = getHash(input.url);

    if (input.fragmentIdentifier) {
      hash = "#".concat(encode(input.fragmentIdentifier, options));
    }

    return "".concat(url).concat(queryString).concat(hash);
  };
});

export default queryString;
