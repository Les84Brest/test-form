const express = require("express");
const cors = require("cors");
const app = express();

const port = 9090;

const allowedEmails = [
  'a@a.com',
  'a@b.com',
  'a@c.com'
]

const allowedPhones = [
  '+375(11)111-11-11',
  '+375(22)222-22-22',
  '+375(33)333-33-33',
]


app.use(cors());
app.use(express.urlencoded({extended: true}));

app.post("/api/registration", (req, res) => {
  if (Math.random() > 0.5) {
    res.statusCode = 400;

    setTimeout(() => {
      res.send({
        status: "error",
        message: "Bad request",
      });
    }, Math.random() * 1000);

    return;
  }

  setTimeout(() => {
    res.statusCode = 200;
    res.send({
      status: "success",
      message: "You are registered",
    });
  }, Math.random() * 1000);
});


app.get("/api/ping", (req, res) => {
  res.statusCode = 200;
  res.send({
    status: "success",
    message: "Server is ready",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/feedback", (req, res) => {
  const {phone, email} = req.body;

  if(allowedEmails.includes(email) && allowedPhones.includes(phone)){
    setTimeout(() => {
      res.statusCode = 200;
      res.send({
        status: "success",
        message: "Your application was submitted successfully",
      });
    }, 300);

    return;
  }

  const fields = {};
  if(!allowedEmails.includes(email)){
    fields['email'] = `Wrong email value - ${email}`;
  }
  if(!allowedPhones.includes(phone)){
    fields['phone'] = `Wrong phone value - ${phone}`;
  }

  setTimeout(() => {
    res.statusCode = 200;
    res.send({
      status: "error",
      fields,
    });
  }, 250);
});