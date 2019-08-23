;(function() {
  var h =
      'undefined' != typeof window && window === this
        ? this
        : 'undefined' != typeof global && null != global
        ? global
        : this,
    k =
      'function' == typeof Object.defineProperties
        ? Object.defineProperty
        : function(a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value)
          }
  function l() {
    l = function() {}
    h.Symbol || (h.Symbol = m)
  }
  var n = 0
  function m(a) {
    return 'jscomp_symbol_' + (a || '') + n++
  }
  function p() {
    l()
    var a = h.Symbol.iterator
    a || (a = h.Symbol.iterator = h.Symbol('iterator'))
    'function' != typeof Array.prototype[a] &&
      k(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
          return q(this)
        }
      })
    p = function() {}
  }
  function q(a) {
    var b = 0
    return r(function() {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 }
    })
  }
  function r(a) {
    p()
    a = { next: a }
    a[h.Symbol.iterator] = function() {
      return this
    }
    return a
  }
  function t(a) {
    p()
    var b = a[Symbol.iterator]
    return b ? b.call(a) : q(a)
  }
  function u(a) {
    if (!(a instanceof Array)) {
      a = t(a)
      for (var b, c = []; !(b = a.next()).done; ) c.push(b.value)
      a = c
    }
    return a
  }
  var v = 0
  function w(a, b) {
    var c = XMLHttpRequest.prototype.send,
      d = v++
    XMLHttpRequest.prototype.send = function(f) {
      for (var e = [], g = 0; g < arguments.length; ++g) e[g - 0] = arguments[g]
      var E = this
      a(d)
      this.addEventListener('readystatechange', function() {
        4 === E.readyState && b(d)
      })
      return c.apply(this, e)
    }
  }
  function x(a, b) {
    var c = fetch
    fetch = function(d) {
      for (var f = [], e = 0; e < arguments.length; ++e) f[e - 0] = arguments[e]
      return new Promise(function(d, e) {
        var g = v++
        a(g)
        c.apply(null, [].concat(u(f))).then(
          function(a) {
            b(g)
            d(a)
          },
          function(a) {
            b(a)
            e(a)
          }
        )
      })
    }
  }
  var y = 'img script iframe link audio video source'.split(' ')
  function z(a, b) {
    a = t(a)
    for (var c = a.next(); !c.done; c = a.next())
      if (
        ((c = c.value),
        b.includes(c.nodeName.toLowerCase()) || z(c.children, b))
      )
        return !0
    return !1
  }
  function A(a) {
    var b = new MutationObserver(function(c) {
      c = t(c)
      for (var b = c.next(); !b.done; b = c.next())
        (b = b.value),
          'childList' == b.type && z(b.addedNodes, y)
            ? a(b)
            : 'attributes' == b.type &&
              y.includes(b.target.tagName.toLowerCase()) &&
              a(b)
    })
    b.observe(document, {
      attributes: !0,
      childList: !0,
      subtree: !0,
      attributeFilter: ['href', 'src']
    })
    return b
  }
  function B(a, b) {
    if (2 < a.length) return performance.now()
    var c = []
    b = t(b)
    for (var d = b.next(); !d.done; d = b.next())
      (d = d.value),
        c.push({ timestamp: d.start, type: 'requestStart' }),
        c.push({ timestamp: d.end, type: 'requestEnd' })
    b = t(a)
    for (d = b.next(); !d.done; d = b.next())
      c.push({ timestamp: d.value, type: 'requestStart' })
    c.sort(function(a, b) {
      return a.timestamp - b.timestamp
    })
    a = a.length
    for (b = c.length - 1; 0 <= b; b--)
      switch (((d = c[b]), d.type)) {
        case 'requestStart':
          a--
          break
        case 'requestEnd':
          a++
          if (2 < a) return d.timestamp
          break
        default:
          throw Error('Internal Error: This should never happen')
      }
    return 0
  }
  function C(a) {
    a = a ? a : {}
    this.w = !!a.useMutationObserver
    this.u = a.minValue || null
    a = window.__tti && window.__tti.e
    var b = window.__tti && window.__tti.o
    this.a = a
      ? a.map(function(a) {
          return { start: a.startTime, end: a.startTime + a.duration }
        })
      : []
    b && b.disconnect()
    this.b = []
    this.f = new Map()
    this.j = null
    this.v = -Infinity
    this.i = !1
    this.h = this.c = this.s = null
    w(this.m.bind(this), this.l.bind(this))
    x(this.m.bind(this), this.l.bind(this))
    D(this)
    this.w && (this.h = A(this.B.bind(this)))
  }
  C.prototype.getFirstConsistentlyInteractive = function() {
    var a = this
    return new Promise(function(b) {
      a.s = b
      'complete' == document.readyState
        ? F(a)
        : window.addEventListener('load', function() {
            F(a)
          })
    })
  }
  function F(a) {
    a.i = !0
    var b = 0 < a.a.length ? a.a[a.a.length - 1].end : 0,
      c = B(a.g, a.b)
    G(a, Math.max(c + 5e3, b))
  }
  function G(a, b) {
    !a.i ||
      a.v > b ||
      (clearTimeout(a.j),
      (a.j = setTimeout(function() {
        var b = performance.timing.navigationStart,
          d = B(a.g, a.b),
          b =
            (window.a && window.a.A ? 1e3 * window.a.A().C - b : 0) ||
            performance.timing.domContentLoadedEventEnd - b
        if (a.u) var f = a.u
        else
          performance.timing.domContentLoadedEventEnd
            ? ((f = performance.timing),
              (f = f.domContentLoadedEventEnd - f.navigationStart))
            : (f = null)
        var e = performance.now()
        null === f && G(a, Math.max(d + 5e3, e + 1e3))
        var g = a.a
        5e3 > e - d
          ? (d = null)
          : ((d = g.length ? g[g.length - 1].end : b),
            (d = 5e3 > e - d ? null : Math.max(d, f)))
        d &&
          (a.s(d),
          clearTimeout(a.j),
          (a.i = !1),
          a.c && a.c.disconnect(),
          a.h && a.h.disconnect())
        G(a, performance.now() + 1e3)
      }, b - performance.now())),
      (a.v = b))
  }
  function D(a) {
    a.c = new PerformanceObserver(function(b) {
      b = t(b.getEntries())
      for (var c = b.next(); !c.done; c = b.next())
        if (
          ((c = c.value),
          'resource' === c.entryType &&
            (a.b.push({ start: c.fetchStart, end: c.responseEnd }),
            G(a, B(a.g, a.b) + 5e3)),
          'longtask' === c.entryType)
        ) {
          var d = c.startTime + c.duration
          a.a.push({ start: c.startTime, end: d })
          G(a, d + 5e3)
        }
    })
    a.c.observe({ entryTypes: ['longtask', 'resource'] })
  }
  C.prototype.m = function(a) {
    this.f.set(a, performance.now())
  }
  C.prototype.l = function(a) {
    this.f.delete(a)
  }
  C.prototype.B = function() {
    G(this, performance.now() + 5e3)
  }
  h.Object.defineProperties(C.prototype, {
    g: {
      configurable: !0,
      enumerable: !0,
      get: function() {
        return [].concat(u(this.f.values()))
      }
    }
  })
  var H = {
    getFirstConsistentlyInteractive: function(a) {
      a = a ? a : {}
      return 'PerformanceLongTaskTiming' in window
        ? new C(a).getFirstConsistentlyInteractive()
        : Promise.resolve(null)
    }
  }
  'undefined' != typeof module && module.exports
    ? (module.exports = H)
    : 'function' === typeof define && define.amd
    ? define('ttiPolyfill', [], function() {
        return H
      })
    : (window.ttiPolyfill = H)
})()

