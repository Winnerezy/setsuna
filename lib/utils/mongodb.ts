import mongoose from "mongoose"

export const mongodb = async() => {
   
    try {
       const URL = process.env.MONGODB_URL;
      await mongoose.connect(URL);  
     return console.log('Mongodb connected')
    } catch (error) {
        console.error(error);
    }
    
}
