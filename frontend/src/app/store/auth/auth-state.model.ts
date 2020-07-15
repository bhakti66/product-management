import { User } from "../../models/user";

export class AuthStateModel {
  token?: string;
  user?: User;
}
