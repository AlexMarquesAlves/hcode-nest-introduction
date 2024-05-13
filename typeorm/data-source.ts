import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'

dotenv.config({
  path: process.env.ENV === 'test' ? '.env.test' : '.env',
})

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_TCP_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  migrations: [`${__dirname}/migrations/**/*.ts`],
})

export default dataSource
