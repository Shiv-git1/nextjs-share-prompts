import mongoose from 'mongoose'

let isConnected = false // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log('👍 MongoDB is already connected!')
    return
  }

  // if not already connected
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
    })

    isConnected = true
    console.log('🚀🚀 MongoDB Connected Successfully...')
  } catch (error) {
    console.log('MongoDB Error: ', error)
  }
}
