export interface UserLoginData {
  password: string;
  nickname: string;
}

export interface IUser extends UserLoginData {
  id: string;
  avatar: string;
}

export interface UserResponseData extends Omit<IUser, 'password'> {}
