const equal = (a, b) => {
  let ctor;
  let len;

  if (a === b) {
    return true
  }

  if (a && b && (ctor = a.constructor) === b.constructor) {
    if (ctor === Date) {
      return a.getTime() === b.getTime()
    }

    if (ctor === RegExp) {
      return a.toString() === b.toString()
    }

    if (ctor === Array && (len = a.length) === b.length) {
      while (len-- && equal(a[len], b[len])) ;

      return len === -1;
    }

    if (ctor === Object) {
      if (Object.keys(a).length !== Object.keys(b).length) {
        return false
      }

      for (len in a) {
        if (!(len in b) || !equal(a[len], b[len])) {
          return false
        }
      }

      return true;
    }
  }
  return a !== a && b !== b;
};

export default function deepEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if ((error.message && error.message.match(/stack|recursion/i)) || (error.number === -2146828260)) {
      console.warn('Warning: deepEqual does not handle circular references.', error.name, error.message);

      return false;
    }
    throw error;
  }
};
