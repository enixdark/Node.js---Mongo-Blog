
//The configure for relationship database such as SQLite,MySQL,Postgres
module.exports = {
	dbname:"notes",
    username:"",
    password:"",
    params:{
        host:'localhost',
        dialect:'sqlite',
        storage: "data/db.sqlite3"
    }
}