/* ---------------------- 华丽分割线 ---------------------- */

// 类型，检测 Symbol
function type(t) {
  return (type =
    'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator
      ? function(t) {
          return typeof t
        }
      : function(t) {
          return t &&
            'function' === typeof Symbol &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? 'symbol'
            : typeof t
        })(t)
}

// 实例
function checkInstanceOf(instance, proto) {
  if (!(instance instanceof proto)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

// 扩展
function extending(object, list) {
  for (var i = 0; i < list.length; i++) {
    var r = list[i]

    r.enumerable = r.enumerable || !1
    r.configurable = !0
    'value' in r && (r.writable = !0)
    Object.defineProperty(object, r.key, r)
  }
}

// 扩展属性
function inherits(object, props, staticProps) {
  props && extending(object.prototype, props)
  staticProps && extending(object, staticProps)

  return object
}

// 赋值
function assignment(object, key, value) {
  key in object
    ? Object.defineProperty(object, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      })
    : (object[key] = value)

  return object
}

// Object.assign
function assigned(target) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {},
      r = Object.keys(n)
    'function' == typeof Object.getOwnPropertySymbols &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function(t) {
          return Object.getOwnPropertyDescriptor(n, t).enumerable
        })
      )),
      r.forEach(function(t) {
        assignment(target, t, n[t])
      })
  }

  return target
}

