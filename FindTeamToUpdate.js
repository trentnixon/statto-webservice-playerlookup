const SCRAP = require("./UpdateTeam/index");
const fetcher = require("./utils/Teamfetcher");

const Update = async (TEAMS) => {
  const UPDATETEAMS = new SCRAP();
  UPDATETEAMS.DATA = TEAMS;
  UPDATETEAMS.StartLookup();
};

module.exports = {
  FindTeams: async () => {
    console.log("RUN THE FindTeams");
    const apiResponse = await fetcher("teams");
    if (apiResponse.length > 0) {
      Update(apiResponse);
    }
  },
};
