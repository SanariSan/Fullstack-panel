import { DBPoolConnectionManager } from '../init.db';
import { USER as sql } from '../sql';

type TUser = { id: number; email: string; username: string; passwordhash: string };

class UserRepository {
  private static getConnection() {
    return DBPoolConnectionManager.getInstance().getPool();
  }

  static findByEmail({ email }: { email: string }) {
    return this.getConnection().one<TUser>(sql.findByEmail, [email]);
  }

  static findByUsername({ username }: { username: string }) {
    return this.getConnection().one<TUser>(sql.findByUsername, [username]);
  }

  static findByEmailAndUsername({ email, username }: { email: string; username: string }) {
    return this.getConnection().one<TUser>(sql.findByEmailAndUsername, [email, username]);
  }

  static findNoneByEmailAndUsername({ email, username }: { email: string; username: string }) {
    return this.getConnection().none(sql.findByEmailAndUsername, [email, username]);
  }

  static insert({
    email,
    username,
    hashedPassword,
  }: {
    email: string;
    username: string;
    hashedPassword: string;
  }) {
    return this.getConnection().one<TUser>(sql.insert, [email, username, hashedPassword]);
  }
}

export { UserRepository };

/**
 *    import { errors } from 'pg-promise';
 *    
 *    const errorCast = error as errors.QueryResultError;
      if (errorCast.code === errors.queryResultErrorCode.noData) {
        // expected some data, got none
      } else if (errorCast.code === errors.queryResultErrorCode.multiple) {
        // expected just a single record, got multiple records
      } else if (errorCast.code === errors.queryResultErrorCode.notEmpty) {
        // expected no data, got something
      } else {
        // syntax error
      }
 */
