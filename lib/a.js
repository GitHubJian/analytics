function test() {
  var args = [],
    len = arguments.length

  while (len--) args[len] = arguments[len]

  console.log(args)
}

test(1, 2, 3, 4)
