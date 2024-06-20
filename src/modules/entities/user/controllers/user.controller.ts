import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/user.create.dto';
import { ApiBearerAuth, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/user.update.dto';
import { User } from '../entity/user.entity';
import { JwtAuthGuard } from '../../../security/auth/guards/jwt.guard';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiResponse({
    type: OmitType(User, ['password_hash', 'password_salt']),
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }

  @ApiResponse({
    type: OmitType(User, ['password_hash', 'password_salt']),
  })
  @Get('email/:email')
  @HttpCode(HttpStatus.OK)
  async findOneByMail(@Param('email') email: string) {
    return this.userService.findOneByMail(email);
  }

  @ApiResponse({
    type: [OmitType(User, ['password_hash', 'password_salt'])],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.userService.findAll();
  }

  @ApiResponse({
    type: OmitType(User, ['password_hash', 'password_salt']),
  })
  @Get('phone/:phone')
  @HttpCode(HttpStatus.OK)
  async findOneByPhone(@Param('phone') phone: string) {
    return this.userService.findOneByPhone(phone);
  }

  @ApiResponse({
    type: [OmitType(User, ['password_hash', 'password_salt'])],
  })
  @Get('username/:username')
  @HttpCode(HttpStatus.OK)
  async findOneByUsername(@Param('username') username: string) {
    return this.userService.findOneByUsername(username);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  @Put()
  @HttpCode(HttpStatus.ACCEPTED)
  async update(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    return await this.userService.update(req.user.id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Request() req) {
    return await this.userService.remove(req.user.id);
  }
}
