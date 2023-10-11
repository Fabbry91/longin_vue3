import {createPool} from 'mysql2/promise'


export  const  connect = async () => {
    const connection = await createPool({
        host: process.env.MYSQL_ADDON_HOST || 'localhost',
        user: process.env.MYSQL_ADDON_USER || 'root',
        password: process.env.MYSQL_ADDON_PASSWORD || '',
        database: process.env.MYSQL_ADDON_DB || 'workanda',
        connectionLimit:10
    })
    return connection
}