export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    author: Author
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game
    author: Author
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    game: Game
  }
  type Query {
    games: [Game]
    game(id:ID!):Game
    reviews: [Review]
    review(id:ID!):Review
    authors: [Author]
    author(id:ID!):Author
  }
  type Mutation {
  addGame(title: String!, platform: [String!]!): Game
  addAuthor(name: String!, verified: Boolean!): Author
  addReview(rating: Int!, content: String!): Review
  }
`