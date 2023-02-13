const SCRAP = require('./UpdateTeam/index')
const fetcher = require("./utils/Teamfetcher");

const Update = async (TEAMS) => {

    //console.log(TEAMS)

    const UPDATETEAMS = new SCRAP()
      UPDATETEAMS.DATA = TEAMS;
      //UPDATETEAMS.SWITCHBOARD = Switchboard
      //UPDATETEAMS.CALLBACK = onComplete
      UPDATETEAMS.StartLookup()



    //console.log(TEAMS)
    /* Players.map((player, i) => {
  
    if (player === null) {
      console.log(`Player was NULL and void!!`);
    } else {
      //console.log(`Try and update  ${player.Name}`)
      PlayerCareerUpdate.PlayerCareerUpdate({
        params: {
          id: player.id,
          LMSID: player.attributes.PlayerID,
        },
      }).catch((err) => {
        console.log(
          "An Error occured on the PlayerCareerUpdate Strapi Query Engine Request :  ",
          err
        );

        console.log(player.id);
        console.log(player.PlayerID);
      });
    }
  });  */
};

module.exports = {
  FindTeams: async () => {
    console.log("RUN THE FindTeams")
    const apiResponse = await fetcher('teams');
    if(apiResponse > 0){
        Update(apiResponse);
    }
    
  },
};
