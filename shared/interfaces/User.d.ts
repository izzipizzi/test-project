export declare enum UserRole {
    REGULAR = "REGULAR",
    ADMIN = "ADMIN"
}
export interface UserLoginDto {
    password: string;
    nickname: string;
}
export interface User extends UserLoginDto {
    _id: string;
    avatar: string;
    role: UserRole;
}
export interface UserResponseDto extends Omit<User, 'password'> {
}
