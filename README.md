# VOR

Visit https://docs.scaffoldhub.io for docs/instructions.
Version: 2.7.8

## Table of contents

- [Installation](#installation)
  - [Environments](#environments)
  - [Prepares](#prepares)
    - [Install yarn](#install-yarn)
    - [Install ts-node npm package](#install-ts-node-npm-package)
    - [Install npm packages for the backend](#install-npm-packages-for-the-backend)
    - [Create the collection for the project](#create-the-collection-for-the-project)
    - [Install npm packages for the frontend](#install-npm-packages-for-the-frontend)
- [Executes](#executes)
  - [Run the backend](#run-the-backend)
  - [Run the frontend as Development mode](#run-the-frontend-as-development-mode)
  - [Run the frontend as Production mode](#run-the-frontend-as-production-mode)

# Installation

Here are all steps for installation.

## Environments

- Mongo DB
- Node.js

## Prepares

### Install yarn

Open command prompt and type the command as follows.

```bash
npm install --global yarn
```

### Install ts-node npm package

Continue with previous step.

```bash
npm install --global ts-node
```

### Install npm packages for the backend

Open command prompt on your project folder and type every line.

```bash
yarn
```

### Create the collection for the project

Please don't close the command prompt that opened on the previous step and type this.

```bash
npm run db:create
```

### Install npm packages for the frontend

Open command prompt on your project folder and type every line.

```bash
cd frontend
yarn
```

# Executes

Some frontend features could make runtime issues. Because of Development mode.

So Production mode is the best runtime mode. For example, `importing`.

## Run the backend

Open command prompt on your project folder and type these.

```bash
npm start
```

## Run the frontend as Development mode

Open one more as same as the previous step.

```bash
cd frontend
npm start
```

## Run the frontend as Production mode

Install `serve` npm. Please, should use only once. Because it's only for serving built files.

```bash
npm install --global serve
```

And run the below bash.

```bash
cd frontend
rm -fR ./build/
npm run build:localhost
serve -s build
```

You can visit and test via http://localhost:3000
