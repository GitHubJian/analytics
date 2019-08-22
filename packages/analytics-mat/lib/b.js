!(function(win, doc, analytics) {
  function importScript() {
    var script = doc.createElement('script')
    script.async = !0
    script.src = 'https://s0.meituan.net/bs/js/?f=mta-js:mta.min.js'
    var n = doc.getElementsByTagName('script')[0]
    n.parentNode.insertBefore(script, n)
  }

  '[object String]' === Object.prototype.toString.call(analytics) &&
    (analytics = [analytics])
  win.SogouAnalyticsObject = analytics

  for (var r = 0; r < analytics.length; r++) {
    !(function(t) {
      win[t] =
        win[t] ||
        function() {
          ;(win[t].q = win[t].q || []).push(arguments)
        }
    })(analytics[r])
  }

  if ('complete' === doc.readyState) {
    importScript()
  } else {
    if (win.addEventListener) {
      win.addEventListener('load', importScript, !1)
    } else if (window.attachEvent) {
      win.attachEvent('onload', importScript)
    } else {
      var load = win.onload
      win.onload = function() {
        importScript()
        load && load()
      }
    }
  }
})(window, document, 'mta')
;(function(win, XMLHttpRequest, analytics) {
  if (XMLHttpRequest && !('_mta' in XMLHttpRequest)) {
    XMLHttpRequest._mta = !0
    var protocol = win.location.protocol
    if ('file:' !== protocol) {
      var host = win.location.host,
        open = XMLHttpRequest.prototype.open,
        send = XMLHttpRequest.prototype.send

      XMLHttpRequest.prototype.open = function() {}
      XMLHttpRequest.prototype.send = function(t) {
        function handler(ctx, t) {
          if (0 !== ctx._url.indexOf(protocol + '//frep.meituan.net/_.gif')) {
            for (
              var i = 'browser.ajax',
                a = [98, 114, 111, 119, 115, 101, 114, 46, 97, 106, 97, 120],
                o = 0,
                l = i.length;
              l > o;
              o++
            )
              if (i.charCodeAt(o) !== a[o]) return

            var h
            if (ctx.response) {
              switch (ctx.responseType) {
                case 'json':
                  h = JSON && JSON.stringify(ctx.response).length
                  break
                case 'blob':
                case 'moz-blob':
                  h = ctx.response.size
                  break
                case 'arraybuffer':
                  h = ctx.response.byteLength
                  break
                case 'document':
                  h =
                    ctx.response.documentElement &&
                    ctx.response.documentElement.innerHTML &&
                    ctx.response.documentElement.innerHTML.length + 28
                  break
                default:
                  h = ctx.response.length
              }
            }

            win.mta('send', i, {
              url: ctx._url,
              method: ctx._method,
              error: !(
                o === ctx.status.toString().indexOf('2') || 304 === ctx.status
              ),
              responseTime: new Date().getTime() - ctx._startTime,
              requestSize: ctx._searchLength + (t ? t.length : 0),
              responseSize: h || 0
            })
          }
        }

        if ('addEventListener' in this) {
          var listener = function(e) {
            handler(this, e)
          }

          this.addEventListener('load', listener)
          this.addEventListener('error', listener)
          this.addEventListener('abort', listener)
        } else {
          var i = this.onreadystatechange
          this.onreadystatechange = function(t) {
            i && i.apply(this, arguments)
            4 === this.readyState && win.mta && handler(this, t)
          }
        }

        return send.apply(this, arguments)
      }
    }
  }
})(window, window.XMLHttpRequest, 'mta')

mta('create', '59918eb8616ab3217c7eeaf5')
