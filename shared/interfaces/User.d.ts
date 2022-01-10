export interface UserLoginDto {
    password: string;
    nickname: string;
}
export interface User extends UserLoginDto {
    _id: string;
    avatar: string;
}
export interface UserResponseDto extends Omit<User, 'password'> {
}
