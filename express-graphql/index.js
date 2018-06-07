require("dotenv/config"); // .envの環境変数の読み込み
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloEngine } = require("apollo-engine");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { APOLLO_ENGINE_API_KEY } = process.env;

// モックデータ
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: "J.K. Rowling",
    price: 2000
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
    price: 3000
  }
];

// GraphQLのスキーマ情報
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String, price: Int }
`;

// resolver(データ処理)の設定
// DBからデータを取得したり、APIを呼び出したりする処理もここで記述
const resolvers = {
  Query: { books: () => books }
};

// GraphQL の Schema 設定
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Expressの初期化
const app = express();

// Cross-origin resource sharing (CORS) の設定
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// GraphQLのエンドポイントの追加
app.use(
  "/graphql",
  bodyParser.json(),
  cors(corsOptions),
  graphqlExpress({ schema })
);

// GraphiQLのエンドポイントの追加 (テストで使う GraphQLのWeb GUI)
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Apollo Engineのインスタンスの作成
const engine = new ApolloEngine({
  apiKey: APOLLO_ENGINE_API_KEY,
  // メモリキャッシュの設定
  stores: [
    {
      name: "inMemEmbeddedCache",
      inMemory: {
        cacheSize: 104857600 // 100 MB、デフォルトは50MB
      }
    }
  ],
  logging: {
    level: "INFO" // ログの設定変更。DEBUGにするとより細かい情報を確認できます
  }
});

// サーバの起動
engine.listen({
  port: 4000,
  expressApp: app
});

module.exports = engine;
