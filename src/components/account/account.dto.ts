import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email cannot be empty" })
  email: string;

  @IsString({ message: "First name must be a string" })
  @IsNotEmpty({ message: "First name cannot be empty" })
  firstname: string;

  @IsString({ message: "Last name must be a string" })
  @IsNotEmpty({ message: "Last name cannot be empty" })
  lastname: string;

  @IsString({ message: "Password must be a string" })
  @IsNotEmpty({ message: "Password cannot be empty" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  password: string;
}

export class LoginDto {
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email cannot be empty" })
  email: string;

  @IsString({ message: "Password must be a string" })
  @IsNotEmpty({ message: "Password cannot be empty" })
  password: string;
}
