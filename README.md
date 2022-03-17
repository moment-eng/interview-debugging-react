# Technical Interview: Debugging

## Introduction

This repository is a to do list [SPA](https://developer.mozilla.org/en-US/docs/Glossary/SPA) using [React](https://reactjs.org) for the UI layer. The back-end is a [CRUD](https://developer.mozilla.org/en-US/docs/Glossary/CRUD) api.

The `/todo` endpoint for the API is artificially slowed down to ~2s response times to make UI sequences more visible.

## Requirements

-   Node.js (v16.11.1)

Optional:

-   [gh](http://cli.github.com)
-   [just](https://github.com/casey/just)
-   [fnm](https://github.com/Schniz/fnm)

## Getting Started

1: Clone repository

```sh
# with 'gh' cli
gh repo clone moment-eng/interview-debugging-react

# with git
git clone https://github.com/moment-eng/interview-debugging-react.git
```

2: Ensure you have correct version of Node.js installed. We recommned [`fnm` (fast node manager)](https://github.com/Schniz/fnm) or [`nvm` (node version manager)](https://github.com/nvm-sh/nvm). You can also download 16.11.1 directly from [https://nodejs.org/download/release/v16.11.1/](https://nodejs.org/download/release/v16.11.1/)

```sh
node --version
# should print out "v16.11.1"

# set correct version with fnm
fnm use $(cat .nvmrc)

# set correct version with nvm
nvm use $(cat .nvmrc)
```

3: Install dependencies

```sh
# with npm
npm install

# with yarn
yarn install

# with just
just install
```

4: Launch dev server

```sh
# with npm
npm run dev

# with yarn
yarn dev

# with just
just dev
```

Front-end is available at: http://localhost:3000

API is available at: http://localhost:3333

## API Endpoints

| Path  | Method | Description                                                | Example Request Body                            | Example Response Body                                            |
| :---- | :----- | :--------------------------------------------------------- | :---------------------------------------------- | ---------------------------------------------------------------- |
| /     | GET    | "Hello, World". Useful for testing that the API is running | n/a                                             | `"Hello, World"`                                                 |
| /todo | POST   | Creates a new to do entry and returns created object       | `{description: 'Foo'}`                          | `{id: 'abc-123', status: 'todo', description: 'Foo'}`            |
| /todo | GET    | Returns list of to do entries                              | n/a                                             | `{todos: [{id: 'abc-123', status: 'todo', description: 'Foo}]}`  |
| /todo | PUT    | Updates to do entry and returns updated object             | `{id: 'abc-123', description: 'Hello, World' }` | `{id: 'abc-123', status: 'todo', description: 'Hello, World' } ` |
| /todo | DELETE | Removes to do entry and returns list of to do entries      | `{id: 'abc-123'}`                               | `{todos: []}`                                                    |

### Notes

-   [React documentation](https://reactjs.org/)
-   [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
-   [Fastify documentation](https://www.fastify.io/docs/)
