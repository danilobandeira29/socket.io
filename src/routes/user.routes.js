const { Router }= require('express');

const usersRouter = Router();

usersRouter.get('/', (request, response) => {
  return response.json({ message: 'Hello, world!' })
});

module.exports = usersRouter;
