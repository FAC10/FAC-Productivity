const fetch = (url, method, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const contentType = xhr.getResponseHeader('content-type');
      if (xhr.status === 200 && contentType.indexOf('json' > -1)) {
        cb(null, JSON.parse(xhr.responseText))
      } else {
        cb(new Error('Error getting data from the server'))
      }
    }
  }
  xhr.open(method, url, true);
  xhr.send();
};

export const getNames = (callback) => fetch('/api?getnames', 'GET', callback)

export const getAllPop = (callback) => fetch('/api?isallpop', 'GET', callback)

export const addNameToDb = (name, cb) => fetch('/api?addname=' + name, 'PUT', cb)

export const removeFromDb = (id, cb) => fetch('/api?deleteid=' + id, 'DELETE', cb)

export const setAllPop = (isOn, cb) => fetch('/api?allpop=' + isOn, 'PUT', cb)

export const checkId = (id, isOn, cb) => fetch(`/api?tickbyid=${id},${isOn}`, 'PUT', cb)

export const setName = (name) => fetch('/api?setcurrent=' + name, 'PUT', () => {})
