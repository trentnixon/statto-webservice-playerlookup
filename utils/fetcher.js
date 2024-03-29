const fetch = require("node-fetch");
const qs = require("qs");

const today = new Date();
const threeDaysAgo = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000);
const threeDaysAgoFormatted = threeDaysAgo.toISOString();

const query = qs.stringify(
  {
    filters: {
      updatedAt: {
        $lt: threeDaysAgoFormatted,
      },
    },
    pagination: {
      pageSize: 25,
    },
    sort: ["updatedAt:asc"],
    fields: ["id", "PlayerID", "updatedAt"],
  },
  {
    encodeValuesOnly: true,
  }
);

async function fetcher(PATH, method = "GET", body = {}) {

  const APIURL = process.env.APIURL;
  const BEARER = process.env.STRAPI;

  // Add fetcher options
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER}`,
    },
  };

  //. if POST or PUT then add a body
  if (method === "POST" || method === "PUT") {
    options.body = JSON.stringify(body);
  }

  try {
    //console.log(`${APIURL}${PATH}`, options);
    const response = await fetch(`${APIURL}${PATH}?${query}`, options);
    const res = await response.json();

    console.log(" Update Player Count : ", res.data.length);
    return res.data;
  } catch (error) {
    console.log("Fetcher Error : ");
    console.error(error);
  }
}

module.exports = fetcher;
