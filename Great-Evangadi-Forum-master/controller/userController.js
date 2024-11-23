const dbconnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-code");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(401)
      .json({ msg: "pleas inter all requierd information" });
  }
  try {
    const result1 = await dbconnection.query(
      "SELECT username,userid from users where username=$1 or email=$2",
      [username, email]
    );
    user=result1.rows[0]
    if (user) {
      return res.status(401).send( "user is already registerd" );

    }
    if (password.length < 8) {
      return res.status(401).json({
        msg: "The passord is too short it must be at least 8 characters",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const query = `
  INSERT INTO users (username, firstname, lastname, email, password)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *; -- Optional: Returns the inserted row
`;

const values = [username, firstname, lastname, email, hashPassword];
    const result = await dbconnection.query(query, values);
    console.log('User inserted:', result);
  
     return res.send("user registerd")
  }

    catch (error) {
      console.error('Error inserting user:', error.message);
    } finally {
      // Optional: Code that runs regardless of success or failure
      console.log('Insert operation attempted.');
    }
  }
async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json({ msg: "pleas inter all requierd information" });
  }
  try {
    const result = await dbconnection.query(
      "SELECT username,userid,password from users where email=$1",
      [email]
    );
    const user = result.rows[0]
    if (!user) {
      return res.status(401).json({ msg: "Create account first" });
    }
    //compare passored
    const ismach = await bcrypt.compare(password, user.password);
    if (!ismach) {
      return res.json({ msg: "Invalide Password" });
    } else {
      const username = user.username;
      const userid = user.userid;
      const token = jwt.sign({ username, userid }, process.env.jwt_SECRET, {
        expiresIn: "2d",
      });

      return res.status(200).json({
        msg: `Login successfuly ${user.username}`,
        token,
        username,
      });
    }
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ msg: "Something gose rongly" });
  }
}

async function check(req, res) {
  const username = req.users.username;
  const userid = req.users.userid;
  return res.status(200).json({ msg: `Welcome ${username}`, username, userid });
}

module.exports = { register, login, check };