// 可用扩展符
function checkSpread(t) {
  return (
    (function(t) {
      if (Array.isArray(t)) {
        for (var e = 0, n = new Array(t.length); e < t.length; e++) {
          n[e] = t[e]
        }

        return n
      }
    })(t) ||
    (function(t) {
      if (
        Symbol.iterator in Object(t) ||
        '[object Arguments]' === Object.prototype.toString.call(t)
      ) {
        return Array.from(t)
      }
    })(t) ||
    function() {
      throw new TypeError('Invalid attempt to spread non-iterable instance')
    }
  )
}

//  方法
var _arrayProp = Array.prototype
var _objProp = Object.prototype
var hasOwn = _objProp.hasOwnProperty
var toString = _objProp.toString

function isFunction(v) {
  return 'function' === typeof v
}

function isNumber(t) {
  return 'number' === typeof t
}

function isArray(v) {
  return isFunction(Array.isArray)
    ? Array.isArray(v)
    : '[object Array]' === toString.call(v)
}

// JSON.stringify
function stringify(t) {
  return JSON.stringify(t)
}

// Object.keys
function keys(o) {
  if (isFunction(Object.keys)) return Object.keys(o)

  var e = []
  for (var n in o) hasOwn.call(o, n) && e.push(n)
  return e
}

// Array.prototype.map
function map(t, callback, thisArg) {
  if (isFunction(_arrayProp.map)) return t.map(callback, thisArg)

  for (var r = [], i = t.length, o = 0; o < i; o++)
    r.push(callback.call(thisArg, t[o], o, t))

  return r
}

// Array.prototype.forEach
function forEach(t, callback) {
  if (isFunction(_arrayProp.forEach))
    t.forEach(function(t, e) {
      callback(t, e)
    })
  else for (var e = t.length, r = 0; r++ < e; ) callback(t[r], r)
}

// Array.prototype.filter
function filter(t, callback, thisArg) {
  if (isFunction(_arrayProp.filter)) return t.filter(callback, thisArg)

  for (var r = [], i = t.length, o = 0; o++ < i; )
    callback.call(thisArg, t[o], o, t) && r.push(t[o])

  return r
}

// cookie
var Cookie = {
  get: function(t) {
    for (
      var e = document.cookie,
        n = ''.concat(t, '='),
        r = n.length,
        i = e.length,
        o = 0;
      o < i;

    ) {
      var a = o + r
      if (e.substring(o, a) === n)
        return (
          (s = a),
          (c = u = void 0),
          (u = document.cookie),
          -1 === (c = u.indexOf(';', s)) && (c = u.length),
          decodeURIComponent(u.substring(s, c))
        )
      if (0 === (o = e.indexOf(' ', o) + 1)) break
    }
    var s, u, c
    return ''
  },
  set: function(t, e, n, r, i, o) {
    i =
      i ||
      ((a = document.domain),
      'localhost:' === a
        ? ''
        : ('undefined' != typeof M &&
            M.DOMAIN_HOST &&
            (a = '.'.concat(M.DOMAIN_HOST)),
          'www.' === a && (a = a.substring(0, 4)),
          a))
    var a
    var s =
      (r ? '; path='.concat(r) : '') +
      (i ? '; domain='.concat(i) : '') +
      (o ? '; secure' : '')
    document.cookie = e
      ? ''.concat(t, '=').concat(encodeURIComponent(String(e))) +
        (n ? '; expires='.concat(n) : '') +
        s
      : ''.concat(t, '=; expires=Thu, 01 Jan 1970 00:00:01 GMT') +
        (r ? '; path='.concat(r) : '') +
        s
  },
  getExpire: function(t, e, n) {
    var r = new Date()
    if (isNumber(t) && isNumber(e) && isNumber(n))
      return (
        r.setDate(r.getDate() + parseInt(t, 10)),
        r.setHours(r.getHours() + parseInt(e, 10)),
        r.setMinutes(r.getMinutes() + parseInt(n, 10)),
        r.toUTCString()
      )
  }
}

