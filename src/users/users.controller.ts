import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Post()
  registerUser(@Body() createUserDto: CreateUserDto) {
    const user = new this.userModel({
      email: createUserDto.email,
      password: createUserDto.password,
      displayName: createUserDto.displayName,
      role: createUserDto.role || 'user',
    });
    user.generateToken();
    return user.save();
  }

  @UseGuards(AuthGuard('local'))
  @Post('sessions')
  login(@Body() userDto: { user: User }) {
    return userDto.user;
  }
}
