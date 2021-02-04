export default function bindActionCreators(store, actions) {
  return Object.keys(actions).reduce((boundActions, actionName) => {
    boundActions[actionName] = actions[actionName].bind(null, store);
    return boundActions;
  }, {});
}
