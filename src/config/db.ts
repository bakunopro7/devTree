import mongoose from 'mongoose';

export const connectDB =  async () => {
    try {
        const url = 'mongodb+srv://root:eZUtOaKLols4ISxo@cluster0.bxi6u.mongodb.net/linktree_node_typescript    '
        const connection = await mongoose.connect(url)
        const url2 =  `${connection.connection.host}:${connection.connection.port}`
        console.log(`Connected to mongodb+srv: ${url2}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}