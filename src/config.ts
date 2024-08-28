import dotenv from "dotenv"

dotenv.config()

const config = {
    mongo_user : process.env.MONGO_USER,
    mongo_pass : process.env.MONGO_PASS,
    mongo_uri  : process.env.MONGO_URI,
    mongo_db   : process.env.MONGO_DATABASE,

    port       : process.env.PORT || 6000,

}

export default config;