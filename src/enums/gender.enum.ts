import { registerEnumType } from 'type-graphql';

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

registerEnumType(GenderEnum, {
  name: 'GenderEnum',
});
