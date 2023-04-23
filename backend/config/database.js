const mongoose = require('mongoose');

const dotenv = require('dotenv');
//config
dotenv.config({ path: 'backend/config/config.env' });

// console.log(process.env.DB_URI);

const connectDatabase = () => {
  mongoose.set('strictQuery', true);
  mongoose.connect(process.env.DB_URI).then(data => {
    console.log(`mongodb connected with server : ${data.connection.host}`);
  });

  //catch will be handled in server.js file by unhandledRejection
};
module.exports = connectDatabase;
