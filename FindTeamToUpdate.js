const Scraper = require("./UpdateTeam/index");
const fetcher = require("./utils/Teamfetcher");

const Update = async (TEAMS) => {
  const UPDATETEAMS = new Scraper();
  UPDATETEAMS.DATA = TEAMS;
  UPDATETEAMS.StartLookup();
};

module.exports = {
  FindTeams: async () => {
    console.log("RUNNING TEAM UPDATER");
    const apiResponse = await fetcher("teams");
    if (apiResponse.length > 0) {
      Update(apiResponse);
    }
  },
};
