import app from '../../src/app';
import request from 'supertest';
import httpStatus from 'http-status';
import { Response } from 'superagent';

const headers = {
  Accept: 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyYjM4MDgxLWVkODgtNDFkMy05MmZmLWMxN2MyZWRjN2I3OSIsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMDZUMDE6NDk6MzYuMjcxWiIsInVzZXJuYW1lIjoiYW5pYmFsdmVudHVyYSIsInBhc3N3b3JkIjoiJDJiJDEwJGpuWEVNaHRqUDIuUWFoUXNtQ0pjSnVnQmpZdnY1RThkZVRjRkp0SUpOTkVOaExKTHd5NFZLIiwiaWF0IjoxNjczMjg2NDM3fQ.mmhMUGmlKo7b1_7HuSCqvVSwq-N08oisMeL4cS-XQBI',
};
const baseUrl = `/api/update`;

describe('GET /update', () => {
  let response: Response;

  describe('- When route is called', () => {
    beforeAll(async () => {
      response = await request(app).get(baseUrl).set(headers);
    });

    it(`should return a ${httpStatus.OK} status code`, () => {
      expect(response.statusCode).toBe(httpStatus.OK);
    });

    it(`should return an array of objects with update properties`, () => {
      const expectedResult = [
        {
          id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          title: expect.any(String),
          body: expect.any(String),
          status: expect.any(String),
          version: null,
          asset: null,
          productId: expect.any(String),
        },
      ];

      expect(response.body.data[0]).toEqual(expectedResult[0]);
    });
  });
});

describe('GET /update/:id', () => {
  let response: Response;

  describe('- When a correct id is provided', () => {
    beforeAll(async () => {
      const updateId = '9f06363e-6c6d-4a19-a48e-f164751da1e4';
      response = await request(app).get(`${baseUrl}/${updateId}`).set(headers);
    });

    it(`should return a ${httpStatus.OK} status code`, () => {
      expect(response.statusCode).toBe(httpStatus.OK);
    });

    it(`should return an object with product properties`, () => {
      const expectedResult = {
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        title: expect.any(String),
        body: expect.any(String),
        status: expect.any(String),
        version: null,
        asset: null,
        productId: expect.any(String),
      };

      expect(response.body.data).toEqual(expectedResult);
    });
  });

  describe('- When a invalid id is provided', () => {
    beforeAll(async () => {
      const productId = 'f8a5159a-3a90-47f8-8218-1234567';
      response = await request(app).get(`${baseUrl}/${productId}`).set(headers);
    });

    it(`should return a ${httpStatus.NOT_FOUND} status code`, () => {
      expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
    });

    it(`should return a object with a message`, () => {
      const expectedResult = {
        message: 'Update not found',
      };

      expect(response.body).toEqual(expectedResult);
    });
  });
});

describe('POST /update', () => {
  let response: Response;

  describe('- When a valid title, body and productId is provided', () => {
    const update = {
      title: 'Update 1',
      body: 'plop',
      productId: 'f8a5159a-3a90-47f8-8218-260809ca9adb',
    };

    beforeAll(async () => {
      response = await request(app).post(baseUrl).send(update).set(headers);
    });

    it(`should return a ${httpStatus.CREATED} status code`, () => {
      expect(response.statusCode).toBe(httpStatus.CREATED);
    });

    it(`should return an object with update properties`, () => {
      const responseBody = response.body.data;
      const expectedResult = {
        id: responseBody.id,
        createdAt: responseBody.createdAt,
        updatedAt: responseBody.updatedAt,
        title: update.title,
        body: update.body,
        status: responseBody.status,
        version: null,
        asset: null,
        productId: responseBody.productId,
      };

      expect(responseBody).toEqual(expectedResult);
    });

    afterAll(async () => {
      await request(app)
        .delete(`/api/update/${response.body.data.id}`)
        .set(headers);
    });
  });

  describe('- When body is not provided', () => {
    beforeAll(async () => {
      const update = {};
      response = await request(app).post(baseUrl).send(update).set(headers);
    });

    it(`should response with status code of ${httpStatus.BAD_REQUEST}`, async () => {
      expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
    });

    it(`should return an object with the errors property`, async () => {
      expect(response.body.errors).toEqual(expect.any(Array));
    });
  });
});

describe('PUT /update', () => {
  let response: Response;
  let update;

  describe('- When a valid id and name are provided', () => {
    beforeAll(async () => {
      const updateToCreate = {
        title: 'Update 1',
        body: 'plop',
        productId: 'f8a5159a-3a90-47f8-8218-260809ca9adb',
      };
      const createdUpdate = await request(app)
        .post(baseUrl)
        .send(updateToCreate)
        .set(headers);
      update = createdUpdate.body.data;
    });

    beforeAll(async () => {
      response = await request(app)
        .put(`${baseUrl}/${update.id}`)
        .send({ title: 'Update 1 Test Updated' })
        .set(headers);
    });

    it(`should return a ${httpStatus.OK} status code`, () => {
      expect(response.statusCode).toBe(httpStatus.OK);
    });

    it(`should return an object with update properties`, () => {
      const responseBody = response.body.data;
      const expectedResult = {
        id: responseBody.id,
        createdAt: responseBody.createdAt,
        updatedAt: responseBody.updatedAt,
        title: 'Update 1 Test Updated',
        body: update.body,
        status: responseBody.status,
        version: null,
        asset: null,
        productId: responseBody.productId,
      };

      expect(response.body.data).toEqual(expectedResult);
    });

    afterAll(async () => {
      await request(app).delete(`/api/update/${update.id}`).set(headers);
    });
  });
});

describe('DELETE /update/:id', () => {
  let response: Response;
  let update;

  describe('- When a correct id is provided', () => {
    beforeAll(async () => {
      const updateToCreate = {
        title: 'Update 1',
        body: 'plop',
        productId: 'f8a5159a-3a90-47f8-8218-260809ca9adb',
      };
      const createdUpdate = await request(app)
        .post(baseUrl)
        .send(updateToCreate)
        .set(headers);
      update = createdUpdate.body.data;
    });

    beforeAll(async () => {
      response = await request(app)
        .delete(`${baseUrl}/${update.id}`)
        .set(headers);
    });

    it(`should return a ${httpStatus.OK} status code`, () => {
      expect(response.statusCode).toBe(httpStatus.OK);
    });

    it(`should return an object with the deleted updated`, () => {
      const expectedResult = {
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        title: expect.any(String),
        body: expect.any(String),
        status: expect.any(String),
        version: null,
        asset: null,
        productId: expect.any(String),
      };

      expect(response.body.data).toEqual(expectedResult);
    });
  });
});
