const { comparePassword } = require("../helper/bcrypt");
const { User } = require("../models");
const { generateToken } = require("../helper/jwt");
const { OAuth2Client } = require("google-auth-library");
const nodemailer = require("nodemailer");

class UserController {
  static register(req, res, next) {
    const { name, email, password } = req.body;

    User.create({ name, email, password })
      .then((user) => {
        let response = {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        };
        res.status(201).json(response);
      })

      .then(() => {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "wahyujavascriptwinoto@gmail.com",
            pass: "EMAIL_PASS",
          },
        });
        let mailOptions = {
          from: "wahyujavascriptwinoto@gmail.com",
          to: data.email,
          subject: "Aplikasi Todo List",
          text:
            "Hi! Terima kasih telah mendaftar di App Todo List. Silakan login dengan akun yang telah anda buat.",
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Email Terkirim: `, info.response);
          }
        });
      })

      .catch((err) => next(err));
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: { email },
    })
      .then((user) => {
        if (!user) throw { status: 400, msg: "email / password tidak valid" };
        const compare = comparePassword(password, user.password);
        if (!compare) {
          throw { status: 400, msg: "Invalid email / password" };
        }
        const access_token = generateToken({
          id: user.id,
          name: user.name,
          email: user.email,
        });
        res.status(200).json({ access_token });
      })
      .catch((err) => next(err));
  }

  // google

  static loginGoogle(req, res) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      Account.findOrCreate({
        where: { email: googleUserParams.email },
        defaults: {
          name: googleUserParams.name,
          password: new Date().toDateString(),
        },
      }).then((user) => {
        let payload = { id: user.id, email: user.email };
        res.status(200).json({
          id: user.id,
          email: user.email,
          token: generateToken(payload),
        });
      });

      if (!user) {
        let newUser = { email, password };
        let createUser = await User.create(newUser);
        const payload = {
          id: createUser.id,
          email: createUser.email,
        };
        const access_token = generateToken(payload);
        return res.status(201).json({ access_token });
      } else {
        const payload = {
          id: user.id,
          email: user.email,
        };
        const access_token = generateToken(payload);
        return res.status(200).json({ access_token });
      }
    }
    verify().catch(err);
    console.log(err);
    return next(err);
  }
}
module.exports = UserController;
