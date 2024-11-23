const { Pool : Dbconnection } = require('pg');

const dbconnection = new Dbconnection({
  host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database,
    port:process.env.port

});

// dbconnection.execute("select 'test' ",(err,result)=>{
//     if(err){
//         console.log(err.message)
//     }
//     else{
//         console.log(result)
//     }
// })

module.exports = dbconnection;
