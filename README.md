<h1 align="center">
  <img src="https://user-images.githubusercontent.com/40550247/72228004-81071600-3581-11ea-9972-1cbe906001ed.png" width="120px" />
</h1>

<h1 align="center">
    ZSSN - Backend
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/nelsonwenner/zssn-rest-api?color=%2304D361">

  <a href="https://github.com/nelsondiaas">
    <img alt="Made by @nelsonwenner" src="https://img.shields.io/badge/made%20by-%40nelsonwenner-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/nelsondiaas/zssn-rest-api/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/nelsonwenner/zssn-rest-api?style=social">
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
## Endpoints access

<details><summary><b>API</b></summary><blockquote>

<details><summary><b>Survivors</b></summary><blockquote>

#### Allowed methods = [GET, POST]

[POST] http://www.hostname.com/survivors/

##### Sample request

```json
{
	"name": "nelson",
	"age": 20,
	"sex": "masculino",
	"inventory": [
		{"item": 1, "quantity": 1},
		{"item": 2, "quantity": 1},
		{"item": 3, "quantity": 10},
		{"item": 4, "quantity": 6}
	],
	"location": {
		"latitude": 140.6546578,
		"longitude": -33.4213957
	}
}
```

[GET] http://www.hostname.com/survivors/

##### Sample response

```json
{

  "survivor_id": 1,
  "infected": false,
  "name": "nelson",
  "age": 20,
  "sex": "masculino",
  "last_location": {
    "location_id": 1,
    "latitude": 140.6546578,
    "longitude": -33.4213957
  },
  "inventory": {
    "inventory_id": 1,
    "survivor_id": 1,
    "resources": [
      {
        "resource_id": 1,
        "inventory_id": 1,
        "item_id": 1,
        "quantity": 1,
        "item": {
          "item_id": 1,
          "name": "Fiji Water"
        }
      },
      {
        "resource_id": 2,
        "inventory_id": 1,
        "item_id": 2,
        "quantity": 1,
        "item": {
          "item_id": 2,
          "name": "Campbell Soup"
        }
      },
      {
        "resource_id": 3,
        "inventory_id": 1,
        "item_id": 4,
        "quantity": 6,
        "item": {
          "item_id": 4,
          "name": "AK47"
        }
      },
      {
        "resource_id": 4,
        "inventory_id": 1,
        "item_id": 3,
        "quantity": 10,
        "item": {
          "item_id": 3,
          "name": "First Aid Pouch"
        }
      }
    ]
  }

}
```
</details>

<details><summary><b>Flags</b></summary><blockquote>

#### Allowed methods = [POST]

[POST] http://www.hostname.com/sender_id/flags/target_id/

##### Sample request
</details>

<details><summary><b>trades</b></summary><blockquote>

#### Allowed methods = [POST]

[POST] http://www.hostname.com/sender_id/trades/target_id/

##### Sample request

```json
{
  "sender": [
		{"item": 1, "quantity": 1},
		{"item": 2, "quantity": 0},
		{"item": 3, "quantity": 0},
		{"item": 4, "quantity": 0}
	],
	"target": [
		{"item": 1, "quantity": 1},
		{"item": 2, "quantity": 0},
		{"item": 3, "quantity": 0},
		{"item": 4, "quantity": 0}
  ]
}
```
</details>

<details><summary><b>itens</b></summary><blockquote>

#### Allowed methods = [POST, GET]

[POST] http://www.hostname.com/itens/

##### Sample request

```json
{
	"name": "AK47"
}
```
[GET] http://www.hostname.com/itens/

##### Sample request

```json
[
  {
    "item_id": 1,
    "name": "Fiji Water",
    "value": 14,
    "createdAt": "2020-04-22T20:00:33.674Z",
    "updatedAt": "2020-04-22T20:00:33.674Z"
  },
  {
    "item_id": 2,
    "name": "Campbell Soup",
    "value": 12,
    "createdAt": "2020-04-22T20:00:33.674Z",
    "updatedAt": "2020-04-22T20:00:33.674Z"
  },
  {
    "item_id": 3,
    "name": "First Aid Pouch",
    "value": 10,
    "createdAt": "2020-04-22T20:00:33.674Z",
    "updatedAt": "2020-04-22T20:00:33.674Z"
  },
  {
    "item_id": 4,
    "name": "AK47",
    "value": 8,
    "createdAt": "2020-04-22T20:00:33.674Z",
    "updatedAt": "2020-04-22T20:00:33.674Z"
  }
]
```
</details>

<details><summary><b>reports</b></summary><blockquote>

#### Allowed methods = [GET]

[POST] http://www.hostname.com/reports/

##### Sample request

```json
[
  {
    "description": "Percentage of infected survivors",
    "percentage": {
      "values": 0
    }
  },
  {
    "description": "Percentage of not infected survivors",
    "percentage": {
      "values": 100
    }
  },
  {
    "description": "Average amount of each resource type per survivor",
    "FijiWater": {
      "average": {
        "values": 1
      }
    },
    "CampbellSoup": {
      "average": {
        "values": 1
      }
    },
    "FirstAidPouch": {
      "average": {
        "values": 10
      }
    },
    "AK47": {
      "average": {
        "values": 6
      }
    }
  },
  {
    "description": "Points lost because of infected survivor.",
    "points": {
      "values": 0
    }
  }
]
```
</details>

</details>

## License

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.


---