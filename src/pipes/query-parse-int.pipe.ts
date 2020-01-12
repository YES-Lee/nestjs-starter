import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

/**
 * 转换query中的数字
 */
@Injectable()
export class QueryParseIntPip implements PipeTransform {
  private transformKeys: string[];

  /**
   *
   * @param keys 需要转换的字段数组
   */
  constructor(keys: string[]) {
    this.transformKeys = keys;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'object') {
      return value;
    }
    const copy = {};
    // tslint:disable-next-line: forin
    for (const k in value) {
      if (this.transformKeys.includes(k)) {
        const newValue = +value[k];
        if (Number.isNaN(newValue)) {
          throw new Error(`value ${value[k]} of key ${k} is not a number`);
        }
        copy[k] = newValue;
      } else {
        copy[k] = value[k];
      }
    }
    return copy;
  }
}