// event
var events = {}
var EventEmitter = {
  on: function(e, handler) {
    isFunction(handler) && (events[e] || (events[e] = [])).push(handler)
  },
  emit: function() {
    var t = arguments.length,
      args = new Array(t),
      n = 0
    for (; n < t; n++) {
      args[n] = arguments[n]
    }

    var e = args[0],
      rest = args.slice(1)

    if (events[e]) {
      for (var o = 0; o < events[e].length; o++) {
        events[e][o].apply(this, rest)
      }
    }
  },
  addEvent: function(type, listener) {
    var useCapture =
      2 < arguments.length && void 0 !== arguments[2] && arguments[2]

    return window.addEventListener
      ? window.addEventListener(type, listener, useCapture)
      : window.detachEvent
      ? window.detachEvent('on'.concat(type), listener)
      : void 0
  },
  removeEvent: function(type, listener) {
    var useCapture =
      2 < arguments.length && void 0 !== arguments[2] && arguments[2]

    return window.removeEventListener
      ? window.removeEventListener(type, listener, useCapture)
      : window.detachEvent
      ? window.detachEvent('on'.concat(type), listener)
      : void 0
  }
}

// 差值
function dvalue(t, e) {
  return t <= 0 || e <= 0 || t - e <= 0 ? 0 : parseInt(t - e, 10)
}

function Beacon(url) {
  this._MAX_URL_LENGTH = 2083
  this.url = url
}

Beacon.prototype.config = function(url) {
  this.url = url
}

Beacon.prototype.send = function(t) {
  debugger
  stringify(t).length && this._post(t)
}

Beacon.prototype._sendByScript = function(t) {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = !0
  script.src = ''.concat(this.url, '?').concat(t)

  var n = document.getElementsByTagName('script')[0]
  n.parentNode && n.parentNode.insertBefore(script, n)
}

Beacon.prototype._post = function(data) {
  !(function(config) {
    if ('file:' !== window.location.protocol) {
      var xml,
        config = assigned(
          {
            method: 'GET',
            async: !0
          },
          config
        )
      if (window.XDomainRequest) {
        try {
          xml = new XMLHttpRequest()
          xml.open(config.method, config.url)
          xml.send(stringify(config.data))
        } catch (t) {}
      } else if (
        window.XMLHttpRequest &&
        'withCredentials' in (xml = new XMLHttpRequest())
      ) {
        try {
          debugger
          xml.open(config.method, config.url, config.async)
          xml.setRequestHeader('Content-Type', 'text/plain')
          xml.send(stringify(config.data))
        } catch (t) {}
      }
    }
  })({
    url: this.url,
    method: 'POST',
    data: data
  })
}

function Client() {
  this._COOKIE_USER_TRACKING = '__mta'
  var screen = window.screen,
    navigator = window.navigator,
    viewport = this._getViewport()

  this.screen = screen
    ? ''.concat(screen.width, 'x').concat(screen.height)
    : '-'
  this.viewport = ''.concat(viewport.width, 'x').concat(viewport.height)
  this.javaEnabled = navigator && navigator.javaEnabled() ? 1 : 0
  this.ua = navigator.userAgent
  this.isFirstVisit = !1
  this._setCookie()
}

Client.prototype.getInfo = function() {
  return {
    sr: this.screen,
    vp: this.viewport,
    csz: document.cookie ? document.cookie.length : 0,
    ua: this.ua,
    uuid: this.uuid
  }
}

Client.prototype._setCookie = function() {
  var t = Cookie.getExpire(720, 0, 0),
    now = this._getCurrentTime(),
    userTrackingCookie = Cookie.get(this._COOKIE_USER_TRACKING)

  if (userTrackingCookie) {
    var r = userTrackingCookie.split('.')
    r[2] = r[3]
    r[3] = String(now)
    r[4] = String(parseInt(r[4], 10) + 1)
    Cookie.set(this._COOKIE_USER_TRACKING, r.join('.'), t)
    this.uuid = r[1]
  } else {
    var i = this._hasInfo()
    userTrackingCookie = [i, now, now, now, 1].join('.')
    Cookie.set(this._COOKIE_USER_TRACKING, userTrackingCookie, t)
    this.isFirstVisit = !0
    this.uuid = String(i)
  }
}

Client.prototype._getCurrentTime = function() {
  return new Date().getTime()
}

