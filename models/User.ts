/**
 * Represents a user with credentials and optional personal information.
 */
export class User {
    /**
     * @param username The user's email address or username.
     * @param password The user's password.
     * @param firstName The user's first name (optional).
     * @param lastName The user's last name (optional).
     */
    constructor(
      public username: string,
      public password: string,
      public firstName?: string,
      public lastName?: string
    ) {}
  }