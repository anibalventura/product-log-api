import app from '../../src/app';
import request from 'supertest';
import httpStatus from 'http-status';
import { Response } from 'superagent';

const headers = {
  Accept: 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyYjM4MDgxLWVkODgtNDFkMy05MmZmLWMxN2MyZWRjN2I3OSIsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMDZUMDE6NDk6MzYuMjcxWiIsInVzZXJuYW1lIjoiYW5pYmFsdmVudHVyYSIsInBhc3N3b3JkIjoiJDJiJDEwJGpuWEVNaHRqUDIuUWFoUXNtQ0pjSnVnQmpZdnY1RThkZVRjRkp0SUpOTkVOaExKTHd5NFZLIiwiaWF0IjoxNjczMjg2NDM3fQ.mmhMUGmlKo7b1_7HuSCqvVSwq-N08oisMeL4cS-XQBI',
};

describe('POST /user', () => {
  let response: Response;
  const baseUrl = `/api/user`;

  describe('- When a correct username and password are provided', () => {
    const user = {
      username: `test-user${Math.floor(Math.random() * 11)}`,
      password: 'pass@@123',
    };

    beforeAll(async () => {
      response = await request(app).post(baseUrl).send(user).set(headers);
    });

    it(`should return a ${httpStatus.OK} status code`, () => {
      expect(response.statusCode).toBe(httpStatus.OK);
    });

    it(`should return an object with the token property`, () => {
      const expectedResult = {
        token: expect.any(String),
      };

      expect(response.body).toEqual(expectedResult);
    });

    afterAll(async () => {
      await request(app).delete(`/api/user/${user.username}`).set(headers);
    });
  });

  describe('- When a invalid username or password are provided', () => {
    const payloads = [
      { username: 'an', password: 'pa' },
      { username: 'anibalventura', password: 'ss' },
      { username: 'an', password: 'pass@@123' },
    ];

    it(`should response with status code of ${httpStatus.BAD_REQUEST}`, async () => {
      for (const body of payloads) {
        response = await request(app).post(baseUrl).send(body).set(headers);
        expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
      }
    });

    it(`should return an object with the errors property`, async () => {
      for (const body of payloads) {
        response = await request(app).post(baseUrl).send(body).set(headers);
        expect(response.body.errors).toEqual(expect.any(Array));
      }
    });
  });

  describe('- When username or password are not provided', () => {
    const payloads = [
      {},
      { username: 'anibalventura' },
      { password: 'pass@@123' },
    ];

    it(`should response with status code of ${httpStatus.BAD_REQUEST}`, async () => {
      for (const body of payloads) {
        response = await request(app).post(baseUrl).send(body).set(headers);
        expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
      }
    });

    it(`should return an object with the errors property`, async () => {
      for (const body of payloads) {
        response = await request(app).post(baseUrl).send(body).set(headers);
        expect(response.body.errors).toEqual(expect.any(Array));
      }
    });
  });

  describe('- When a username already exist', () => {
    const user = {
      username: 'anibalventura',
      password: 'pass@3456',
    };

    beforeAll(async () => {
      response = await request(app).post(baseUrl).send(user).set(headers);
    });

    it(`should return a ${httpStatus.CONFLICT} status code`, () => {
      expect(response.statusCode).toBe(httpStatus.CONFLICT);
    });

    it(`should return an object with the message property`, () => {
      const expectedMessage = 'Username already exists';
      expect(response.body.message).toEqual(expectedMessage);
    });
  });
});

describe('POST /user/login', () => {
  let response: Response;
  const baseUrl = `/api/user/login`;

  describe('- When a correct username and password are provided', () => {
    const user = {
      username: 'anibalventura',
      password: 'pass@@123',
    };

    beforeAll(async () => {
      response = await request(app).post(baseUrl).send(user).set(headers);
    });

    it(`should return a ${httpStatus.OK} status code`, () => {
      expect(response.statusCode).toBe(httpStatus.OK);
    });

    it(`should return an object with the token property`, () => {
      const expectedResult = {
        token: expect.any(String),
      };

      expect(response.body).toEqual(expectedResult);
    });
  });

  describe('- When a wrong username and password are provided', () => {
    const user = {
      username: 'test-fail-user',
      password: 'pass@3456',
    };

    beforeAll(async () => {
      response = await request(app).post(baseUrl).send(user).set(headers);
    });

    it(`should return a ${httpStatus.UNAUTHORIZED} status code`, () => {
      expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
    });

    it(`should return an object with the message property`, () => {
      const expectedMessage = 'Invalid credentials';
      expect(response.body.message).toEqual(expectedMessage);
    });
  });

  describe('- When invalid username or password are provided', () => {
    const payloads = [
      { username: 'an', password: 'pa' },
      { username: 'anibalventura', password: 'ss' },
      { username: 'an', password: 'pass@@123' },
    ];

    it(`should response with status code of ${httpStatus.BAD_REQUEST}`, async () => {
      for (const body of payloads) {
        response = await request(app).post(baseUrl).send(body).set(headers);
        expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
      }
    });

    it(`should return an object with the errors property`, async () => {
      for (const body of payloads) {
        response = await request(app).post(baseUrl).send(body).set(headers);
        expect(response.body.errors).toEqual(expect.any(Array));
      }
    });
  });

  describe('- When username or password are not provided', () => {
    const payloads = [
      {},
      { username: 'anibalventura' },
      { password: 'pass@@123' },
    ];

    it(`should response with status code of ${httpStatus.BAD_REQUEST}`, async () => {
      for (const body of payloads) {
        response = await request(app).post(baseUrl).send(body).set(headers);
        expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
      }
    });

    it(`should return an object with the errors property`, async () => {
      for (const body of payloads) {
        response = await request(app).post(baseUrl).send(body).set(headers);
        expect(response.body.errors).toEqual(expect.any(Array));
      }
    });
  });
});

describe('DELETE /user/:username', () => {
  let response: Response;
  const baseUrl = `/api/user`;

  describe('- When a correct username is provided', () => {
    const user = {
      username: `test-user${Math.floor(Math.random() * 11)}`,
      password: 'pass@@123',
    };

    beforeAll(async () => {
      await request(app).post(baseUrl).send(user).set(headers);
      response = await request(app)
        .delete(`${baseUrl}/${user.username}`)
        .set(headers);
    });

    it(`should return a ${httpStatus.OK} status code`, async () => {
      expect(response.statusCode).toBe(httpStatus.OK);
    });

    it(`should return an object with the message property`, async () => {
      const expectedMessage = 'User deleted successfully';
      expect(response.body.message).toEqual(expectedMessage);
    });
  });

  describe('- When a wrong username is provided', () => {
    const username = 'dontexistuser';

    beforeAll(async () => {
      response = await request(app)
        .delete(`${baseUrl}/${username}`)
        .set(headers);
    });

    it(`should return a ${httpStatus.NOT_FOUND} status code`, async () => {
      expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
    });

    it(`should return an object with the message property`, async () => {
      const expectedMessage = 'Username not exist';
      expect(response.body.message).toEqual(expectedMessage);
    });
  });

  describe('- When a invalid username is provided', () => {
    const payloads = ['an', 'asdfghjklqwertyuiopas'];

    it(`should return a ${httpStatus.BAD_REQUEST} status code`, async () => {
      for (const body of payloads) {
        response = await request(app).post(baseUrl).send(body).set(headers);
        expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
      }
    });

    it(`should return an object with the errors property`, async () => {
      for (const body of payloads) {
        response = await request(app).post(baseUrl).send(body).set(headers);
        expect(response.body.errors).toEqual(expect.any(Array));
      }
    });
  });
});
