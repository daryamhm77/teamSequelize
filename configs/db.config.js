const {Sequelize} = require("@sequelize/core");
const sequelize = new Sequelize({
    dialect:"mysql",
    host:"local",
    port:3306,
    username:"root",
    password:"doriskick",
    database:"express"
});

sequelize.authenticate().then(async()=>{
    await sequelize.sync({alter:true});
    console.log("connected");
}).catch((err)=>console.log(err));

module.exports = sequelize;