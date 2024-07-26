const sequelize = require("../configs/db.config");
const {DataTypes, Op} = require("@sequelize/core")
const Team = sequelize.define("Team",{
    name:DataTypes.STRING
});

const Players = sequelize.define('Players', {
    title: DataTypes.STRING,
});

Team.hasMany(Players); 
Players.belongsTo(Team);
  
const main = async()=>{
    await Team.sync({force:true});
    const team = await Team.create({
        name:'yanki'
    });
    console.log(team.dataValues);
    await Players.sync({force:true});
    const players = await Players.create({
        name:"alex"
    });
    console.log(players.dataValues);


    const teamIdToFind = 1;


    Team.findByPk(teamIdToFind, {
    include: Players, 
    })
        .then((teamWithPlayers) => {
            if (!teamWithPlayers) {
                console.log('Team not found.');
                return;
    }

    
    const players = teamWithPlayers.Players;
    console.log(`Players: ${teamWithPlayers.name}:`);
    players.forEach((p) => {
      console.log(`- ${p.name}`);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });

}
main()