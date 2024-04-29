  import { ApolloServer } from '@apollo/server';
  import { startStandaloneServer } from '@apollo/server/standalone';
  import { typeDefs } from './schema.js';
  import {games, authors, reviews} from './db.js';

  const resolvers = {
    Query: {  
      games: () => games,
      reviews: () => {
        console.log('fetching reviews');
        return reviews;
      },
      authors: () => authors,
      game: (_, args) =>{
        return games.find(game => game.id === args.id);
      },
      review: (_, args) =>{
        return reviews.find(review => review.id === args.id);
      },
      author: (_, args) =>{
        return authors.find(author => author.id === args.id);
      } 
    },
    Author: {
      game: (parent) => {
        console.log('fetching game');
        return games.find(game => game.id === parent.game_id);
      }
    } ,
    Review :{
      author: (parent) =>{
        return authors.find(author => author.id === parent.author_id);
      },
    },
    Mutation :{
      addGame:(_,args) =>{
        console.log('adding game');
        games.push({id: String(games.length + 1), title: args.title, platform: args.platform});
        return games[games.length - 1];
      }
    }
  };

  const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    
    console.log(`🚀  Server ready at: ${url}`);