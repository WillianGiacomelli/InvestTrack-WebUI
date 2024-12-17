import { User } from "./user";

export class SignInUserResponse{
  error!: boolean;
  message!: string;
  auth!: User
}
