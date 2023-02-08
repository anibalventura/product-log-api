# Product Log API

[![License](https://img.shields.io/static/v1?label=License&message=MIT&color=blue)](LICENSE.md)

CRUD API for product updates. Built with NodeJS/Express, TypeScript and Prisma as ORM.

## Overview

| Routes                   | Description                               | Request body | Response body    |
| ------------------------ | ----------------------------------------- | ------------ | ---------------- |
| `POST /user`             | Create a new user for API auth token      | Yes          | Bearer Token     |
| `POST /user/login`       | Login existing user to get API auth token | Yes          | Bearer Token     |
| `DELETE /user/:username` | Delete existing user                      | No           | Message object   |
| `GET /product`           | Get all products                          | No           | Array of objects |
| `GET /product/:id`       | Get a single product by id                | No           | Object           |
| `POST /product`          | Create a single product                   | Yes          | Object           |
| `PUT /product/:id`       | Update a single product                   | Yes          | Object           |
| `DELETE /product/:id`    | Delete a single product                   | No           | Object           |
| `GET /update`            | Get all products updates                  | No           | Array of objects |
| `GET /update/:id`        | Get a single product update by id         | No           | Object           |
| `POST /update`           | Create a single product update            | Yes          | Object           |
| `PUT /update/:id`        | Update a single product update            | Yes          | Object           |
| `DELETE /update/:id`     | Delete a single product update            | No           | Object           |

## Usage

Prerequisites:

- [NodeJS](https://nodejs.org/en/) & [NPM](https://www.npmjs.com/)
- Register on [Render](https://render.com/) and then create a free PSQL DB.

### Build & Run

1. Clone and open the project on [Visual Studio Code](https://code.visualstudio.com/) or via terminal.
2. Install dependencies running `npm install`
3. Add DB connection string from [Render](https://render.com/) on `DATABASE_URL` variable to the corresponding `.env` file and on `./prisma/schema.prisma` datasource url.
4. Run prisma migrations with `npx prisma migrate dev --name init`
5. Run the project with `npm run dev`
6. Create a new user and use the returned token as `Bearer Token` for authentication.

NOTE: Check `postman_collection.json` for all available routes.

### Tests

Run all tests with `npm run test` or by file with `npm run test filename.test.ts`.

Check `./tests` folder for unit and integrations tests.

NOTE: Check files and add a valid `Bearer Token` before running tests.

## License

```xml
MIT License

Copyright (c) 2023 Anibal Ventura
```
