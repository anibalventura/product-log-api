import { JwtPayload } from 'jsonwebtoken';
import {
  createJWT,
  verifyJWT,
  comparePassword,
  hashPassword,
} from './../../src/helpers/auth.helper';

describe('createJWT', () => {
  describe('- When data is provided', () => {
    const data: string = 'test';
    const jwt: string = createJWT(data);

    it(`should return a valid JWT`, () => {
      const jwtResult: string =
        'eyJhbGciOiJIUzI1NiJ9.dGVzdA.d2BYzI0IABGeOzvuWvwfs2AF4Dim4JnqWooX31RYNYQ';
      expect(jwt).toEqual(jwtResult);
    });
  });

  describe('- When data is not provided', () => {
    const data = null;
    const jwt: string = createJWT(data);

    it(`should return a "No data provided" message`, () => {
      const message: string = 'No data provided';
      expect(jwt).toEqual(message);
    });
  });
});

describe('verifyJWT', () => {
  describe('- When token is provided', () => {
    const content: string = 'test';
    const jwt: string =
      'eyJhbGciOiJIUzI1NiJ9.dGVzdA.d2BYzI0IABGeOzvuWvwfs2AF4Dim4JnqWooX31RYNYQ';
    const token: string | JwtPayload = verifyJWT(jwt);

    it(`should return token content`, () => {
      expect(token).toEqual(content);
    });
  });

  describe('- When token is not provided', () => {
    const jwt = undefined;
    const token: string | JwtPayload = verifyJWT(jwt);

    it(`should return a "No token provided" message`, () => {
      const message: string = 'No token provided';
      expect(token).toEqual(message);
    });
  });
});

describe('comparePassword', () => {
  describe('- When correct password and hash are provided', () => {
    const password: string = 'test@@123';

    it(`should return true`, async () => {
      const hash: string = await hashPassword(password);
      const comparePasswordResult: boolean = await comparePassword(
        password,
        hash
      );
      expect(comparePasswordResult).toEqual(true);
    });
  });

  describe('- When incorrect password and hash are provided', () => {
    const password: string = 'test@@123';
    const hash: string = 'test@@1234';

    it(`should return false`, async () => {
      const comparePasswordResult: boolean = await comparePassword(
        password,
        hash
      );
      expect(comparePasswordResult).toEqual(false);
    });
  });

  describe('- When password or hash are not provided', () => {
    const password = undefined;
    const hash = undefined;

    it(`should return false`, async () => {
      const comparePasswordResult: boolean = await comparePassword(
        password,
        hash
      );
      expect(comparePasswordResult).toEqual(false);
    });
  });
});

describe('hashPassword', () => {
  describe('- When password is provided', () => {
    const password: string = 'test@@123';

    it(`should return a string`, async () => {
      const hash: string = await hashPassword(password);
      expect(hash).toEqual(expect.any(String));
    });
  });

  describe('- When password is not provided', () => {
    const password = undefined;

    it(`should return an empty string`, async () => {
      const hash: string = await hashPassword(password);
      expect(hash).toEqual('');
    });
  });
});
