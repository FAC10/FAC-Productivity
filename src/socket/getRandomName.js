const { reset, setCurrent, tickById } = require('./../database/post');
const { getNames } = require('./../database/get');

const getRandomName = (callback) => {
  getNames((err, { names }) => {
    if (err) return callback(new Error('Error connecting to database'));

    // Only use names that haven't been selected
    const unselected = names.filter(name => !name.selected);
    // Pick a random unselected name or set null if all names are selected
    const name = unselected[0] ?
      unselected[Math.floor(Math.random() * unselected.length)] :
      null;

    if (name) {
      callback(null, name);
      setCurrent(name.name, err => err ? console.log(err) : '');
      tickById(name.id, err => err ? console.log(err) : '');
    } else {
      // If no unselected names then reset all to unselected and rerun pop
      reset(err => err ? callback(err) : getRandomName(callback));
    }
  });
};

module.exports = getRandomName;
