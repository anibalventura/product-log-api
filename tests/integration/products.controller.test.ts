import app from '../../src/app';
import request from 'supertest';
import httpStatus from 'http-status';
import { Response } from 'superagent';

const headers = {
  Accept: 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyYjM4MDgxLWVkODgtNDFkMy05MmZmLWMxN2MyZWRjN2I3OSIsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMDZUMDE6NDk6MzYuMjcxWiIsInVzZXJuYW1lIjoiYW5pYmFsdmVudHVyYSIsInBhc3N3b3JkIjoiJDJiJDEwJGpuWEVNaHRqUDIuUWFoUXNtQ0pjSnVnQmpZdnY1RThkZVRjRkp0SUpOTkVOaExKTHd5NFZLIiwiaWF0IjoxNjczMjg2NDM3fQ.mmhMUGmlKo7b1_7HuSCqvVSwq-N08oisMeL4cS-XQBI',
};
const baseUrl = `/api/product`;

describe('GET /product', () => {
  let response: Response;

  describe('- When route is called', () => {
    beforeAll(async () => {
      response = await request(app).get(baseUrl).set(headers);
    });

    it(`should return a ${httpStatus.OK} status code`, () => {
      expect(response.statusCode).toBe(httpStatus.OK);
    });

    it(`should return an array of objects with products properties`, () => {
      const expectedResult = [
        {
          id: expect.any(String),
          createdAt: expect.any(String),
          name: expect.any(String),
          belongsToId: expect.any(String),
        },
      ];

      expect(response.body.data[0]).toEqual(expectedResult[0]);
    });
  });
});

describe('GET /product/:id', () => {
  let response: Response;

  describe('- When a correct id is provided', () => {
    beforeAll(async () => {
      const productId = 'f8a5159a-3a90-47f8-8218-260809ca9adb';
      response = await request(app).get(`${baseUrl}/${productId}`).set(headers);
    });

    it(`should return a ${httpStatus.OK} status code`, () => {
      expect(response.statusCode).toBe(httpStatus.OK);
    });

    it(`should return an object with product properties`, () => {
      const expectedResult = {
        id: expect.any(String),
        createdAt: expect.any(String),
        name: expect.any(String),
        belongsToId: expect.any(String),
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
        message: 'Product not found',
      };

      expect(response.body).toEqual(expectedResult);
    });
  });
});

