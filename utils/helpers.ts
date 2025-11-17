import { User } from '../models/User';

/**
 * Generates a random user with a unique email, first name, and last name.
 * @returns A new User object with randomly generated data.
 */
export function generateRandomUser(): User {
  const randomString = Math.random().toString(36).substring(7);
  const email = `test_${randomString}@test.com`;
  const firstName = `FirstName_${randomString}`;
  const lastName = `LastName_${randomString}`;
  const password = `Password123qwerty!`;
  
  return new User(
    email,
    password,
    firstName,
    lastName
  );
}

