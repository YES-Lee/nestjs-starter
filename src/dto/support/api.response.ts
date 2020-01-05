import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {

  /**
   * 错误码，只在异常时返回错误码
   */
  @ApiProperty({ description: '错误码，只在异常时返回错误码' })
  private error_code: number;
  /**
   * 错误信息，只在异常时返回错误信息
   */
  @ApiProperty({ description: '错误信息，只在异常时返回错误信息' })
  private error_message: string;
  /**
   * 请求时间戳
   */
  @ApiProperty({ description: '请求时间戳' })
  private timestamp: number;
  /**
   * 响应数据
   */
  @ApiProperty({ description: '响应数据' })
  private data: T;

  constructor() {
    this.timestamp = new Date().getTime();
  }

  getErrorCode(): number {
    return this.error_code;
  }
  setErrorCode(error_code: number): ApiResponse<T> {
    this.error_code = error_code;
    return this;
  }

  getErrorMessage(): string {
    return this.error_message;
  }
  setErrorMessage(error_message: string): ApiResponse<T> {
    this.error_message = error_message;
    return this;
  }

  getTimestamp(): number {
    return this.timestamp;
  }
  setTimestamp(timestamp: number): ApiResponse<T> {
    this.timestamp = timestamp;
    return this;
  }

  getData(): T {
    return this.data;
  }
  setData(data: T): ApiResponse<T> {
    this.data = data;
    return this;
  }

  static success<T>(data: T): ApiResponse<T> {
    return new ApiResponse<T>().setData(data);
  }

  static error(error_code: number, error_message: string) {
    return new ApiResponse<any>().setErrorCode(error_code).setErrorMessage(error_message);
  }
}