Client.prototype._hasInfo = function() {
  var win = window,
    navigator = win.navigator,
    historyLength = win.history.length,
    r =
      navigator.appName +
      navigator.appVersion +
      this._getEnvLanguage() +
      navigator.platform +
      navigator.userAgent +
      this.javaEnabled +
      this.screen +
      (document.cookie ? document : '') +
      (document.referrer ? document.referrer : ''),
    i = r.length

  for (; 0 < historyLength; ) r += historyLength-- ^ i++

  return (function(t) {
    var e,
      n = 1,
      r = 0
    if (t)
      for (n = 0, e = t.length - 1; 0 <= e; e--)
        n =
          0 !=
          (r =
            266338304 &&
            (n = ((n << 6) & 268435455) + (r = t.charCodeAt(e)) + (r << 14)))
            ? n ^ (r >> 21)
            : n
  })(r)
}

Client.prototype._getViewport = function() {
  var t = {
    width: (document.body && document.body.clientWidth) || 0,
    height: (document.body && document.body.clientHeight) || 0
  }

  null !== window.innerWidth &&
    (t = { width: window.innerWidth, height: window.innerHeight })

  'CSS1Compat' === document.compatMode &&
    (t = {
      width:
        (document.documentElement && document.documentElement.clientWidth) || 0,
      height:
        (document.documentElement && document.documentElement.clientHeight) || 0
    })

  return t
}

Client.prototype._getEnvLanguage = function() {
  return (
    navigator &&
    (navigator.language
      ? navigator.language
      : navigator.browserLanguage
      ? navigator.browserLanguage
      : '-')
  )
}

var alias = {
  activate: 'activate',
  create: 'create',
  config: 'config',
  tag: 'tag',
  timing: 'sendTiming',
  count: 'sendCount',
  gauge: 'sendGauge',
  send: 'send',
  stop: 'stop',
  on: '_on',
  enable: 'enable'
}

function Mta(config) {
  this._PERF_CATEGORY = 'fe_perf_web'
  this._SEND_DELAY = 100
  this.trackerConfig = assigned(
    {
      useCombo: !0,
      sampleRate: 100,
      url: location.protocol + '//dreport.meituan.net'
    },
    config
  )
  this.client = new Client()
  this.beacon = new Beacon(this.trackerConfig.url)
  this._visitCode = this._random()
  this._queue = []
  this._tags = {}
}

Mta.prototype.create = function(app, config) {
  this._app = app
  this.trackerConfig = assigned({}, this.trackerConfig, config, {
    sampleRate: 5
  })
  this.send('resources')
}

Mta.prototype.config = function(key, value) {
  if (void 0 !== value) {
    switch (key) {
      case 'sampleRate':
        'number' == typeof value && (this.trackerConfig.sampleRate = value)
        break
      case 'useCombo':
        'boolean' == typeof value && (this.trackerConfig.useCombo = value)
        break
      case 'beaconImage':
        'string' == typeof value &&
          -1 === value.indexOf('frep.meituan.') &&
          this.beacon.config((this.trackerConfig.url = value))
        break
    }
  }
}

Mta.prototype.tag = function(key, value) {
  'string' == typeof key &&
    key.length &&
    (void 0 != type(value) ? (this._tags[key] = value) : delete this._tags[key])
}

Mta.prototype.execute = function() {
  var t = arguments.length,
    args = new Array(t),
    n = 0
  for (; n < t; n++) args[n] = arguments[n]

  for (var r = 0; r < args.length; r++)
    try {
      var i = args[r]
      if (isFunction(i)) args[r](this)
      else {
        var o = (i = [].slice.call(i, 0))[0]
        this[alias[o]].apply(this, i.slice(1))
      }
    } catch (t) {
      t++
    }

  return 0
}

Mta.prototype.push = function() {
  return this.execute.apply(this, arguments)
}

Mta.prototype.send = function(type, data, tags, pluginType) {
  var thisArg = this
  if (
    type &&
    !(-1 < ['xhr-dispatch', 'xhr-result.load', 'browser.xhr'].indexOf(type))
  ) {
    if ('resources' !== type) {
      if (!(data && data.url && /catfront|dreport/.test(data.url))) {
        var plugin = Mta.plugins[type]
        plugin && ((data = plugin.data(data)), (pluginType = plugin.type))

        var a = {}
        data && ((a[type] = data), this._push(pluginType || 'timer', a, tags))

        this._timer && (window.clearTimeout(this._timer), (this._timer = null))

        this._timer = window.setTimeout(function() {
          thisArg._sendData()
        }, this._SEND_DELAY)
      }
    } else {
      this._sendResources()
    }
  }
}

