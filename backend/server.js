const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const HapiCors = require('hapi-cors');

const User = require('./models/user');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register({
        plugin: HapiCors,
        options: {
            origins: ['http://localhost:52253'], 
            methods: ['POST'], 
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);

    await mongoose.connect('mongodb://127.0.0.1:27017/registration', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    server.route({
        method: 'POST',
        path: '/api/register',
        handler: async (request, h) => {
            try {
                const userData = new User(request.payload);
                console.log("connected");
                const savedUser = await userData.save();
                console.log(savedUser);
                return savedUser;
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/api/users',
        handler: async (request, h) => {
            try {
                const allUsers = await User.find();
                // allUsers.reverse();
                return allUsers;
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    });
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
