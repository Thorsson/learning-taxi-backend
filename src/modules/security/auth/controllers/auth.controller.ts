import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../guards/local.guard';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../dto/user.login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: UserLoginDto, @Request() req) {
    return this.authService.login(req.user);
  }
}
