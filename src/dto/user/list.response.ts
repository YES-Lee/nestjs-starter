import { IPageResponse } from '../support/page.response';
import { UserDetailResponse } from './user-detail.response';
import { ApiProperty } from '@nestjs/swagger';

export class UserListResponse extends IPageResponse<UserDetailResponse> {
  @ApiProperty({ type: [UserDetailResponse] })
  rows: UserDetailResponse[];
}
