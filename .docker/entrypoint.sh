#!/bin/bash

cd /home/backend

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

npm install
npm run migrate
npm run start