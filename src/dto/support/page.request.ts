import { ApiProperty } from '@nestjs/swagger';
import { UsePipes, ParseIntPipe } from '@nestjs/common';

export abstract class IPageRequest {
  @ApiProperty({
    description: '当前页码',
    required: false,
    default: 1,
    minimum: 1,
  })
  page: number;
  @ApiProperty({
    description: '每页数量',
    required: false,
    default: 10,
    minimum: 0,
  })
  pageSize: number;
}
