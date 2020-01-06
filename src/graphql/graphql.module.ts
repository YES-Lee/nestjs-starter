import { Module } from '@nestjs/common';
import { GraphQLModule as GqlModule } from '@nestjs/graphql';
import { BuildSchemaOptions } from 'type-graphql';

const buildSchemaOptions: any = {
  nullableByDefault: true // shema字段默认可为空
};

@Module({
  imports: [
    GqlModule.forRoot({
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: buildSchemaOptions as BuildSchemaOptions,
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true
    }),
  ],
  exports: [
    GqlModule
  ]
})
export class GraphqlModule {}
