function error(mensage, code) {
  let e = new Error(mensage);

  if (code) {
    e.code = code;
  }
  return e;
}

module.exports = error;
