export class CreateUserDto {
  email: string;
  password: string;
  displayName?: string;
  role?: ['user', 'admin'];
}
