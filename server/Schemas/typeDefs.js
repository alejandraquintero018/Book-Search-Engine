const { gql } = require('apollo-server-express');

const typeDefs = gql`

 type User = {
    _id: ID 
    username: String
    email: String
    password: String
    bookCount: String
    savedBooks:[Book]!
 } 

 type Book = {
    bookId: ID
    description: String
    image: String
    link: String 
    title: String 
 } 

 type Mutation = {
 addUser(username: String!, email: String!, password: String!): Auth 
 login(email: String!, passowrd: String!): Auth 
 saveBook(bookId: ID!): User
 removeBook(bookId: ID!): User
 }


 type Query = {
    users: [User]
    user:(username: String!): User
    me: User 
 } 

 type Auth = {
 token: ID! 
 user: User
 }
`;

module.exports = typeDefs 