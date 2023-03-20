"use strict";
const cheerio = require("cheerio");
const request = require("request");
const updater = require("../utils/Teamupdater");

class Scraper {
  constructor() {
    this.data = null;
    this.pointer = 0;

    this.selectors = {
      parentSelector: "#team-profile-2021-basic-stats",
      statBox: ".general-stat-box",
    };
  }

  strReplace(str) {
    return str.replace(" ", "_");
  }

  movePointer() {
    if (this.pointer < this.data.length - 1) {
      this.pointer++;
      this.startLookup();
    }
  }

  startLookup() {
    this.fetchURL(this.data[this.pointer]);
  }

  async fetchURL(team) {
    const scrapURL = "https://www.lastmanstands.com/";
    const pathTeamProfile = "team-profile/t20/?teamid=";
    const fixtureURL = `${scrapURL}${pathTeamProfile}${team.attributes.TeamID}`;

    request(fixtureURL, async (err, res, html) => {
      if (!err && res.statusCode === 200) {
        const $ = cheerio.load(html);
        await this.loopResults($(this.selectors.parentSelector), team);
      }
    });
  }

  loopResults(data, team) {
    const $ = cheerio;
    const meta = {};
    data.children(this.selectors.statBox).each((i, el) => {
      meta[this.strReplace($(el).find(".general-stat-box-top").text())] = $(el)
        .find(".general-stat-box-bottom")
        .text();
    });
    meta.LastUpdate = Math.floor(Date.now() / 1000).toString();
    this.updateStrapiTeam(meta, team.id);
  }

  async updateStrapiTeam(obj, id) {
    console.log(`Adding Team Metadata ${id}`);
    await updater(`teams/${id}`, "PUT", { data: obj });
    this.movePointer();
  }
}

module.exports = Scraper;



/* "use strict";
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
      //this.CALLBACK();
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
    await updater(`teams/${_ID}`, "PUT", { data: OBJ });
    this.MovePointer();
  };
}

module.exports = SCRAP;
 */