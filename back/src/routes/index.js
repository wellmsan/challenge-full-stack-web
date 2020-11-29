import { Router } from 'express';
import jwt from '../lib/JWTUtils';
import awaitErorrHandlerFactory from '../lib/AwaitErorrHandlerFactory'
import apiRhbahia from '../config/apiRhbahia'
import md5 from 'js-md5'

import UserRepository from '../repositories/UserRepository'


/* eslint-disable new-cap */
const routes = Router();
/* eslint-enable new-cap */

/**
 * GET home page
 */
routes.get("/", (req, res) => {
  res.redirect(process.env.BASE_PATH + "/docs");
});

/**
 * This function used for obtain acess token
 * @route POST /login
 * @group Access
 * @param { object } body.body.required
 * @returns { object } 200 - Return JSON with token access
 * @returns { Error }  401 - Invalid Login!
 */
routes.post(
  "/login",
  awaitErorrHandlerFactory(async (req, res, next) => {

    try {

      let userReq = {
        email: req.body.username,
        pass: req.body.password,
      };

      const userLocal = await new UserRepository().list(userReq);
      if (userLocal.count > 0) {
        const token = await getToken(userLocal.rows[0]);
        const username = userLocal.rows[0].name;
        const userId = userLocal.rows[0].id;

        res.status(200).send({
          auth: true,
          token: token,
          username: username,
          userId: userId,
        });
      } else {
        res
          .status(401)
          .send({ auth: false, message: "Usuário/Senha inválidos!!" });
      }
    } catch (error) {
      res.status(500).send({ message: "Error: " + error });
    }
  })
);


routes.post('/decode', awaitErorrHandlerFactory(async (req, res, next) => {
  try {
    res.status(200).send(jwt.decode(req.body));
  } catch (error) {
    res.status(500).send({ message: "Error: " + error });
  }
})
);

routes.post('/check', awaitErorrHandlerFactory(async (req, res, next) => {
  try {
    let usuario = await new UserRepository().get(req.body.userId)
    const check = jwt.check({ token: req.body.token, usuario: usuario })
    res.status(check.status).send({ auth: check.auth, status: check.status, message: check.message });
  } catch (error) {
    res.status(500).send({ message: "Error: " + error });
  }
})
);

async function getToken(userLocal) {
  try {
    var token = jwt.sign({
      userName: userLocal.name,
      userId: userLocal.id,
    });
    return token;
  } catch (error) {
    console.error("Error: " + error);
  }
}

export default routes;
