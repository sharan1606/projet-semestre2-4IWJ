import { IUser } from '../../src/models/userModel';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;  // On ajoute la propriété `user` de type `IUser`
  }
}
