import {MongoClient} from "mongodb";
const url = "mongodb+srv://wellsbabo:29BoSxTyD623mm9k@forum.mwvn9vv.mongodb.net/?retryWrites=true&w=majority"
const options = {useNewUrlParser: true}
let connectDB : any;

if(process.env.NODE_ENV === 'development'){
    let globalWithMongo = global as typeof globalThis & { _mongo: MongoClient }
    if(!globalWithMongo._mongo){
        // @ts-ignore
        globalWithMongo._mongo = new MongoClient(url).connect()
    }
    connectDB = globalWithMongo._mongo
} else{
    connectDB = new MongoClient(url).connect()
}
export {connectDB}