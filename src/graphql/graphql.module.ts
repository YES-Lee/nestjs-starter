import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BuildSchemaOptions } from 'type-graphql';

const buildSchemaOptions: any = {
  nullableByDefault: true // shema字段默认可为空
};

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: buildSchemaOptions as BuildSchemaOptions,
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true
    }),
  ],
  exports: [
    GraphQLModule
  ]
})
export class GraphqlModule {}
