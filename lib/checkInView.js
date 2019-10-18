/**
 * Check In View
 * @desc 检测某区域是否在视口，支持 Observer 监听函数
 * @author Feed Rocket
 * @options
 *  container -> 监听容器 default: document.body
 *  className -> 需要检测区域的类名
 *  rootMargin -> IntersectionObserver rootMargin
 *  checkLegalView -> 是否为合法区域
 *  viewHandler -> 已在视口中的处理函数
 *  viewedHandler -> viewHandler 回调
 *  threshold -> IntersectionObserver threshold
 *
 * @link
 *  https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
 *  https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver
 */

;(function _(global, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define([], factory())
  } else if (typeof exports === 'object') {
    exports['CheckInView'] = factory()
  } else {
    global['CheckInView'] = factory()
  }
})(window, function() {
  function throttle(func, wait, options) {
    let timeout, context, args, result
    let previous = 0
    if (!options) options = {}

    const later = function() {
      previous = options.leading === false ? 0 : +new Date()
      timeout = null
      result = func.apply(context, args)
      if (!timeout) content = args = null
    }

    const throttled = function() {
      const now = +new Date()
      if (!previous && options.leading === false) previous = now

      const remaining = wait - (now - previous)
      context = this
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        previous = now
        result = func.apply(context, args)
        if (!timeout) context = args = null
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining)
      }

      return result
    }

    throttled.cancel = function() {
      clearTimeout(timeout)
      previous = 0
      timeout = context = args = null
    }

    return throttled
  }

  // 支持 Observer
  const isSupportObserver =
    window.IntersectionObserver && window.MutationObserver
  let intersectionObserver, mutationObserver

  // 空函数
  const noop = function(_) {
    return _
  }

  const returnTrue = function() {
    return true
  }

  // 默认配置项
  const defaultConfig = {
    className: '_civ_check_',
    threshold: [0],
    rootMargin: '0px',
    checkLegalView: returnTrue,
    viewHandler: noop,
    container: document.body,
    throttleTime: 3e2
  }

  function hasClass(element, value) {
    return element.classList
      ? element.classList.contains(value)
      : element.className.indexOf(value) > -1
  }

  function removeClass(element, value) {
    if (!value) {
      return
    }

    if (element.classList) {
      element.classList.remove(value)

      return
    }

    if (element.className.indexOf(value) >= 0) {
      element.className = element.className.replace(value, ' ')
    }
  }

  function on(element, event, handler) {
    if (document.addEventListener) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    } else {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }

  function once(element, event, handler) {
    let called = false
    on(element, event, function() {
      if (!called) {
        called = true
        handler.apply(this, arguments)
      }
    })
  }

  function extend(to, _from) {
    for (const key in _from) {
      to[key] = _from[key]
    }

    return to
  }

  // 获取元素的 offset 属性，兼容低版本浏览器
  function offset(el) {
    let top, left
    for (top = el.offsetTop, left = el.offsetLeft; el.offsetParent; ) {
      el = el.offsetParent
      if (window.navigator.userAgent.indexOf('MSTE 8') > -1) {
        top += el.offsetTop
        left += el.offsetLeft
      } else {
        top += el.offsetTop + el.clientTop
        left += el.offsetLeft + el.clientLeft
      }
    }

    return {
      left,
      top
    }
  }

  // 是否处于视口中
  function isVisualRange(el) {
    try {
      const innerHeight = window.innerHeight,
        scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop,
        clientHeight = el.clientHeight
          ? el.clientHeight
          : el.parentNode.clientHeight,
        top = offset(el).top

      return (
        (top >= scrollTop && top <= scrollTop + innerHeight) ||
        (top < scrollTop &&
          top + clientHeight > scrollTop &&
          top + clientHeight < scrollTop + innerHeight)
      )
    } catch (ex) {
      return !1
    }
  }

  // 绑定 observer 监听器
  function bindObserverHandler(el, observer) {
    if (el.getAttribute('data-observer') !== 'true') {
      observer.observe(el)

      el.setAttribute('data-observer', 'true')
    }
  }

  // 入口函数
  function create(config) {
    config = extend(defaultConfig, config)

    var viewedHandler =
      config.viewedHandler ||
      function(el) {
        removeClass(el, config.className)
      }

    var checkLegalView = config.checkLegalView
    // 存在后调用的函数
    var loadHandler = (function(callback) {
      return function(el) {
        config.viewHandler(el, callback)
      }
    })(viewedHandler)

    let container = config.container
    if ('string' === typeof container) {
      container = document.getElementById(container)
      config.container = container
    }

    // 是否加载完成
    function isLoaded(el) {
      return !hasClass(el, config.className)
    }

    // 非 observer 处理器
    function traversalHandler(container, className) {
      return function() {
        Array.prototype.slice
          .call(container.getElementsByClassName(className) || [])
          .forEach(function(el) {
            isVisualRange(el) && loadHandler(el)
          })
      }
    }

    function load() {
      if (isSupportObserver) {
        const intersectionObserverHandler = (function(
          checkLegalView,
          callback
        ) {
          return function(entries, observer) {
            entries.forEach(function(entry) {
              // entry.intersectionRatio > 0有兼容问题
              if (entry.isIntersecting != undefined) {
                if (!entry.isIntersecting) return false
              } else if (entry.intersectionRect != undefined) {
                if (
                  !(
                    entry.intersectionRect.width ||
                    entry.intersectionRect.height ||
                    entry.intersectionRect.bottom ||
                    entry.intersectionRect.top ||
                    entry.intersectionRect.left ||
                    entry.intersectionRect.right
                  )
                )
                  return false
              }

              if (!checkLegalView()) {
                return false
              }

              observer.unobserve(entry.target)

              if (!isLoaded(entry.target)) {
                callback(entry.target)
              }
            })
          }
        })(checkLegalView, loadHandler)

        intersectionObserver = new window.IntersectionObserver(
          intersectionObserverHandler,
          {
            rootMargin: config.rootMargin,
            threshold: config.threshold
          }
        )

        mutationObserver = new MutationObserver(function() {
          Array.prototype.slice
            .call(
              config.container.getElementsByClassName(config.className) || []
            )
            .forEach(function(el) {
              bindObserverHandler(el, intersectionObserver)
            })
        })

        if (config.container) {
          mutationObserver.observe(config.container, {
            childList: true,
            subtree: true
          })
        }

        Array.prototype.slice
          .call(config.container.getElementsByClassName(config.className) || [])
          .forEach(function(el) {
            if (isLoaded(el)) return true
            if (intersectionObserver) {
              bindObserverHandler(el, intersectionObserver)
              return true
            }

            loadHandler(el)
          })
      } else {
        const traversal = traversalHandler(config.container, config.className)

        const onScrollListener = throttle(traversal, config.throttleTime)

        config.container.tagName === 'BODY'
          ? on(window, 'scroll', onScrollListener)
          : on(config.container, 'scroll', onScrollListener)

        traversal()
      }
    }

    return {
      run: load
    }
  }

  return {
    create: create,
    throttle: throttle,
    on: on,
    once: once,
    removeClass: removeClass,
    hasClass: hasClass,
    offset: offset,
    isVisualRange: isVisualRange
  }
})
