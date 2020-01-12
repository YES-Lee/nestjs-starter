import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JWT_KEY } from './constants';
import { GqlAuthGuard } from './graphql.guard';

export const jwtOptions = {
  secret: JWT_KEY,
  signOptions: { expiresIn: '2h', issuer: 'nestapp' },
};

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(jwtOptions),
  ],
  providers: [AuthService, JwtStrategy, GqlAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
