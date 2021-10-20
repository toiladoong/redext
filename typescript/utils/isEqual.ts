const isArray = Array.isArray;
const keyList = Object.keys;
const hasProp = Object.prototype.hasOwnProperty;
const hasElementType = typeof Element !== 'undefined';

function equal(a, b) {
  if (a === b) {
    return true
  }

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    const arrA = isArray(a);
    const arrB = isArray(b);
    let length;
    let key;

    if (arrA && arrB) {
      length = a.length;

      if (length !== b.length) {
        return false
      }

      for (let i = 0; i < length; i++) {
        if (!equal(a[i], b[i])) {
          return false
        }
      }

      return true;
    }

    if (arrA !== arrB) {
      return false
    }

    const dateA = a instanceof Date;
    const dateB = b instanceof Date;

    if (dateA !== dateB) {
      return false
    }

    if (dateA && dateB) {
      return a.getTime() === b.getTime()
    }

    const regexpA = a instanceof RegExp;
    const regexpB = b instanceof RegExp;

    if (regexpA !== regexpB) {
      return false
    }

    if (regexpA && regexpB) {
      return a.toString() === b.toString()
    }

    const keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length)
      return false;

    for (let i = 0; i < length; i++) {
      if (!hasProp.call(b, keys[i])) {
        return false;
      }
    }

    if (hasElementType && a instanceof Element) {
      return false;
    }

    for (let i = 0; i < length; i++) {
      key = keys[i];

      if (key === '_owner' && a.$$typeof) {
        continue;
      } else {
        if (!equal(a[key], b[key])) {
          return false;
        }
      }
    }

    return true;
  }

  return a !== a && b !== b;
}

export default function exportedEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if ((error.message && error.message.match(/stack|recursion/i)) || (error.number === -2146828260)) {
      console.warn('Warning: isEqual does not handle circular references.', error.name, error.message);

      return false;
    }
    throw error;
  }
};
