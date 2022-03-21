# Contacts API

Clean Architecture approach to creating Web APIs using TypeScript, Express, and MongoDB. Inspired by the blog post [Clean Architecture: An API Project](https://nanosoft.co.za/blog/post/clean-api), moved some files around and edited some implementation to suit my style and add my opinions.

# Local Development

To download project dependencies, run the following command in the root directory of the project. This will create the `node_modules` directory containing all library dependencies (plus, their denpendencies) specificied in `package.json`.

> npm install

## Build

To build the application, run the following command in the root directory of the project. This will create a `lib` directory containing the transpiled `.js` files, along with the corresponding `.js.map` files.

> npm run dev:build

## Test

To run the tests, run the following command in the root directory of the project. This will run the all the test cases in the `test` directory and create a `coverage` directory containing the project's test coverage.

> npm test

## Run

To run the application, run the following command in the root directory of the project. This will serve the application on `http://localhost:4000/contacts/`

> npm run dev:serve

# Reference

https://nanosoft.co.za/blog/post/clean-api