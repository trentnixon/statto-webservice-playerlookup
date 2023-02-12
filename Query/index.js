"use strict";
const cheerio = require("cheerio");
const request = require("request");
const updatePlayer = require("./update");
/**
 *  player controller
 */

const GetInfo = async (InfoPath) => {
  return new Promise(function (resolve, reject) {
    request(InfoPath, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};

const CreatePlayerOBJ = async ($Info) => {
  const INFOBLOCK = $Info("#player-profile-2020-stats-block");
  //console.log(INFOBLOCK.find('#pp-2020-match-count .pp-2020-stats-right').text())

  const BATTINGCOL = "#pp-2020-batting-stats";
  const BOWLINGCOL = "#pp-2020-bowling-stats";
  const RANKINGBLOCK = "#pp-2020-player-stats-rankings";

  const STATRIGHT = ".pp-2020-stats-right";
  //let FINISHED = Math.floor((Date.now() * 24 * 60 * 60 * 1000) / 1000)
  const FINISHED = new Date(new Date().getTime());
  const XP = $Info("#circle-inner").find(`#circle-inner-level-xp`).text();
  const PLAYERPROFILELEVELXP = parseFloat(XP.replace(/,/g, ""));

  const OBJ = {
    MATCHES: INFOBLOCK.find(`#pp-2020-match-count ${STATRIGHT}`).text(),
    INNINGS: INFOBLOCK.find(
      `${BATTINGCOL} div:nth-child(2) ${STATRIGHT}`
    ).text(),
    RUNS: INFOBLOCK.find(`${BATTINGCOL} div:nth-child(3) ${STATRIGHT}`).text(),
    BATTINGAVERAGE: INFOBLOCK.find(
      `${BATTINGCOL} div:nth-child(4) ${STATRIGHT}`
    ).text(),
    STRIKERATE: INFOBLOCK.find(
      `${BATTINGCOL} div:nth-child(5) ${STATRIGHT}`
    ).text(),
    HIGHSCORE: INFOBLOCK.find(
      `${BATTINGCOL} div:nth-child(6) ${STATRIGHT}`
    ).text(),
    FIFTIES: INFOBLOCK.find(
      `${BATTINGCOL} div:nth-child(7) ${STATRIGHT}`
    ).text(),
    HUNDREDS: INFOBLOCK.find(
      `${BATTINGCOL} div:nth-child(8) ${STATRIGHT}`
    ).text(),

    OVERS: INFOBLOCK.find(`${BOWLINGCOL} div:nth-child(2) ${STATRIGHT}`).text(),
    WICKETS: INFOBLOCK.find(
      `${BOWLINGCOL} div:nth-child(3) ${STATRIGHT}`
    ).text(),
    BOWLINGAVERAGE: INFOBLOCK.find(
      `${BOWLINGCOL} div:nth-child(4) ${STATRIGHT}`
    ).text(),
    ECONOMY: INFOBLOCK.find(
      `${BOWLINGCOL} div:nth-child(5) ${STATRIGHT}`
    ).text(),
    BESTFIGURES: INFOBLOCK.find(
      `${BOWLINGCOL} div:nth-child(6) ${STATRIGHT}`
    ).text(),
    W3: INFOBLOCK.find(`${BOWLINGCOL} div:nth-child(7) ${STATRIGHT}`).text(),
    W5: INFOBLOCK.find(`${BOWLINGCOL} div:nth-child(8) ${STATRIGHT}`).text(),

    NATIONALRANKINGBATTING: INFOBLOCK.find(
      `${RANKINGBLOCK} div.pp-2002-rank-row:nth-child(1) div.pp-2020-player-rank-outer:nth-child(1)`
    ).text(),
    NATIONALRANKINGBOWLING: INFOBLOCK.find(
      `${RANKINGBLOCK} div.pp-2002-rank-row:nth-child(1) div.pp-2020-player-rank-outer:nth-child(3)`
    ).text(),
    WORLDRANKINGBATTING: INFOBLOCK.find(
      `${RANKINGBLOCK} div.pp-2002-rank-row:nth-child(2) div.pp-2020-player-rank-outer:nth-child(1)`
    ).text(),
    WORLDRANKINGBOWLING: INFOBLOCK.find(
      `${RANKINGBLOCK} div.pp-2002-rank-row:nth-child(2) div.pp-2020-player-rank-outer:nth-child(3)`
    ).text(),
    TYPEBATTING: $Info("#pp-2020-player-bat-style").find(`p`).text(),
    TYPEBOWLING: $Info("#pp-2020-player-bowl-style").find(`p`).text(),
    PLAYERPROFILELEVEL: $Info("#circle-inner")
      .find(`#circle-inner-level-name`)
      .text(),
    PLAYERPROFILELEVELXP: PLAYERPROFILELEVELXP,
    InitialFetch: true,
    isUpdating: false,
    LMSUPDATE: FINISHED,
  };
  return OBJ;
};

module.exports = {
  PlayerCareerUpdate: async (ctx) => {
    const _ID = ctx.params.id;
    const _LMSID = ctx.params.LMSID;
    const ScrapURL = "https://www.lastmanstands.com/";
    const PATH_PlayerProfile = "cricket-player/t20&playerid=";
    const PlayerPath = `${ScrapURL}${PATH_PlayerProfile}${_LMSID}`;

    //PATH_PlayerProfile
    const FIXTUREINFO = await GetInfo(PlayerPath);
    const $Info = cheerio.load(FIXTUREINFO);
    const STRAPIOBJ = await CreatePlayerOBJ($Info);
    updatePlayer(STRAPIOBJ, _ID, _LMSID);
  },
};
