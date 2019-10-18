var Support = (function Support() {
  return {
    touch:
      (window.Modernizr && window.Modernizr.touch === true) ||
      (function checkTouch() {
        return !!(
          window.navigator.maxTouchPoints > 0 ||
          'ontouchstart' in window ||
          (window.DocumentTouch && document instanceof window.DocumentTouch)
        )
      })(),
    pointerEvents: !!(
      window.navigator.pointerEnabled ||
      window.PointerEvent ||
      ('maxTouchPoints' in window.navigator &&
        window.navigator.maxTouchPoints > 0)
    ),
    prefixedPointerEvents: !!window.navigator.msPointerEnabled,
    observer: (function checkObserver() {
      return 'MutationObserver' in window || 'WebkitMutationObserver' in window
    })(),
    passiveListener: (function checkPassiveListener() {
      var supportsPassive = false
      try {
        var opts = Object.defineProperty({}, 'passive', {
          get: function get() {
            supportsPassive = true
          }
        })

        window.addEventListener('testPassiveListener', null, opts)
      } catch (e) {
        // No support
      }
      return supportsPassive
    })(),
    gestures: (function checkGestures() {
      return 'ongesturestart' in window
    })()
  }
})()