Mta.prototype.sendTiming = function(type, data, tags) {
  this.send(type, data || 1, tags, 'timer')
}

Mta.prototype.sendCount = function(type, data, tags) {
  this.send(type, data || 1, tags, 'counter')
}

Mta.prototype.sendGauge = function(type, data, tags) {
  this.send(type, data || 1, tags, 'gauge')
}

Mta.prototype.enable = function(type, data) {
  if (this._isSampleHit() && ('fcp' === type || 'tti' === type)) {
    var thisArg = this,
      plugin = s.plugins[type]

    if (n) {
      try {
        plugin.data(data, function(type, data, tags) {
          thisArg.sendTiming(type, data, tags)
        })
      } catch (t) {}
    }
  }
}

Mta.prototype.activate = function(type, data, tags) {
  if (this._isSampleHit() && 'fps' === type) {
    var thisArg = this,
      plugin = s.plugins.fps

    if (plugin) {
      try {
        this._fps = plugin.data(data, tags, function(type, data, tags) {
          thisArg.sendTiming(type, data, tags)
        })
        this._fps.activate()
      } catch (t) {}
    }
  }
}

Mta.prototype.stop = function(type) {
  this._fps && 'fps' === type && this._fps.stop()
}

Mta.prototype._push = function(type, data, tags) {
  this._queue.push({
    type: type,
    data: data,
    tags: tags || this._tags,
    ts: String(new Date().valueOf())
  })
}

Mta.prototype._on = function(e, handler) {
  EventEmitter.on(e, handler)
}

Mta.prototype._sendResources = function() {
  if (!(0.1 < Math.random())) {
    var plugin = s.plugins.resources
    if (plugin) {
      try {
        var e = plugin.data()
        if (!e) return
        for (var n = 0; n < e.length; n++) {
          var r = e[n]
          this.sendTiming('browser.resource', r.data, r.tags)
        }
      } catch (t) {
        console.error(t)
      }
    }
  }
}

Mta.prototype._sendData = function() {
  var thisArg = this
  debugger
  if (this._isSampleHit()) {
    var useCombo = this.trackerConfig.useCombo,
      clientInfo = this.client.getInfo(),
      r = assigned(
        {
          token: this._app,
          url: location.href,
          sdkVersion: '1.1.0'
        },
        clientInfo
      ),
      i = null,
      o = []

    if (this._queue.length) {
      if (useCombo) {
        if (1 === this._queue.length) {
          o = this._formatLogType(this._queue[0])
        } else {
          forEach(this._queue, function(t) {
            var e
            ;(e = o).push.apply(e, checkSpread(thisArg._formatLogType(t)))
          })
        }

        i = this._formatReportData(r, o)
        EventEmitter.emit('data', i)
        this.beacon.send(i)
      } else {
        var a = 0
        for (; a < this._queue.length; a++) {
          i = this._formatReportData(r, this._formatLogType(this._queue[a]))
          EventEmitter.emit('data', i)
          this.beacon.send(i)
        }

        this._queue = []
      }
    }
  }
}

Mta.prototype._formatLogType = function(t) {
  var data = t.data,
    tags = t.tags,
    ts = t.ts,
    i = keys(data)[0],
    o = keys(data[i]),
    isBrowserAjax = 'browser.ajax' === i,
    s = filter(o, function(t) {
      return 'url' !== t && 'method' !== t
    })

  return isBrowserAjax
    ? filter(
        map(s, function(t) {
          return {
            ts: ts,
            type: i + '.' + t,
            value: String(Number(data[i][t])),
            tags: assigned(
              {
                url: data[i].url,
                method: data[i].method.toUpperCase()
              },
              tags
            )
          }
        }),
        function(t) {
          var e = t.type,
            n = t.value
          return !('browser.ajax.error' === e && '0' === n)
        }
      )
    : o.length
    ? map(o, function(t) {
        return {
          type: i + '.' + t,
          value: data[i][t],
          tags: tags,
          ts: ts
        }
      })
    : [
        {
          type: i,
          value: data[i],
          tags: tags,
          ts: ts
        }
      ]
}

