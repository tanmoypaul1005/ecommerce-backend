export class RegisterDto {
  name: string;
  email: string;
  password: string;
  userType?: 'CUSTOMER' | 'ADMIN' | 'SUPER_ADMIN' | 'DELIVERYMAN';
}
