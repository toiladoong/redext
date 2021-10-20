const isPrimitive = (val) => {
  return val == null || /^[sbn]/.test(typeof val);
};

const checkDeps = (deps, name) => {
  const hookName = `React.${name.replace(/Deep/, '')}`;

  if (!deps || deps.length === 0) {
    console.warn(`${name} should not be used with no dependencies. Use ${hookName} instead.`)
  }
  if (deps.every(isPrimitive)) {
    console.warn(`${name} should not be used with dependencies that are all primitive values. Use ${hookName} instead.`)
  }
};

export default checkDeps
