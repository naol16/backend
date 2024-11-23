const jwt = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");
async function autMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authorization invalid" });
  }
  const token = authHeader.split(" ")[1];
  //console.log(token);

  try {
    const { username, userid } = jwt.verify(token, process.env.jwt_SECRET);
    req.users = { username, userid };
    next();
  } catch (error) {
    return res

      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Token verification failed", error: error.message });
  }
}

module.exports = autMiddleware;
