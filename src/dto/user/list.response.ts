import { IPageResponse } from '../support/page.response';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../database/entities/user.entity';

export class UserListResponse extends IPageResponse<UserEntity> {
  @ApiProperty({ type: [UserEntity] })
  rows: UserEntity[];
}
