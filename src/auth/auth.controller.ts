import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { UserRole } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ✅ User Signup Route
  @Post('signup')
  signup(@Body() body: { email: string; password: string; role?: UserRole }) {
    return this.authService.signup(body.email, body.password, body.role || UserRole.USER);
  }

  // ✅ User Login Route (Returns Access Token & Refresh Token)
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  // ✅ Refresh Token Route
  @Post('refresh-token')
  refreshToken(@Body() body: { token: string }) {
    return this.authService.refreshToken(body.token);
  }

  // ✅ Get Profile (Protected Route, Requires JWT)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return { message: 'Authenticated User', user: req.user };
  }

  // ✅ Admin-Only Route (Multi-Role Authorization)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN) // Only Admin can access
  @Get('admin')
  adminOnly(@Request() req) {
    return { message: 'Admin Access Granted', user: req.user };
  }
}
