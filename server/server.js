const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync("./users.json", "utf-8"));


server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const SECRET_KEY = "393939";

const expiresIn = "1h";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isLoginAuth({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

function isRegisterAuth({ email }) {
  return userdb.users.findIndex((user) => user.email === email) !== -1;
}

server.post("/api/register", (req, res) => {
  const { email, password } = req.body;
  if (isRegisterAuth({ email})) {
    const status = 401;
    const message = "Opss! Sanki bir şeyleri eksik bıraktın";
    res.status(status).json({ status, message });
    return;
  }

  

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    data = JSON.parse(data.toString());

    let last_item_id = data.users[data.users.length - 1].id;

    data.users.push({ id: last_item_id + 1, email: email, password: password });
    let writeData = fs.writeFile(
      "./users.json",
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
});



server.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!isLoginAuth({ email, password })) {
    const status = 401;
    const message = "Opss! Bir şeyler yanlış gidiyor";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
});




server.listen(2000, () => {
  console.log("Her şey Yolunda :)");
});

