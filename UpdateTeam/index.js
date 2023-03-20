"use strict";
const cheerio = require("cheerio");
const request = require("request");
const updater = require("../utils/Teamupdater");

class Scraper {
  constructor(data) {
    this.data = data;
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
        await this.loopResults($, $(this.selectors.parentSelector), team);
      }
    });
  }

  loopResults = ($, DATA, TEAM) => {
    const S = this.selectors;
    const MetaARR = {};
    DATA.children(S.statBox).each((i, el) => {
      MetaARR[this.strReplace($(el).find(".general-stat-box-top").text())] = $(el)
        .find(".general-stat-box-bottom")
        .text();
    });
    MetaARR.LastUpdate = Math.floor(Date.now() / 1000).toString();
    this.updateStrapiTeam(MetaARR, TEAM.id);
  };

  

  async updateStrapiTeam(obj, id) {
    console.log(`Adding Team Metadata ${id}`);
    await updater(`teams/${id}`, "PUT", { data: obj });
    this.movePointer();
  }
}

module.exports = Scraper;
