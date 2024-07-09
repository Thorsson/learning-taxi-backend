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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/user.update.dto';
import { JwtAuthGuard } from '../../../security/auth/guards/jwt.guard';
import { UserResetPasswordDto } from '../dto/user.reset-password.dto';
import { UserGetInfoDto } from '../dto/user.get-info.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiResponse({
    type: UserGetInfoDto,
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }

  @ApiResponse({
    type: UserGetInfoDto,
  })
  @Get('email/:email')
  async findOneByMail(@Param('email') email: string) {
    return this.userService.findOneByMail(email);
  }

  @ApiResponse({
    type: [UserGetInfoDto],
  })
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiResponse({
    type: UserGetInfoDto,
  })
  @Get('phone/:phone')
  async findOneByPhone(@Param('phone') phone: string) {
    return this.userService.findOneByPhone(phone);
  }

  @ApiResponse({
    type: [UserGetInfoDto],
  })
  @Get('username/:username')
  async findOneByUsername(@Param('username') username: string) {
    return this.userService.findOneByUsername(username);
  }

  @ApiResponse({
    status: 202,
    description: 'The record has been successfully updated.',
  })
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

  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Request() req) {
    return await this.userService.remove(req.user.id);
  }

  @ApiResponse({
    status: 202,
    description: 'The record has been successfully updated.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('reset-password')
  @HttpCode(HttpStatus.ACCEPTED)
  async updatePassword(
    @Body() { currentPassword, newPassword }: UserResetPasswordDto,
    @Request() req,
  ) {
    return await this.userService.updatePassword(
      req.user.id,
      currentPassword,
      newPassword,
    );
  }
}
