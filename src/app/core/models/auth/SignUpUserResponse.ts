import { User } from "./user";

export class SignUpUserResponse{
  error!: boolean;
  message!: string;
  auth!: User
}
