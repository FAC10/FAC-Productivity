const utils = {};

utils.partial = (func, ...args) => func.bind(null, ...args);

utils.parallel = (tasks, cb) => {
  const result = tasks.map(() => null);
  let n = 0;
  tasks.forEach((task, index) => {
    task((error, ...args) => {
      if (error) { return cb(error); }
      result[index] = args;
      n += 1;
      if (n === result.length) { return cb(null, result); }
    });
  });
};

module.exports = utils;
