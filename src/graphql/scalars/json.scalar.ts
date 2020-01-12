import { GraphQLScalarType } from 'graphql';

export const GQLJson = new GraphQLScalarType({
  name: 'GQLJson',
  description: 'JSON',
  /**
   * value from the client input variables
   * @param value value from the client input variables
   */
  parseValue(value: object) {
    return value;
  },
  /**
   * value sent to the client
   * @param value value sent to the client
   */
  serialize(value: object) {
    return value;
  },
  /**
   * value from the client query
   * @param ast value from the client query
   */
  parseLiteral(ast: any) {
    return ast.value;
  },
});
