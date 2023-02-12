//const PlayerCareerUpdate = require("../cheerio/api/CareerDetails/query");

/* const Update = async () => {


  const date = new Date();
  const daysAgo = new Date(date.getTime());
  daysAgo.setDate(date.getDate() - 7);

  //${process.env.NODE_ENV}
  const UpdateManyPlayer = await strapi.db
    .query("api::player.player")
    .findMany({
      limit: process.env.NODE_ENV === "development" ? 1 : 100, 
      orderBy: { updatedAt: "asc" }, 
    });

  UpdateManyPlayer.map((player, i) => {
    //console.log(player)
    if (player === null) {
      console.log(`Player was NULL and void!!`);
    } else {
      //console.log(`Try and update  ${player.Name}`)
      PlayerCareerUpdate.PlayerCareerUpdate({
        params: {
          id: player.id,
          LMSID: player.PlayerID,
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
}; */

module.exports = {
 /*  Run: async () => {
    Update();
  }, */
};
