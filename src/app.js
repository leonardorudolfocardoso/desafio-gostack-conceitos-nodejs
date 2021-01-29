const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  response.send(repositories).status(200);
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);
  response.send(repository).status(200);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = repositories.find((value) => value.id === id);

  if (repository) {
    repository.title = title;
    repository.url = url;
    repository.techs = techs;

    response.send(repository).status(204);
  } else {
    response.sendStatus(400);
  }
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex((value) => value.id === id);

  if (repositoryIndex!=-1) {
    repositories.splice(repositoryIndex, 1);
    response.sendStatus(204);
  } else {
    response.sendStatus(400);
  }
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  const repository = repositories.find((value) => value.id === id);

  if (repository) {
    repository.likes += 1;
    response.status(200).send({ likes: repository.likes });
  } else {
    response.sendStatus(400);
  }
});

module.exports = app;
