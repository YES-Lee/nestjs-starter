import { ApiProperty } from '@nestjs/swagger';

export abstract class IPageResponse<T> {
  @ApiProperty({ description: '总数' })
  count: number;
  abstract rows: T[];
}
