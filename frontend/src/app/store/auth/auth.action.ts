import { User } from "../../models/user";

export class Login {
    static readonly type = "[Auth] Login";
    constructor(public payload: { email: string; password: string }) { }
}

export class RegisterUser {
    static readonly type = "[Auth] RegisterUser"
    constructor(public payload: User) { }
}

export class CurrentUser{
    static readonly type = "[Auth] CurrentUser";
    constructor(public payload: { email: string}) { }
}