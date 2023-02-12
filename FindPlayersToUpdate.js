const PlayerCareerUpdate = require("./Query/index");
const fetcher = require("./utils/fetcher");

const Update = async (Players) => {

    //console.log(apiResponse)

  /*   const date = new Date();
    const daysAgo = new Date(date.getTime());
    daysAgo.setDate(date.getDate() - 7); */


    Players.map((player, i) => {
  
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
  }); 
};

module.exports = {
  FindPlayers: async () => {
    console.log("RUN THE Run")
    const apiResponse = await fetcher('players');
    Update(apiResponse);
  },
};
