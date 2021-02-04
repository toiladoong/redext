export default function applyMiddleware(middlewareApi, ...middlewares) {
  const chain = middlewares.map(middleware => middleware(middlewareApi));

  return chain.reduce((result, fun) => (...args) => result(fun(...args)))(middlewareApi.dispatch);
};
