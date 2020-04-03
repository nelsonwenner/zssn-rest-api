<h1 align="center">
  <img src="https://user-images.githubusercontent.com/40550247/72228004-81071600-3581-11ea-9972-1cbe906001ed.png" width="120px" />
</h1>

<h1 align="center">
    ZSSN - Backend
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/nelsondiaas/zssn-rest-api?color=%2304D361">

  <a href="https://github.com/nelsondiaas">
    <img alt="Made by @nelsondiaas" src="https://img.shields.io/badge/made%20by-%40nelsondiaas-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/nelsondiaas/zssn-rest-api/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/nelsondiaas/zssn-rest-api?style=social">
  </a>
</p>

<p align="center">
  <a href="#getting-started">Getting Started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#endpoints-access">Endpoints Access</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
</p>

### Prerequisites
* Docker Compose version (1.25.4)
* Docker version (19.03.8)
* Node version (12.16.1)
* Npm version (6.14.4)
* Npx version (6.14.4)

## Getting Started
1. Fork this repository and clone on your machine
2. Change the directory to `zssn-rest-api` where you cloned it;
3. At the terminal, run:
   
```bash
/* Install dependencies */

$ npm install

/* Environment variables */

$ cp .env.example .env

/* Run Container of docker */

$ docker-compose up -d

/* Access container of backend */

$ docker exec -it node-container /bin/bash

/* Database migrates */

$ npm run migrate
```
   1. Open the host [localhost:8000](http://localhost:8000) and start using it

## Running the tests

```bash
/* Access container of backend */

$ docker exec -it node-container /bin/bash

/* OS Windows */

$ npm run pretest-windows

$ npm run test-windows

$ npm run postest-windows

/* OS Linux */

$ npm run pretest

$ npm run test

$ npm run postest
```
---