Mta.prototype._formatReportData = function(env, logs) {
  var n = {
    category: this._PERF_CATEGORY,
    logs: logs,
    env: {}
  }

  forEach(keys(env), function(t) {
    n.env[t] = env[t]
  })

  return [n]
}

Mta.prototype._random = function() {
  return Math.round(2147483647 * Math.random())
}

Mta.prototype._isSampleHit = function() {
  return this._visitCode % 1e4 < 100 * this.trackerConfig.sampleRate
}

Mta.addPlugin = function(type, plugin) {
  if (!isFunction(plugin.data)) {
    throw new Error(
      "Can't add plugin " +
        type +
        '. The plugin object of data props should be a function, but its type is ' +
        type(plugin.data)
    )
  }

  Mta.plugins[type] = plugin
}

Mta.plugins = {}

var business = {
  type: 'timer',
  data: function() {
    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
      performance = window.performance || window.mozPerformance
    if (performance && performance.timing && !(t <= 0)) {
      var n = t - performance.timing.navigationStart

      if (!(n <= 0)) return n
    }
  }
}

var fps = {
  type: 'timer',
  data: function(t) {
    var data =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
      callback = 2 < arguments.length ? arguments[2] : void 0
    requestAnimationFrame = window.requestAnimationFrame

    if (isFunction(requestAnimationFrame)) {
      var duration = (t && t.duration) || 6e4,
        maxCount = (t && t.maxCount) || null,
        count = 0,
        s = 0,
        requestID = null,
        timer = null
      return {
        activate: function() {
          EventEmitter.addEvent('blur', blur)
          EventEmitter.addEvent('focus', focus)
          EventEmitter.addEvent('visibilitychange', visibilitychange)
          document.hasFocus() && (start(), recycle())
        },
        stop: stop
      }
    }

    function start() {
      s++
      requestID = requestAnimationFrame(start)
    }

    function focus() {
      ;(!maxCount || count < maxCount) && ((s = 0), start(), recycle())
    }

    function blur() {
      requestID && window.cancelAnimationFrame(requestID)
      timer && clearInterval(timer)
    }

    function visibilitychange() {
      document.hidden ? blur() : focus()
    }

    function stop() {
      requestID && window.cancelAnimationFrame(requestID)
      timer && clearInterval(timer)
      EventEmitter.removeEvent('blur', blur)
      EventEmitter.removeEvent('focus', focus)
      EventEmitter.removeEvent('visibilitychange', visibilitychange)
    }

    function recycle() {
      timer && clearInterval(timer)
      timer = setInterval(function() {
        requestID && window.cancelAnimationFrame(requestID), count++
        try {
          callback &&
            callback(
              'browser.page',
              {
                fps: Math.min(60, s / (duration / 1e3))
              },
              data
            )
        } catch (t) {}
        s = 0
        maxCount && maxCount <= count ? stop() : start()
      }, duration)
    }
  }
}

var page = {
  type: 'timer',
  data: function() {
    var performance =
      window.performance ||
      window.mozPerformance ||
      window.msPerformance ||
      window.webkitPerformance

    if (performance) {
      var e = performance.timing,
        r = {
          redirect: dvalue(e.fetchStart, e.navigationStart),
          dns: dvalue(e.domainLookupEnd, e.domainLookupStart),
          connect: dvalue(e.connectEnd, e.connectStart),
          network: dvalue(e.connectEnd, e.navigationStart),
          send: dvalue(e.responseStart, e.requestStart),
          receive: dvalue(e.responseEnd, e.responseStart),
          backend: dvalue(e.responseEnd, e.requestStart),
          render: dvalue(e.loadEventEnd, e.loadEventStart),
          dom: dvalue(e.domComplete, e.domLoading),
          frontend: dvalue(e.loadEventEnd, e.domLoading),
          load: dvalue(e.loadEventEnd, e.navigationStart),
          domReady: dvalue(e.domContentLoadedEventStart, e.navigationStart),
          interactive: dvalue(e.domInteractive, e.navigationStart),
          ttf: dvalue(e.fetchStart, e.navigationStart),
          ttr: dvalue(e.requestStart, e.navigationStart),
          ttdns: dvalue(e.domainLookupStart, e.navigationStart),
          ttconnect: dvalue(e.connectStart, e.navigationStart),
          ttfb: dvalue(e.responseStart, e.navigationStart)
        }

      try {
        performance.getEntriesByType('paint').forEach(function(t, e, n) {
          'first-paint' === t.name && (r.firstPaint = t.startTime)
        })
      } catch (t) {}

      !r.firstPaint &&
        e.msFirstPaint &&
        'number' === typeof e.msFirstPaint &&
        (r.firstPaint = dvalue(e.msFirstPaint, e.navigationStart))

      if (!r.firstPaint && window.chrome && window.chrome.loadTimes) {
        var a = window.chrome.loadTimes()
        r.firstPaint = Math.round(1e3 * a.firstPaintTime - a.startLoadTime)
      }

      ;('number' !== typeof r.firstPaint || r.firstPaint < 0) &&
        (r.firstPaint = void 0)

      return r
    }
  }
}

