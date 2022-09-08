import mongoose  from "mongoose";
import config from "config";

//get the connection string
const db = config.get('mongoURL');

//connect to mongoDB
const connectDatabase = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true
        });
        console.log('Connected to mongoDB');
    } catch(error) {
        console.error(error.message);

        //Exit with failure code
        process.exit(1);
    }
};

export default connectDatabase;