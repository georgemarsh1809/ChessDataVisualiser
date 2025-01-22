import postgres from 'postgres'

// const PSQL_DB_PW = import.meta.env.PSQL_DB_PW // Currently doesn't work

const sql = postgres({ db: "chess", user: "postgres", password: "Drum&Bass420!" }) // will use psql environment variables

export default sql