function filterPositive(e) {
  var n = {}
  forEach(keys(e), function(t) {
    0 < e[t] && (n[t] = e[t])
  })

  return n
}

var resources = {
  type: 'timer',
  data: function() {
    var performance = window.performance || window.mozPerformance
    if (performance && performance.getEntriesByType) {
      var e = performance.getEntriesByType('resource'),
        n = [],
        r = 0
      for (; r < e.length; r++) {
        var i = e[r],
          o = ''.concat(i.name, '?'),
          a = {
            load: parseInt(i.duration, 10),
            redirect: dvalue(i.redirectEnd, i.redirectStart),
            appcache: dvalue(i.domainLookupStart, i.fetchStart),
            dns: dvalue(i.domainLookupEnd, i.domainLookupStart),
            network: dvalue(i.connectEnd, i.connectStart),
            send: dvalue(i.requestStart, i.connectEnd),
            ttfb: dvalue(i.responseStart, i.requestStart),
            receive: dvalue(i.responseEnd, i.responseStart)
          }

        n.push({
          data: filterPositive(a),
          tags: {
            path: o.slice(0, o.indexOf('?')),
            type: i.initiatorType
          }
        })
      }

      return n
    }
  }
}

// first-contentful-paint
var fcp = {
  type: 'timer',
  data: function() {
    var data =
        0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
      callback = 1 < arguments.length ? arguments[1] : void 0,
      performance =
        window.performance ||
        window.mozPerformance ||
        window.msPerformance ||
        window.webkitPerformance,
      delay = 100,
      a = 20,
      timer = null,
      u = 0

    if (performance && performance.getEntriesByType) {
      ;(function t() {
        u++
        timer && (window.clearTimeout(timer), (timer = null))
        var paint = performance.getEntriesByType('paint')
        if (paint && paint.length) {
          paint.forEach(function(t) {
            'first-contentful-paint' === t.name &&
              (function(t) {
                try {
                  callback &&
                    callback(
                      'browser.page',
                      {
                        fcp: t
                      },
                      data
                    )
                } catch (t) {}
              })(t.startTime)
          })
        } else {
          u < a && (timer = window.setTimeout(t, delay))
        }
      })()
    }
  }
}

var tti = {
  type: 'timer',
  data: function() {
    var data =
        0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
      callback = 1 < arguments.length ? arguments[1] : void 0

    ttiPolyfill &&
      ttiPolyfill.getFirstConsistentlyInteractive().then(function(t) {
        !(function(t) {
          try {
            callback &&
              callback(
                'browser.page',
                {
                  tti: t
                },
                data
              )
          } catch (t) {}
        })(t)
      })
  }
}

Mta.addPlugin('browser.page.business', business)
Mta.addPlugin('fps', fps)
Mta.addPlugin('page', page)
Mta.addPlugin('resources', resources)
Mta.addPlugin('fcp', fcp)
Mta.addPlugin('tti', tti)

function execute(t) {
  var e = window[t]
  if (isFunction(e) && !(e.q && e.q.isInitialized && e.q.isInitialized())) {
    var mta = new Mta(),
      queue = e ? e.q : []

    e.q = mta

    isArray(queue) && mta.execute.apply(mta, queue)
  }
}

function bootstrap() {
  if (window.SogouAnalyticsObject) {
    var t = window.SogouAnalyticsObject
    '[object String]' === Object.prototype.toString.call(t) && (t = [t])

    for (var e = 0; e < t.length; e++) execute(t[e])
  }
}

'complete' === document.readyState
  ? bootstrap()
  : EventEmitter.addEvent('load', bootstrap)
