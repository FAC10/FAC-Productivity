const { allPop, getCurrent, getNames } = require('../database/get');
const { deleteName } = require('../database/del');
const { addName, setCurrent, tick, tickById, toggleTickById, reset, allPop: checkAllPop } = require('../database/post');
const { parallelOld, partial } = require('../lib/utilities');

module.exports = {
  method: ['POST', 'DELETE', 'GET', 'PUT'],
  path: '/api',
  config: {
    auth: { mode: 'try' },
  },
  handler: (req, reply) => {
    const params = Object.keys(req.query).reduce((acc, item) => {
      acc[item] = req.query[item];
      return acc;
    }, {});

    const taskList = [];

    const parseTickString = (string) => {
      if (string && string.split(',').length === 2) {
        const splitString = string.split(',');
        return [splitString[0], splitString[1]];
      }
      return [null, null];
    };

    const apiTasks = {
      get: {
        getnames: getNames,
        isallpop: allPop,
        getcurrent: getCurrent,
      },
      delete: {
        deleteid: partial(deleteName, params.deleteid),
      },
      put: {
        addname: partial(addName, params.addname),
        setcurrent: partial(setCurrent, params.setcurrent),
        tick: partial(tick, params.tick),
        tickbyid: partial(toggleTickById, parseTickString(params.tickbyid)),
        reset,
        allpop: partial(checkAllPop, params.allpop),
      },
    }[req.method];

    Object.keys(apiTasks).forEach((task) => {
      params.hasOwnProperty(task) ? taskList.push(apiTasks[task]) : '';
    });

    if (taskList.length) {
      parallelOld(taskList, (err, res) => {
        err ?
        reply({ error: 'Error connecting to database.' }) :
        reply(res.reduce((acc, item) => {
          acc[Object.keys(item)[0]] = item[Object.keys(item)[0]];
          return acc;
        }, {}));
      });
    } else {
      reply({ error: 'Incorrect query.' });
    }
  },
};
