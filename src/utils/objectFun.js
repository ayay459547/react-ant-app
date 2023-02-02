const hasOwn = Object.prototype.hasOwnProperty

function object_forEach (object, callback, thisArg) {
  thisArg = thisArg || window

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      callback.call(thisArg, object[key], key, object)
    }
  }

  return object
}

function object_map(object, callback, thisArg) {
  thisArg = thisArg || window

  const resObj = {}

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      resObj[key] = callback.call(thisArg, object[key], key, object)
    }
  }

  return resObj
}

function object_filter(object, callback, thisArg) {
  thisArg = thisArg || window

  const resObj = {}

  for (const key in object) {
    if (hasOwn.call(object, key) && callback.call(thisArg, object[key], key, object)) {
      resObj[key] = object[key]
    }
  }

  return resObj
}

function object_some(object, callback, thisArg) {
  thisArg = thisArg || window

  for (const key in object) {
    if (hasOwn.call(object, key) && callback.call(thisArg, object[key], key, object)) {
      return true
    }
  }

  return false
}

function object_every (object, callback, thisArg) {
  thisArg = thisArg || window

  for (const key in object) {
    if (hasOwn.call(object, key) && !callback.call(thisArg, object[key], key, object)) {
      return false
    }
  }

  return true
}

function object_reduce(object, callback, temp, thisArg) {
  thisArg = thisArg || window

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      temp = callback.call(thisArg, temp, object[key], key, object)
    }
  }

  return temp
}

export {
  object_forEach,
  object_map,
  object_filter,
  object_some,
  object_every,
  object_reduce
}