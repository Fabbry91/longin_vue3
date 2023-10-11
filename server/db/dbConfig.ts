import {createPool} from 'mysql2/promise'


export  const  connect = async () => {
    const connection = await createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USERNAME ||'root',
        password: process.env.PASSWORD || "",
        database: process.env.DB_NAME || 'workanda',
        connectionLimit:10
    })

    return connection
}