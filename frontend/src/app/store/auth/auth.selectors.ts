import { Selector } from "@ngxs/store";
import { AuthStateModel } from "./auth-state.model";
import { AuthState } from "./auth.state";
import { User } from "../../models/user";

export class AuthSelectors {
    @Selector([AuthState])
    static currentUser(state: AuthStateModel): User {
      return state.user;
    }
  
    @Selector([AuthState])
    static token(state: AuthStateModel): string {
      return state.token;
    }
  }