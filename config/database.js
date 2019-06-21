import mongoose from 'mongoose'
import Promise from 'bluebird'

mongoose.Promise = Promise

mongoose.connection.on('error', (error) => {
  console.log('CONNECTION_MONGODB_ERROR:', error)
});

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

export default mongoose