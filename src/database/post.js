connect = require('./connect');

const post = {};

post.addName = (name, callback) => {
  connect.query('INSERT INTO lpop (name) VALUES ($1) RETURNING id;', [name], (err, res) => {
    // Add a name to the database
    err ? callback(err) : callback(null, { addNameId: res.rows[0].id });
  });
};

post.setCurrent = (name, callback) => {
  connect.query('UPDATE current SET name = $1 WHERE id = 1', [name], (err) => {
    // Put the most recently popped name in the database
    err ? callback(err) : callback(null, { setCurrent: `Set the current name to ${name}` });
  });
};

post.tick = (name, callback) => {
  connect.query('UPDATE lpop SET selected = true WHERE name = $1;', [name], (err) => {
    err ? callback(err) : callback(null, { tick: `Ticked off ${name}` });
  });
};

post.tickById = (id, callback) => {
  connect.query('UPDATE lpop SET selected = true WHERE id = $1;', [id], (err) => {
    err ? callback(err) : callback(null, { tickId: `Ticked of id #${id}` });
  });
};

post.toggleTickById = ([id, isOn], callback) => {
  connect.query('UPDATE lpop SET selected = $1 WHERE id = $2;', [isOn, id], (err) => {
    err ? callback(err) : callback(null, { toggleTickById: isOn ? `Checked ${id}` : `Unchecked ${id}` });
  });
};

post.reset = (callback) => {
  connect.query('UPDATE lpop SET selected = false;', (err) => {
    err ? callback(err) : callback(null, { reset: 'Reset all names' });
  });
};

post.allPop = (isOn, callback) => {
  connect.query('UPDATE allpop SET allp = $1;', [isOn], (err) => {
    err ? callback(err) : callback(null, { isAllPop: isOn ? 'Allpop engaged!' : 'Allpop disengaged.' });
  });
};

module.exports = post;
