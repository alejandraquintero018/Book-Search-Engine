const { Book, User } = require('../models'); 
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = { 
    Query: { 
        users: async () => {
            return User.find().populate('users')
        },
        books: async () => { 
            return User.find().populate('books'); 
        },
        me: 
    }, 
     
    Mutations: { 
        addUser: async (parent, { username, email, password, }) => { 
            const user = await User.create({ username, email, password }); 
            const token = signToken(user); 
            return { user, token }; 
        }, 
        login: async (parent, { email, password }) => { 
            const user = await User.findOne({ email }); 

            if(!user) { 
                throw new AuthenticationError('This user has not been created yet')
            }

            const correctPassword = await user.isCorrectPassword(password); 

            if(!correctPassword) { 
                throw new AuthenticationError("Incorrect password"); 
            }

            const token = signToken(user); 

            return { token, user } 
        }, 
        saveBook: {

        }, 
        removeBook: async (parent, {})
    }
}

module.exports = resolvers; 