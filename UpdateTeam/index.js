"use strict";
const cheerio = require("cheerio");
const request = require("request");
const updater = require("../utils/Teamupdater");

function SCRAP() {
  this.DATA;
  this.pointer = 0;

  this.Selectors = {
    ParentSelector: "#team-profile-2021-basic-stats",
    STATBOX: ".general-stat-box",
  };

  this.strReplace = (STR) => {
    return STR.replace(" ", "_");
  };
  this.MovePointer = () => {
    if (this.pointer === this.DATA.length - 1) {
      this.CALLBACK();
    } else {
      this.pointer++;
      this.StartLookup();
    }
  };

  this.StartLookup = () => {
    this.FetchURL(this.DATA[this.pointer]);
  };

  this.FetchURL = async (TEAM) => {
    const ScrapURL = "https://www.lastmanstands.com/";
    const PATH_TeamProfile = "team-profile/t20/?teamid=";
    const FixtureURL = `${ScrapURL}${PATH_TeamProfile}${TEAM.attributes.TeamID}`;

    console.log("Fetching ", FixtureURL);

    //LOG(chalk.yellow(`Fetching Team Metadata ${TEAM.id}`) )
    return await request(FixtureURL, async (err, res, html) => {
      if (!err && res.statusCode == 200) {
        this.$ = cheerio.load(html);
        return await this.LoopResults(
          this.$(this.Selectors.ParentSelector),
          TEAM
        );
      }
    });
  };

  this.LoopResults = (DATA, TEAM) => {
    const S = this.Selectors;
    const $ = this.$;
    const MetaARR = {};
    DATA.children(S.STATBOX).each((i, el) => {
      MetaARR[this.strReplace($(el).find(".general-stat-box-top").text())] = $(
        el
      )
        .find(".general-stat-box-bottom")
        .text();
    });
    MetaARR.LastUpdate = Math.floor(Date.now() / 1000).toString();
    this.UpdateStrapiTeam(MetaARR,TEAM.id)
  };

  /// change this

  this.UpdateStrapiTeam = async (OBJ, _ID) => {
    console.log(`Adding Team Metadata ${_ID}`);

    const TeamUpdataed = await updater(`teams/${_ID}`, "PUT", { data: OBJ });
    console.log(TeamUpdataed) 
    //console.log(`Player ${PlayerUpdated.id} was updated `);
    this.MovePointer();
  };
}

module.exports = SCRAP;
