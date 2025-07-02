export interface User {
  /** Unique account username */
  username: string;
  /** Hex encoded password hash */
  passwordHash: string;
  /** Per-user random salt used for hashing */
  salt: string;
}
