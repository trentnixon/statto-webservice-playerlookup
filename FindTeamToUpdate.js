const Scraper = require("./UpdateTeam/index");
const fetcher = require("./utils/Teamfetcher");

const Update = async (TEAMS) => {
  console.log("TEAMS LENGTH", TEAMS.length)
  const UPDATETEAMS = new Scraper(TEAMS);
  UPDATETEAMS.startLookup();
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

