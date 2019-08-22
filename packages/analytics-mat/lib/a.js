/*
 * MTA v1.1.0
 * (c) 2014-2019
 * 美团点评 - 性能平台
 */
!(function() {
  'use strict'
  function u(t) {
    return (u =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function(t) {
            return typeof t
          }
        : function(t) {
            return t &&
              'function' == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          })(t)
  }
  function i(t, e) {
    if (!(t instanceof e))
      throw new TypeError('Cannot call a class as a function')
  }
  function r(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n]
      ;(r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        'value' in r && (r.writable = !0),
        Object.defineProperty(t, r.key, r)
    }
  }
  function t(t, e, n) {
    return e && r(t.prototype, e), n && r(t, n), t
  }
  function o(t, e, n) {
    return (
      e in t
        ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
          })
        : (t[e] = n),
      t
    )
  }
  function c(e) {
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
          o(e, t, n[t])
        })
    }
    return e
  }
  function f(t) {
    return (
      (function(t) {
        if (Array.isArray(t)) {
          for (var e = 0, n = new Array(t.length); e < t.length; e++)
            n[e] = t[e]
          return n
        }
      })(t) ||
      (function(t) {
        if (
          Symbol.iterator in Object(t) ||
          '[object Arguments]' === Object.prototype.toString.call(t)
        )
          return Array.from(t)
      })(t) ||
      (function() {
        throw new TypeError('Invalid attempt to spread non-iterable instance')
      })()
    )
  }
  var a = Array.prototype,
    e = Object.prototype,
    s = e.hasOwnProperty,
    n = e.toString,
    v = function(t) {
      return 'function' == typeof t
    },
    d = function(t) {
      return 'number' == typeof t
    }
  function l(t) {
    if ('undefined' != typeof JSON && v(JSON.stringify))
      return JSON.stringify(t)
    switch (u(t)) {
      case 'string':
        return '"'.concat(t, '"')
      case 'boolean':
      case 'number':
        return String(t)
      case 'object':
        if (null === t) return 'null'
        var e = !1,
          n = '',
          r = ''
        for (var i in t)
          if (s.call(t, i)) {
            r = "'".concat(i, "'")
            var o = l(t[i])
            o.length &&
              (e ? (n += ',') : (e = !0),
              (n += p(t) ? o : '"'.concat(r, '":').concat(o)))
          }
        return p(t) ? '['.concat(n, ']') : '{'.concat(n, '}')
      default:
        return ''
    }
  }
  function h(t) {
    if (v(Object.keys)) return Object.keys(t)
    var e = []
    for (var n in t) s.call(t, n) && e.push(n)
    return e
  }
  function p(t) {
    return v(Array.isArray) ? Array.isArray(t) : '[object Array]' === n.call(t)
  }
  function m(t, e, n) {
    if (v(a.map)) return t.map(e, n)
    for (var r = [], i = t.length, o = 0; o++ < i; )
      r.push(e.call(n, t[o], o, t))
    return r
  }
  function g(t, n) {
    if (v(a.forEach))
      t.forEach(function(t, e) {
        n(t, e)
      })
    else for (var e = t.length, r = 0; r++ < e; ) n(t[r], r)
  }
  function y(t, e, n) {
    if (v(a.filter)) return t.filter(e, n)
    for (var r = [], i = t.length, o = 0; o++ < i; )
      e.call(n, t[o], o, t) && r.push(t[o])
    return r
  }
  var w = {
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
        if (d(t) && d(e) && d(n))
          return (
            r.setDate(r.getDate() + parseInt(t, 10)),
            r.setHours(r.getHours() + parseInt(e, 10)),
            r.setMinutes(r.getMinutes() + parseInt(n, 10)),
            r.toUTCString()
          )
      }
    },
    b = {}
  var _ = {
    on: function(t, e) {
      v(e) && (b[t] || (b[t] = [])).push(e)
    },
    emit: function() {
      for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
        e[n] = arguments[n]
      var r = e[0],
        i = e.slice(1)
      if (b[r]) for (var o = 0; o < b[r].length; o++) b[r][o].apply(this, i)
    },
    addEvent: function(t, e) {
      var n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2]
      return window.addEventListener
        ? window.addEventListener(t, e, n)
        : window.attachEvent
        ? window.attachEvent('on'.concat(t), e)
        : void 0
    },
    removeEvent: function(t, e) {
      var n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2]
      return window.removeEventListener
        ? window.removeEventListener(t, e, n)
        : window.detachEvent
        ? window.detachEvent('on'.concat(t), e)
        : void 0
    }
  }
  function S(t, e) {
    return t <= 0 || e <= 0 || t - e <= 0 ? 0 : parseInt(t - e, 10)
  }
  var E = function() {
      var r =
          'undefined' != typeof window && window === this
            ? this
            : 'undefined' != typeof global && null != global
            ? global
            : this,
        e =
          'function' == typeof Object.defineProperties
            ? Object.defineProperty
            : function(t, e, n) {
                t != Array.prototype &&
                  t != Object.prototype &&
                  (t[e] = n.value)
              }
      function n() {
        ;(n = function() {}), r.Symbol || (r.Symbol = t)
      }
      var i = 0
      function t(t) {
        return 'jscomp_symbol_' + (t || '') + i++
      }
      function o() {
        n()
        var t = r.Symbol.iterator
        t || (t = r.Symbol.iterator = r.Symbol('iterator')),
          'function' != typeof Array.prototype[t] &&
            e(Array.prototype, t, {
              configurable: !0,
              writable: !0,
              value: function() {
                return a(this)
              }
            }),
          (o = function() {})
      }
      function a(t) {
        var e,
          n = 0
        return (
          (e = function() {
            return n < t.length
              ? {
                  done: !1,
                  value: t[n++]
                }
              : {
                  done: !0
                }
          }),
          o(),
          ((e = {
            next: e
          })[r.Symbol.iterator] = function() {
            return this
          }),
          e
        )
      }
      function l(t) {
        o()
        var e = t[Symbol.iterator]
        return e ? e.call(t) : a(t)
      }
      function h(t) {
        if (!(t instanceof Array)) {
          t = l(t)
          for (var e, n = []; !(e = t.next()).done; ) n.push(e.value)
          t = n
        }
        return t
      }
      var p = 0
      var m = 'img script iframe link audio video source'.split(' ')
      function v(t, e) {
        for (var n = (t = l(t)).next(); !n.done; n = t.next())
          if (
            ((n = n.value),
            e.includes(n.nodeName.toLowerCase()) || v(n.children, e))
          )
            return !0
        return !1
      }
      function g(t, e) {
        if (2 < t.length) return performance.now()
        for (var n = [], r = (e = l(e)).next(); !r.done; r = e.next())
          (r = r.value),
            n.push({
              timestamp: r.start,
              type: 'requestStart'
            }),
            n.push({
              timestamp: r.end,
              type: 'requestEnd'
            })
        for (r = (e = l(t)).next(); !r.done; r = e.next())
          n.push({
            timestamp: r.value,
            type: 'requestStart'
          })
        for (
          n.sort(function(t, e) {
            return t.timestamp - e.timestamp
          }),
            t = t.length,
            e = n.length - 1;
          0 <= e;
          e--
        )
          switch ((r = n[e]).type) {
            case 'requestStart':
              t--
              break
            case 'requestEnd':
              if (2 < ++t) return r.timestamp
              break
            default:
              throw Error('Internal Error: This should never happen')
          }
        return 0
      }
      function s(t) {
        ;(t = t || {}),
          (this.w = !!t.useMutationObserver),
          (this.u = t.minValue || null),
          (t = window.__tti && window.__tti.e)
        var i,
          o,
          a,
          s,
          u,
          c,
          f,
          r,
          n,
          e,
          d = window.__tti && window.__tti.o
        ;(this.a = t
          ? t.map(function(t) {
              return {
                start: t.startTime,
                end: t.startTime + t.duration
              }
            })
          : []),
          d && d.disconnect(),
          (this.b = []),
          (this.f = new Map()),
          (this.j = null),
          (this.v = -1 / 0),
          (this.i = !1),
          (this.h = this.c = this.s = null),
          (i = this.m.bind(this)),
          (o = this.l.bind(this)),
          (a = XMLHttpRequest.prototype.send),
          (s = p++),
          (XMLHttpRequest.prototype.send = function(t) {
            debugger
            for (var e = [], n = 0; n < arguments.length; ++n)
              e[n - 0] = arguments[n]
            var r = this
            return (
              i(s),
              this.addEventListener('readystatechange', function() {
                4 === r.readyState && o(s)
              }),
              a.apply(this, e)
            )
          }),
          (u = this.m.bind(this)),
          (c = this.l.bind(this)),
          (f = fetch),
          (fetch = function(t) {
            for (var i = [], e = 0; e < arguments.length; ++e)
              i[e - 0] = arguments[e]
            return new Promise(function(e, n) {
              var r = p++
              u(r),
                f.apply(null, [].concat(h(i))).then(
                  function(t) {
                    c(r), e(t)
                  },
                  function(t) {
                    c(t), n(t)
                  }
                )
            })
          }),
          ((r = this).c = new PerformanceObserver(function(t) {
            for (var e = (t = l(t.getEntries())).next(); !e.done; e = t.next())
              if (
                ('resource' === (e = e.value).entryType &&
                  (r.b.push({
                    start: e.fetchStart,
                    end: e.responseEnd
                  }),
                  y(r, g(r.g, r.b) + 5e3)),
                'longtask' === e.entryType)
              ) {
                var n = e.startTime + e.duration
                r.a.push({
                  start: e.startTime,
                  end: n
                }),
                  y(r, n + 5e3)
              }
          })),
          r.c.observe({
            entryTypes: ['longtask', 'resource']
          }),
          this.w &&
            (this.h = ((n = this.B.bind(this)),
            (e = new MutationObserver(function(t) {
              for (var e = (t = l(t)).next(); !e.done; e = t.next())
                'childList' == (e = e.value).type && v(e.addedNodes, m)
                  ? n(e)
                  : 'attributes' == e.type &&
                    m.includes(e.target.tagName.toLowerCase()) &&
                    n(e)
            })).observe(document, {
              attributes: !0,
              childList: !0,
              subtree: !0,
              attributeFilter: ['href', 'src']
            }),
            e))
      }
      function u(t) {
        t.i = !0
        var e = 0 < t.a.length ? t.a[t.a.length - 1].end : 0,
          n = g(t.g, t.b)
        y(t, Math.max(n + 5e3, e))
      }
      function y(o, t) {
        !o.i ||
          o.v > t ||
          (clearTimeout(o.j),
          (o.j = setTimeout(function() {
            var t = performance.timing.navigationStart,
              e = g(o.g, o.b)
            t =
              (window.a && window.a.A ? 1e3 * window.a.A().C - t : 0) ||
              performance.timing.domContentLoadedEventEnd - t
            if (o.u) var n = o.u
            else
              performance.timing.domContentLoadedEventEnd
                ? (n =
                    (n = performance.timing).domContentLoadedEventEnd -
                    n.navigationStart)
                : (n = null)
            var r = performance.now()
            null === n && y(o, Math.max(e + 5e3, r + 1e3))
            var i = o.a
            r - e < 5e3
              ? (e = null)
              : (e =
                  r - (e = i.length ? i[i.length - 1].end : t) < 5e3
                    ? null
                    : Math.max(e, n)),
              e &&
                (o.s(e),
                clearTimeout(o.j),
                (o.i = !1),
                o.c && o.c.disconnect(),
                o.h && o.h.disconnect()),
              y(o, performance.now() + 1e3)
          }, t - performance.now())),
          (o.v = t))
      }
      ;(s.prototype.getFirstConsistentlyInteractive = function() {
        var e = this
        return new Promise(function(t) {
          ;(e.s = t),
            'complete' == document.readyState
              ? u(e)
              : window.addEventListener('load', function() {
                  u(e)
                })
        })
      }),
        (s.prototype.m = function(t) {
          this.f.set(t, performance.now())
        }),
        (s.prototype.l = function(t) {
          this.f.delete(t)
        }),
        (s.prototype.B = function() {
          y(this, performance.now() + 5e3)
        }),
        r.Object.defineProperties(s.prototype, {
          g: {
            configurable: !0,
            enumerable: !0,
            get: function() {
              return [].concat(h(this.f.values()))
            }
          }
        })
      var c = {
        getFirstConsistentlyInteractive: function(t) {
          return (
            (t = t || {}),
            'PerformanceLongTaskTiming' in window
              ? new s(t).getFirstConsistentlyInteractive()
              : Promise.resolve(null)
          )
        }
      }
      return 'undefined' != typeof module && module.exports
        ? (module.exports = c)
        : 'function' == typeof define && define.amd
        ? define('ttiPolyfill', [], function() {
            return c
          })
        : c
    }.call(window),
    k = (function() {
      function e(t) {
        i(this, e), o(this, '_MAX_URL_LENGTH', 2083), (this.url = t)
      }
      return (
        t(e, [
          {
            key: 'config',
            value: function(t) {
              this.url = t
            }
          },
          {
            key: 'send',
            value: function(t) {
              debugger
              l(t).length && this._post(t)
            }
          },
          {
            key: '_sendByScript',
            value: function(t) {
              var e = document.createElement('script')
              ;(e.type = 'text/javascript'),
                (e.async = !0),
                (e.src = ''.concat(this.url, '?').concat(t))
              var n = document.getElementsByTagName('script')[0]
              n.parentNode && n.parentNode.insertBefore(e, n)
            }
          },
          {
            key: '_post',
            value: function(t) {
              !(function(t) {
                if ('file:' !== window.location.protocol) {
                  var e,
                    n = c(
                      {
                        method: 'GET',
                        async: !0
                      },
                      t
                    )
                  if (window.XDomainRequest)
                    try {
                      ;(e = new XMLHttpRequest()).open(n.method, n.url),
                        e.send(l(n.data))
                    } catch (t) {}
                  else if (
                    window.XMLHttpRequest &&
                    'withCredentials' in (e = new XMLHttpRequest())
                  )
                    try {
                      e.open(n.method, n.url, n.async)
                      e.setRequestHeader('Content-Type', 'text/plain')
                      e.send(l(n.data))
                    } catch (t) {}
                }
              })({
                url: this.url,
                method: 'POST',
                data: t
              })
            }
          }
        ]),
        e
      )
    })(),
    T = (function() {
      function r() {
        i(this, r), o(this, '_COOKIE_USER_TRACKING', '__mta')
        var t = window.screen,
          e = window.navigator,
          n = this._getViewport()
        ;(this.screen = t ? ''.concat(t.width, 'x').concat(t.height) : '-'),
          (this.viewport = ''.concat(n.width, 'x').concat(n.height)),
          (this.javaEnabled = e && e.javaEnabled() ? 1 : 0),
          (this.ua = e.userAgent),
          (this.isFirstVisit = !1),
          this._setCookie()
      }
      return (
        t(r, [
          {
            key: 'getInfo',
            value: function() {
              return {
                sr: this.screen,
                vp: this.viewport,
                csz: document.cookie ? document.cookie.length : 0,
                ua: this.ua,
                uuid: this.uuid
              }
            }
          },
          {
            key: '_setCookie',
            value: function() {
              var t = w.getExpire(720, 0, 0),
                e = this._getCurrentTime(),
                n = w.get(this._COOKIE_USER_TRACKING)
              if (n) {
                var r = n.split('.')
                ;(r[2] = r[3]),
                  (r[3] = String(e)),
                  (r[4] = String(parseInt(r[4], 10) + 1)),
                  w.set(this._COOKIE_USER_TRACKING, r.join('.'), t),
                  (this.uuid = r[1])
              } else {
                var i = this._hashInfo()
                ;(n = [i, e, e, e, 1].join('.')),
                  w.set(this._COOKIE_USER_TRACKING, n, t),
                  (this.isFirstVisit = !0),
                  (this.uuid = String(i))
              }
            }
          },
          {
            key: '_getCurrentTime',
            value: function() {
              return new Date().getTime()
            }
          },
          {
            key: '_hashInfo',
            value: function() {
              for (
                var t = window,
                  e = t.navigator,
                  n = t.history.length,
                  r =
                    e.appName +
                    e.appVersion +
                    this._getEnvLanguage() +
                    e.platform +
                    e.userAgent +
                    this.javaEnabled +
                    this.screen +
                    (document.cookie ? document.cookie : '') +
                    (document.referrer ? document.referrer : ''),
                  i = r.length;
                0 < n;

              )
                r += n-- ^ i++
              return (function(t) {
                var e,
                  n = 1,
                  r = 0
                if (t)
                  for (n = 0, e = t.length - 1; 0 <= e; e--)
                    n =
                      0 !=
                      (r =
                        266338304 &
                        (n =
                          ((n << 6) & 268435455) +
                          (r = t.charCodeAt(e)) +
                          (r << 14)))
                        ? n ^ (r >> 21)
                        : n
                return n
              })(r)
            }
          },
          {
            key: '_getViewport',
            value: function() {
              var t = {
                width: (document.body && document.body.clientWidth) || 0,
                height: (document.body && document.body.clientHeight) || 0
              }
              return (
                null !== window.innerWidth &&
                  (t = {
                    width: window.innerWidth,
                    height: window.innerHeight
                  }),
                'CSS1Compat' === document.compatMode &&
                  (t = {
                    width:
                      (document.documentElement &&
                        document.documentElement.clientWidth) ||
                      0,
                    height:
                      (document.documentElement &&
                        document.documentElement.clientHeight) ||
                      0
                  }),
                t
              )
            }
          },
          {
            key: '_getEnvLanguage',
            value: function() {
              return (
                navigator &&
                (navigator.language
                  ? navigator.language
                  : navigator.browserLanguage
                  ? navigator.browserLanguage
                  : '-')
              ).toLowerCase()
            }
          }
        ]),
        r
      )
    })(),
    C = {
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
    },
    O = (function() {
      function s(t) {
        i(this, s),
          o(this, '_PERF_CATEGORY', 'fe_perf_web'),
          o(this, '_SEND_DELAY', 100),
          (this.trackerConfig = c(
            {
              useCombo: !0,
              sampleRate: 100,
              url: ''.concat(location.protocol, '//dreport.meituan.net')
            },
            t
          )),
          (this.client = new T()),
          (this.beacon = new k(this.trackerConfig.url)),
          (this._visitCode = this._random()),
          (this._queue = []),
          (this._tags = {})
      }
      return (
        t(
          s,
          [
            {
              key: 'create',
              value: function(t, e) {
                ;(this._app = t),
                  (this.trackerConfig = c({}, this.trackerConfig, e, {
                    sampleRate: 5
                  })),
                  this.send('resources')
              }
            },
            {
              key: 'config',
              value: function(t, e) {
                if (void 0 !== e)
                  switch (t) {
                    case 'sampleRate':
                      'number' == typeof e &&
                        (this.trackerConfig.sampleRate = e)
                      break
                    case 'useCombo':
                      'boolean' == typeof e && (this.trackerConfig.useCombo = e)
                      break
                    case 'beaconImage':
                      'string' == typeof e &&
                        -1 === e.indexOf('frep.meituan.') &&
                        this.beacon.config((this.trackerConfig.url = e))
                  }
              }
            },
            {
              key: 'tag',
              value: function(t, e) {
                'string' == typeof t &&
                  t.length &&
                  (void 0 !== u(e) ? (this._tags[t] = e) : delete this._tags[t])
              }
            },
            {
              key: 'execute',
              value: function() {
                for (
                  var t = arguments.length, e = new Array(t), n = 0;
                  n < t;
                  n++
                )
                  e[n] = arguments[n]
                for (var r = 0; r < e.length; r++)
                  try {
                    var i = e[r]
                    if (v(i)) e[r](this)
                    else {
                      var o = (i = [].slice.call(i, 0))[0]
                      this[C[o]].apply(this, i.slice(1))
                    }
                  } catch (t) {
                    t++
                  }
                return 0
              }
            },
            {
              key: 'push',
              value: function() {
                return this.execute.apply(this, arguments)
              }
            },
            {
              key: 'send',
              value: function(t, e, n, r) {
                var i = this
                if (
                  t &&
                  !(
                    -1 <
                    ['xhr-dispatch', 'xhr-result.load', 'browser.xhr'].indexOf(
                      t
                    )
                  )
                )
                  if ('resources' !== t) {
                    if (!(e && e.url && /catfront|dreport/.test(e.url))) {
                      var o = s.plugins[t]
                      o && ((e = o.data(e)), (r = o.type))
                      var a = {}
                      e && ((a[t] = e), this._push(r || 'timer', a, n)),
                        this._timer &&
                          (window.clearTimeout(this._timer),
                          (this._timer = null)),
                        (this._timer = window.setTimeout(function() {
                          i._sendData()
                        }, this._SEND_DELAY))
                    }
                  } else this._sendResources()
              }
            },
            {
              key: 'sendTiming',
              value: function(t, e, n) {
                this.send(t, e || 1, n, 'timer')
              }
            },
            {
              key: 'sendCount',
              value: function(t, e, n) {
                this.send(t, e || 1, n, 'counter')
              }
            },
            {
              key: 'sendGauge',
              value: function(t, e, n) {
                this.send(t, e || 1, n, 'gauge')
              }
            },
            {
              key: 'enable',
              value: function(t, e) {
                if (this._isSampleHit() && ('fcp' === t || 'tti' === t)) {
                  var r = this,
                    n = s.plugins[t]
                  if (n)
                    try {
                      n.data(e, function(t, e, n) {
                        r.sendTiming(t, e, n)
                      })
                    } catch (t) {}
                }
              }
            },
            {
              key: 'activate',
              value: function(t, e, n) {
                if (this._isSampleHit() && 'fps' === t) {
                  var r = this,
                    i = s.plugins.fps
                  if (i)
                    try {
                      ;(this._fps = i.data(e, n, function(t, e, n) {
                        r.sendTiming(t, e, n)
                      })),
                        this._fps.activate()
                    } catch (t) {}
                }
              }
            },
            {
              key: 'stop',
              value: function(t) {
                this._fps && 'fps' === t && this._fps.stop()
              }
            },
            {
              key: '_push',
              value: function(t, e, n) {
                this._queue.push({
                  type: t,
                  data: e,
                  tags: n || this._tags,
                  ts: String(new Date().valueOf())
                })
              }
            },
            {
              key: '_on',
              value: function(t, e) {
                _.on(t, e)
              }
            },
            {
              key: '_sendResources',
              value: function() {
                if (!(0.1 < Math.random())) {
                  var t = s.plugins.resources
                  if (t)
                    try {
                      var e = t.data()
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
            },
            {
              key: '_sendData',
              value: function() {
                var n = this
                if (this._isSampleHit()) {
                  var t = this.trackerConfig.useCombo,
                    e = this.client.getInfo(),
                    r = c(
                      {
                        token: this._app,
                        url: location.href,
                        sdkVersion: '1.1.0'
                      },
                      e
                    ),
                    i = null,
                    o = []
                  if (this._queue.length) {
                    if (t)
                      1 === this._queue.length
                        ? (o = this._formatLogType(this._queue[0]))
                        : g(this._queue, function(t) {
                            var e
                            ;(e = o).push.apply(e, f(n._formatLogType(t)))
                          }),
                        (i = this._formatReportData(r, o)),
                        _.emit('data', i),
                        this.beacon.send(i)
                    else
                      for (var a = 0; a < this._queue.length; a++)
                        (i = this._formatReportData(
                          r,
                          this._formatLogType(this._queue[a])
                        )),
                          _.emit('data', i),
                          this.beacon.send(i)
                    this._queue = []
                  }
                }
              }
            },
            {
              key: '_formatLogType',
              value: function(t) {
                var e = t.data,
                  n = t.tags,
                  r = t.ts,
                  i = h(e)[0],
                  o = h(e[i]),
                  a = 'browser.ajax' === i,
                  s = y(o, function(t) {
                    return 'url' !== t && 'method' !== t
                  })
                return a
                  ? y(
                      m(s, function(t) {
                        return {
                          ts: r,
                          type: ''.concat(i, '.').concat(t),
                          value: String(Number(e[i][t])),
                          tags: c(
                            {
                              url: e[i].url,
                              method: e[i].method.toUpperCase()
                            },
                            n
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
                  ? m(o, function(t) {
                      return {
                        type: ''.concat(i, '.').concat(t),
                        value: e[i][t],
                        tags: n,
                        ts: r
                      }
                    })
                  : [
                      {
                        type: i,
                        value: e[i],
                        tags: n,
                        ts: r
                      }
                    ]
              }
            },
            {
              key: '_formatReportData',
              value: function(e, t) {
                var n = {
                  category: this._PERF_CATEGORY,
                  logs: t,
                  env: {}
                }
                return (
                  g(h(e), function(t) {
                    n.env[t] = e[t]
                  }),
                  [n]
                )
              }
            },
            {
              key: '_random',
              value: function() {
                return Math.round(2147483647 * Math.random())
              }
            },
            {
              key: '_isSampleHit',
              value: function() {
                return (
                  this._visitCode % 1e4 < 100 * this.trackerConfig.sampleRate
                )
              }
            }
          ],
          [
            {
              key: 'addPlugin',
              value: function(t, e) {
                if (!v(e.data))
                  throw new Error(
                    "Can't add plugin ".concat(
                      t,
                      '. The plugin object of data props should be'
                    ) + ' a function, but its type is '.concat(u(e.data))
                  )
                s.plugins[t] = e
              }
            }
          ]
        ),
        s
      )
    })()
  o(O, 'plugins', {})
  var P,
    L = function(t) {
      var e = window[t]
      if (v(e) && !(e.q && e.q.isInitialized && e.q.initialized())) {
        var n = new O(),
          r = e ? e.q : []
        ;(e.q = n), p(r) && n.execute.apply(n, r)
      }
    },
    x = {
      type: 'timer',
      data: function() {
        var t =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
          e = window.performance || window.mozPerformance
        if (e && e.timing && !(t <= 0)) {
          var n = t - e.timing.navigationStart
          if (!(n <= 0)) return n
        }
      }
    },
    A = {
      type: 'timer',
      data: function(t) {
        var e =
            1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
          n = 2 < arguments.length ? arguments[2] : void 0,
          r = window.requestAnimationFrame
        if (v(r)) {
          var i = (t && t.duration) || 6e4,
            o = (t && t.maxCount) || null,
            a = 0,
            s = 0,
            u = null,
            c = null
          return {
            activate: function() {
              _.addEvent('blur', l),
                _.addEvent('focus', d),
                _.addEvent('visibilitychange', h),
                document.hasFocus() && (f(), m())
            },
            stop: p
          }
        }
        function f() {
          s++, (u = r(f))
        }
        function d() {
          ;(!o || a < o) && ((s = 0), f(), m())
        }
        function l() {
          u && cancelAnimationFrame(u), c && clearInterval(c)
        }
        function h() {
          document.hidden ? l() : d()
        }
        function p() {
          u && cancelAnimationFrame(u),
            c && clearInterval(c),
            _.removeEvent('blur', l),
            _.removeEvent('focus', d),
            _.removeEvent('visibilitychange', h)
        }
        function m() {
          c && clearInterval(c),
            (c = setInterval(function() {
              u && cancelAnimationFrame(u), a++
              try {
                n &&
                  n(
                    'browser.page',
                    {
                      fps: Math.min(60, s / (i / 1e3))
                    },
                    e
                  )
              } catch (t) {}
              ;(s = 0), o && o <= a ? p() : f()
            }, i))
        }
      }
    },
    I = {
      type: 'timer',
      data: function() {
        var t =
          window.performance ||
          window.mozPerformance ||
          window.msPerformance ||
          window.webkitPerformance
        if (t) {
          var e = t.timing,
            r = {
              redirect: S(e.fetchStart, e.navigationStart),
              dns: S(e.domainLookupEnd, e.domainLookupStart),
              connect: S(e.connectEnd, e.connectStart),
              network: S(e.connectEnd, e.navigationStart),
              send: S(e.responseStart, e.requestStart),
              receive: S(e.responseEnd, e.responseStart),
              backend: S(e.responseEnd, e.requestStart),
              render: S(e.loadEventEnd, e.loadEventStart),
              dom: S(e.domComplete, e.domLoading),
              frontend: S(e.loadEventEnd, e.domLoading),
              load: S(e.loadEventEnd, e.navigationStart),
              domReady: S(e.domContentLoadedEventStart, e.navigationStart),
              interactive: S(e.domInteractive, e.navigationStart),
              ttf: S(e.fetchStart, e.navigationStart),
              ttr: S(e.requestStart, e.navigationStart),
              ttdns: S(e.domainLookupStart, e.navigationStart),
              ttconnect: S(e.connectStart, e.navigationStart),
              ttfb: S(e.responseStart, e.navigationStart)
            }
          if (
            'object' === ('undefined' == typeof M ? 'undefined' : u(M)) &&
            M.subresources &&
            M.subresources.names &&
            void 0 !== window.SubResoucesTiming
          ) {
            var n = M.subresources.lastImage || '',
              i = M.subresources.firstImage || '',
              o = new window.SubResoucesTiming(M.subresources.names, n, i)
            o.length &&
              'fsImg' === o[o.length - 1].id &&
              ((r.atf = o[o.length - 1].start),
              (r.c_atf =
                o[o.length - 1].start - S(e.responseStart, e.navigationStart)))
          }
          try {
            t.getEntriesByType('paint').forEach(function(t, e, n) {
              'first-paint' === t.name && (r.firstPaint = t.startTime)
            })
          } catch (t) {}
          if (
            (!r.firstPaint &&
              e.msFirstPaint &&
              'number' == typeof e.msFirstPaint &&
              (r.firstPaint = S(e.msFirstPaint, e.navigationStart)),
            !r.firstPaint && window.chrome && window.chrome.loadTimes)
          ) {
            var a = window.chrome.loadTimes()
            r.firstPaint = Math.round(
              1e3 * (a.firstPaintTime - a.startLoadTime)
            )
          }
          return (
            ('number' != typeof r.firstPaint || r.firstPaint < 0) &&
              (r.firstPaint = void 0),
            'undefined' != typeof M &&
              M.TimeTracker &&
              M.TimeTracker.fst &&
              (r.firstScreen = S(M.TimeTracker.fst, e.navigationStart)),
            r
          )
        }
      }
    },
    j = function(e) {
      var n = {}
      return (
        g(h(e), function(t) {
          0 < e[t] && (n[t] = e[t])
        }),
        n
      )
    },
    R = {
      type: 'timer',
      data: function() {
        var t = window.performance || window.mozPerformance
        if (t && t.getEntriesByType) {
          for (
            var e = t.getEntriesByType('resource'), n = [], r = 0;
            r < e.length;
            r++
          ) {
            var i = e[r],
              o = ''.concat(i.name, '?'),
              a = {
                load: parseInt(i.duration, 10),
                redirect: S(i.redirectEnd, i.redirectStart),
                appcache: S(i.domainLookupStart, i.fetchStart),
                dns: S(i.domainLookupEnd, i.domainLookupStart),
                network: S(i.connectEnd, i.connectStart),
                send: S(i.requestStart, i.connectEnd),
                ttfb: S(i.responseStart, i.requestStart),
                receive: S(i.responseEnd, i.responseStart)
              }
            n.push({
              data: j(a),
              tags: {
                path: o.slice(0, o.indexOf('?')),
                type: i.initiatorType
              }
            })
          }
          return n
        }
      }
    },
    q = {
      type: 'timer',
      data: function() {
        var r =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          i = 1 < arguments.length ? arguments[1] : void 0,
          n =
            window.performance ||
            window.mozPerformance ||
            window.msPerformance ||
            window.webkitPerformance,
          o = 100,
          a = 20,
          s = null,
          u = 0
        n &&
          n.getEntriesByType &&
          (function t() {
            u++, s && (window.clearTimeout(s), (s = null))
            var e = n.getEntriesByType('paint')
            e && e.length
              ? e.forEach(function(t, e, n) {
                  'first-contentful-paint' === t.name &&
                    (function(t) {
                      try {
                        i &&
                          i(
                            'browser.page',
                            {
                              fcp: t
                            },
                            r
                          )
                      } catch (t) {}
                    })(t.startTime)
                })
              : u < a && (s = window.setTimeout(t, o))
          })()
      }
    },
    N = {
      type: 'timer',
      data: function() {
        var e =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          n = 1 < arguments.length ? arguments[1] : void 0
        E &&
          E.getFirstConsistentlyInteractive().then(function(t) {
            !(function(t) {
              try {
                n &&
                  n(
                    'browser.page',
                    {
                      tti: t
                    },
                    e
                  )
              } catch (t) {}
            })(t)
          })
      }
    }
  O.addPlugin('browser.page.business', x),
    O.addPlugin('fps', A),
    O.addPlugin('page', I),
    O.addPlugin('resources', R),
    O.addPlugin('fcp', q),
    O.addPlugin('tti', N),
    (P = function() {
      if (window.MeituanAnalyticsObject) {
        var t = window.MeituanAnalyticsObject
        '[object String]' === Object.prototype.toString.call(t) && (t = [t])
        for (var e = 0; e < t.length; e++) L(t[e])
      }
    }),
    'complete' === document.readyState ? P() : _.addEvent('load', P)
})()
