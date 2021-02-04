const OWN_KEYS_SYMBOL = Symbol('OWN_KEYS');

const isPlainObject = (obj) => {
  try {
    const proto = Object.getPrototypeOf(obj);
    return proto === Object.prototype || proto === Array.prototype;
  } catch (e) {
    return false;
  }
};

const unfreeze = (obj) => {
  if (!Object.isFrozen(obj)) return obj;
  if (Array.isArray(obj)) {
    return Array.from(obj);
  }
  return Object.assign({}, obj);
};

const createProxyHandler = () => ({
  recordUsage(key) {
    let used = this.affected.get(this.originalObj);
    if (!used) {
      used = new Set();
      this.affected.set(this.originalObj, used);
    }
    used.add(key);
  },
  get(target, key) {
    this.recordUsage(key);

    return createDeepProxy(target[key], this.affected, this.proxyCache);
  },
  has(target, key) {
    this.recordUsage(key);
    return key in target;
  },
  ownKeys(target) {
    this.recordUsage(OWN_KEYS_SYMBOL);
    return Reflect.ownKeys(target);
  },
});

export const createDeepProxy = (obj, affected, proxyCache) => {
  if (!isPlainObject(obj)) return obj;
  let proxyHandler = proxyCache && proxyCache.get(obj);
  if (!proxyHandler) {
    proxyHandler = createProxyHandler();
    proxyHandler.proxy = new Proxy(unfreeze(obj), proxyHandler);
    proxyHandler.originalObj = obj;
    if (proxyCache) {
      proxyCache.set(obj, proxyHandler);
    }
  }
  proxyHandler.affected = affected;
  proxyHandler.proxyCache = proxyCache;
  return proxyHandler.proxy;
};

const isOwnKeysChanged = (origObj, nextObj) => {
  const origKeys = Reflect.ownKeys(origObj);
  const nextKeys = Reflect.ownKeys(nextObj);
  return origKeys.length !== nextKeys.length
    || origKeys.some((k, i) => k !== nextKeys[i]);
};

export const isDeepChanged = (
  origObj,
  nextObj,
  affected,
  cache,
  assumeChangedIfNotAffected,
) => {
  if (origObj === nextObj) return false;
  if (typeof origObj !== 'object' || origObj === null) return true;
  if (typeof nextObj !== 'object' || nextObj === null) return true;
  const used = affected.get(origObj);
  if (!used) return !!assumeChangedIfNotAffected;
  if (cache) {
    const hit = cache.get(origObj);
    if (hit && hit.nextObj === nextObj) {
      return hit.changed;
    }
    cache.set(origObj, { nextObj });
  }
  let changed = null;
  for (const key of used) {
    const c = key === OWN_KEYS_SYMBOL ? isOwnKeysChanged(origObj, nextObj)
      : isDeepChanged(
        origObj[key],
        nextObj[key],
        affected,
        cache,
        assumeChangedIfNotAffected !== false,
      );
    if (typeof c === 'boolean') changed = c;
    if (changed) break;
  }
  if (changed === null) changed = !!assumeChangedIfNotAffected;
  if (cache) {
    cache.set(origObj, { nextObj, changed });
  }
  return changed;
};
