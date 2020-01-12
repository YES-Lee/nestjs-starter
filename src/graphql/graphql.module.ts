import { Module } from '@nestjs/common';
import { GraphQLModule as GqlModule } from '@nestjs/graphql';
import { BuildSchemaOptions } from 'type-graphql';
import { ConfigService } from '@nestjs/config';

const buildSchemaOptions: any = {
  nullableByDefault: true, // shema字段默认可为空
};

@Module({
  imports: [
    GqlModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          debug: configService.get('graphql.debug'),
          playground: configService.get('graphql.playground'),
          autoSchemaFile: 'schema.gql',
          buildSchemaOptions: buildSchemaOptions as BuildSchemaOptions,
          context: ({ req }) => ({ req }),
          installSubscriptionHandlers: true,
        };
      },
    }),
  ],
  exports: [GqlModule],
})
export class GraphqlModule {}