describe('POST /product', () => {
  let response: Response;

  describe('- When a valid name is provided', () => {
    const product = {
      name: 'Product 1 Test',
    };

    beforeAll(async () => {
      response = await request(app).post(baseUrl).send(product).set(headers);
    });

    it(`should return a ${httpStatus.CREATED} status code`, () => {
      expect(response.statusCode).toBe(httpStatus.CREATED);
    });

    it(`should return an object with product properties`, () => {
      const expectedResult = {
        id: expect.any(String),
        createdAt: expect.any(String),
        name: product.name,
        belongsToId: expect.any(String),
      };

      expect(response.body.data).toEqual(expectedResult);
    });

    afterAll(async () => {
      await request(app)
        .delete(`/api/product/${response.body.data.id}`)
        .set(headers);
    });
  });

  describe('- When a invalid name is provided', () => {
    const payloads = [{ name: 'an' }, { name: 'a' }];

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

  describe('- When name is not provided', () => {
    beforeAll(async () => {
      const product = {};
      response = await request(app).post(baseUrl).send(product).set(headers);
    });

    it(`should response with status code of ${httpStatus.BAD_REQUEST}`, async () => {
      expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
    });

    it(`should return an object with the errors property`, async () => {
      expect(response.body.errors).toEqual(expect.any(Array));
    });
  });
});

describe('PUT /product', () => {
  let response: Response;
  let product;

  describe('- When a valid id and name are provided', () => {
    beforeAll(async () => {
      const productToCreate = {
        name: 'Product 1 Test',
      };
      const createdProduct = await request(app)
        .post(baseUrl)
        .send(productToCreate)
        .set(headers);
      product = createdProduct.body.data;
    });

    beforeAll(async () => {
      response = await request(app)
        .put(`${baseUrl}/${product.id}`)
        .send({ name: 'Product 1 Test Updated' })
        .set(headers);
    });

    it(`should return a ${httpStatus.OK} status code`, () => {
      expect(response.statusCode).toBe(httpStatus.OK);
    });

    it(`should return an object with product properties`, () => {
      const expectedResult = {
        id: product.id,
        createdAt: product.createdAt,
        name: 'Product 1 Test Updated',
        belongsToId: expect.any(String),
      };

      expect(response.body.data).toEqual(expectedResult);
    });

    afterAll(async () => {
      await request(app).delete(`/api/product/${product.id}`).set(headers);
    });
  });

  // describe('- When a invalid id is provided', () => {
  //   beforeAll(async () => {
  //     response = await request(app)
  //       .put(`${baseUrl}/123`)
  //       .send({ name: 'Product 1 Test Updated' })
  //       .set(headers);
  //   });

  //   it(`should return a ${httpStatus.NOT_FOUND} status code`, () => {
  //     expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
  //   });

  //   it(`should return a object with a message`, () => {
  //     const expectedResult = {
  //       message: 'Product not found',
  //     };

  //     expect(response.body).toEqual(expectedResult);
  //   });
  // });

  describe('- When a invalid name is provided', () => {
    beforeAll(async () => {
      const productToCreate = {
        name: 'Product 1 Test',
      };
      const createdProduct = await request(app)
        .post(baseUrl)
        .send(productToCreate)
        .set(headers);
      product = createdProduct.body.data;
    });

    const payloads = [{ name: 'an' }, { name: 'a' }];

    it(`should response with status code of ${httpStatus.BAD_REQUEST}`, async () => {
      for (const body of payloads) {
        response = await request(app)
          .put(`${baseUrl}/${product.id}`)
          .send(body)
          .set(headers);
        expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
      }
    });

    it(`should return an object with the errors property`, async () => {
      for (const body of payloads) {
        response = await request(app)
          .put(`${baseUrl}/${product.id}`)
          .send(body)
          .set(headers);
        expect(response.body.errors).toEqual(expect.any(Array));
      }
    });
  });

  describe('- When name is not provided', () => {
    beforeAll(async () => {
      response = await request(app)
        .put(`${baseUrl}/${product.id}`)
        .send({})
        .set(headers);
    });

    it(`should response with status code of ${httpStatus.BAD_REQUEST}`, async () => {
      expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
    });

    it(`should return an object with the errors property`, async () => {
      expect(response.body.errors).toEqual(expect.any(Array));
    });
  });
});

describe('DELETE /product/:id', () => {
  let response: Response;
  let product;

  describe('- When a correct id is provided', () => {
    beforeAll(async () => {
      const productToCreate = {
        name: 'Product 1 Test',
      };
      const createdProduct = await request(app)
        .post(baseUrl)
        .send(productToCreate)
        .set(headers);
      product = createdProduct.body.data;
    });

    beforeAll(async () => {
      response = await request(app)
        .delete(`${baseUrl}/${product.id}`)
        .set(headers);
    });

    it(`should return a ${httpStatus.OK} status code`, () => {
      expect(response.statusCode).toBe(httpStatus.OK);
    });

    it(`should return an object with the deleted product`, () => {
      const expectedResult = {
        id: product.id,
        createdAt: product.createdAt,
        name: product.name,
        belongsToId: product.belongsToId,
      };

      expect(response.body.data).toEqual(expectedResult);
    });
  });

  // describe('- When a invalid id is provided', () => {
  //   beforeAll(async () => {
  //     const productId = 'f8a5159a-3a90-47f8-8218-1234567';
  //     response = await request(app)
  //       .delete(`${baseUrl}/${productId}`)
  //       .set(headers);
  //   });

  //   it(`should return a ${httpStatus.NOT_FOUND} status code`, () => {
  //     expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
  //   });

  //   it(`should return a object with a message`, () => {
  //     const expectedResult = {
  //       message: 'Product not found',
  //     };

  //     expect(response.body).toEqual(expectedResult);
  //   });
  // });
});
