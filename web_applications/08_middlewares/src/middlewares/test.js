exports.middlewareA = function (req, res, next) {
  req.middlewareA = "OK";
  console.log("Executou Middleware A (Global)");
  next();
};

exports.middlewareB = function middlewareB(req, res, next) {
  req.middlewareB = "OK";
  console.log("Executou Middleware B (Rota)");
  next();
};
