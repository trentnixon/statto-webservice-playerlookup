const fetch = require("node-fetch");

/*
create a specific PUT fetch request.
*/

async function updater(PATH, method = "PUT", body = {}) {
  const APIURL =
    process.env.NODE_ENV !== "development"
      ? process.env.APIURL
      : process.env.APIURL_DEV;

  const BEARER =
    process.env.NODE_ENV !== "development"
      ? process.env.STRAPI
      : process.env.STRAPILOCAL;

  // Add fetcher options
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER}`,
    },
    body: JSON.stringify(body),
  };


  try {

    const response = await fetch(`${APIURL}${PATH}`, options);
    const res = await response.json();

    return res.data;
  } catch (error) {
    console.log("Fetcher Error : ");
    console.error(error);
  }
}

module.exports = updater;
