import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Books = () => (
  <Query
    query={
      /* GraphQLのクエリ */
      gql`
        {
          books {
            title
            author
            price
          }
        }
      `
    }
  >
    {/* GraphQLのクエリの実行結果の処理、成功したら結果を表示 */}
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;
      return data.books.map(course => (
        <div key={course.title}>
          <p>title: {`${course.title}`}</p>
          <p>author: {`${course.author}`}</p>
          <p>price: {`${course.price}`}</p>
          <hr />
        </div>
      ));
    }}
  </Query>
);
export default Books;
