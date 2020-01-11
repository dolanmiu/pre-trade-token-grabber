const Nightmare = require("nightmare");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log(req.query);
  const nightmare = Nightmare({ show: false });

  nightmare
    .goto("https://www.blackrock.com/tools/pretrade")
    .wait(5000)
    .wait("#signin")
    .type("#userName", req.query.username)
    .type("#password", req.query.password)
    .click("#submitLogin")
    .wait(".application")
    .cookies.get()
    .end()
    .then(cookies => {
      const cookie = cookies.find(c => c.name === "JSESSION_blk-tools02");
      console.log(cookie);
      res.status(200).send(cookie);
    })
    .catch(error => {
      console.error("Cookie Fetch failed", error);
      res.status(500).send(error);
    });
});

app.listen(process.env.PORT || 3000);
