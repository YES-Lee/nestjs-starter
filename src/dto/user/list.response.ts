import { IPageResponse } from '../support/page.response';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '../../database/models/user.model';

export class UserListResponse extends IPageResponse<UserModel> {
  @ApiProperty({ type: [UserModel] })
  rows: UserModel[];
}
