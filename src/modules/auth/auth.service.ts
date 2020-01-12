import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: any): string {
    const token =
      'Bearer ' +
      this.jwtService.sign(payload, {
        expiresIn: '30d',
      });

    return token;
  }
}
