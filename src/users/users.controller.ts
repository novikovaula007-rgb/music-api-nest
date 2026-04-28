import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';
import type { RequestWithUser } from '../types';

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
  login(@Req() req: RequestWithUser) {
    return req.user;
  }

  @UseGuards(TokenAuthGuard)
  @Delete('sessions')
  async logout(@Req() req: RequestWithUser) {
    const user = req.user;
    user.generateToken();
    await user.save();
    return { message: 'Logged out successfully.' };
  }
}
