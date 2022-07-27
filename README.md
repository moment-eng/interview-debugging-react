# Technical Interview: Debugging

## Introduction

This repository is a to do list [SPA](https://developer.mozilla.org/en-US/docs/Glossary/SPA) using [React](https://reactjs.org) for the UI layer. The back-end is a [CRUD](https://developer.mozilla.org/en-US/docs/Glossary/CRUD) api.

The `/todo` endpoint for the API is artificially slowed down to ~2s response times to make UI sequences more visible.

## Requirements

-   [Docker](https://docs.docker.com/get-docker/)
-   Node.js (v18.3.0)
-   [just](https://github.com/casey/just)
-   [fnm](https://github.com/Schniz/fnm)

Optional:

-   [gh](http://cli.github.com)

## Getting Started

1: Clone repository

```sh
# with 'gh' cli
gh repo clone moment-eng/interview-debugging-react

# with git
git clone https://github.com/moment-eng/interview-debugging-react.git
```

2: Ensure you have correct version of Node.js installed. We recommned [`fnm` (fast node manager)](https://github.com/Schniz/fnm) or [`nvm` (node version manager)](https://github.com/nvm-sh/nvm). You can also download 18.3.0 directly from [https://nodejs.org/download/release/v18.3.0/](https://nodejs.org/download/release/v18.3.0/)

```sh
node --version
# should print out "v18.3.0"

# set correct version with fnm
fnm use $(cat .nvmrc)

# set correct version with nvm
nvm use $(cat .nvmrc)
```

3: Install dependencies

```sh
# in root directory
just install
```

4: Launch services

```sh
# in root directory
just run
```

Front-end is available at: http://localhost:3000

API is available at: http://localhost:3001

Both the Front-end and API are setup to support hot reloading when changes to files are made.

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
