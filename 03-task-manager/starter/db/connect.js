const mongoose = require('mongoose');
const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB


//const connectonString = mongodb+srv://renewed:<db_password>@nodeexpressprojects.zox2p.mongodb.net/?retryWrites=true&w=majority&appName=NodeExpressProjects