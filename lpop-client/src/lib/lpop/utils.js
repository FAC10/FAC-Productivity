export const partial = (func, ...args) => func.bind(null, ...args)
