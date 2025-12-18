const auth = require("../../auth");

module.exports = function () {
  return function (req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("No token");

      const decoded = auth.verificarToken(token);

      req.user = decoded;
      next();
    } catch (err) {
      next(err);
    }
  };
};
