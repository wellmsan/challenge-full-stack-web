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
 * GET /list
 *
 * This is a sample route demonstrating a simple approach to error
 * handling and testing the global error handler.
 * You most certainly want to create different/better
 * error handlers depending on your use case.
 *

routes.get('/list', (req, res, next) => {
    const {title} = req.query;

    if (title == null || title === '') {
        return next(new Error('The "title" parameter is required'));
    }

    res.render('index', {title}); 
});
*/

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
        username: username,
        senha: md5(req.body.password),
        ativo: true,
      };
      // Verifica se está cadastrado no sistema
      const userLocal = await new UserRepository().list(userReq);

      if (userLocal.rows.length > 0) {
        let sistema = null;
        // Verficar se o usuário tem permissão para acessar a API desejada
        for (const count in userLocal.rows[0].sistemas) {
          if (
            userLocal.rows[0].sistemas[count].client_id == req.body.client_id
          ) {
            sistema = userLocal.rows[0].sistemas[count];
          }
        }
        if (sistema == null) {
          res
            .status(401)
            .send({ auth: false, message: "Usuário/Senha inválidos!" });
        }
        verificaPerfil(res, userLocal, sistema);
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

/**
 * This function used for create account in first access
 * @route POST /createAcccount
 * @group Access
 * @param { object } body.body.required
 * @returns { object } 200 - Return JSON with token access
 * @returns { Error }  401 - Invalid Login!
 */
/*
routes.post('/createAccount', awaitErorrHandlerFactory(async (req, res, next) => {    
    try {
        // Create Person
        let personReq = {
            name: req.body.name,
            genre: req.body.genre           
        }
        const person = await new PessoaRepository().create(personReq)

        // Create User
        let userReq = {
            email: req.body.email,
            pass: req.body.pass,
            token: md5(req.body.email+'-'+req.body.pass),
            active:  true,
            personId: person.id,
            profileId: 1
        }        
        const user = await new UsuarioRepository().create(userReq)
        
        // Create Account
        let accountReq = {
            userId: user.id,
            planId: req.body.plan_id,
            token: md5(user.id+'-'+req.body.plan_id),
            active: true
        }

        const account = await new AccountRepository().create(accountReq)

        res.status(200).json(account);
        
    } catch(e) {
         res.status(500).send({message: 'Error: ' + e})
    }    
}))
*/

async function verificaPerfil(res, userLocal, sistema) {
  const token = await geraToken(userLocal.rows[0], sistema);
  const username = userLocal.rows[0].pessoa.nome;
  const userId = userLocal.rows[0].id;

  res.status(200).send({
    auth: true,
    token: token,
    username: username,
    userId: userId,
  });
}

async function geraToken(userLocal, sistema) {
  try {
    const person = await new PessoaRepository().get(userLocal.pessoa_id);
    let payload = {
      userName: person.nome,
      userId: userLocal.id,
      sistema: sistema,
    };
    var token = jwt.sign(payload);
    return token;
  } catch (error) {
    console.error("Error: " + error);
  }
}

async function getIdentidade(usuario_id) {
  let identidade = ""
  await new IdentidadeRepository().list({
    usuario_id: usuario_id,
    ativo: true
  }).then(identidades => {
    if (identidades.rows.length > 0) {
      identidade = identidades.rows[0];
    }
  }).catch(err => {
    console.error('Error: Identidade não encontrada' + err.message)
  })

  return identidade;
}

async function isChefeUnidade(codigo_unidade, matricula) {
  let boolean = false;

  await apiRhbahia.get(`/pessoa/${codigo_unidade}/chefe`)
    .then(res => {
      if (res.data.length > 0) { // Verifica houve retorno na chamada
        const chefe = res.data[0];
        if (chefe.matricula === matricula) { // Verifica se o usuário é chefe de unidade
          boolean = true;
        }
      }
    }).catch(e => {
      console.error('[API Rhbahia]: Erro ao buscar chefe de unidade')
    });

  return boolean;
}

export default routes;
