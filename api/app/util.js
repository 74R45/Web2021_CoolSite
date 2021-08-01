function getUpdateString(body) {
  return Object.entries(body).map(pair => {
    let [k, v] = pair;
    if (typeof v === 'string') v = `'${queriable(v)}'`;
    return `${k} = ${v}`;
  }).join(', ');
}

function queriableObj(obj) {
  let res = {};
  Object.entries(obj).forEach(pair => {
    let [k, v] = pair;
    if (typeof v === 'string') res[k] = `${queriable(v)}`;
    else res[k] = v;
  });
  return res;
}

// Prepends every apostrophe (') with a backslash (\) in a string.
function queriable(str) {
  return str.split('\'').join('\\\'');
}

module.exports = { getUpdateString, queriableObj, queriable };