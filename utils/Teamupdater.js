const fetch = require("node-fetch");

/*
create a specific PUT fetch request.
*/

async function updater(PATH, method = "PUT", body = {}) {
  const APIURL = process.env.APIURL;
  const BEARER = process.env.STRAPI;

  // Add fetcher options
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER}`,
    },
    body: JSON.stringify(body),
  };

  /*  //. if POST or PUT then add a body
  if (method === 'POST' ||method === 'PUT') {
    options.body = JSON.stringify(body);
  } */

  try {
    //console.log(`${APIURL}${PATH}`, options)
    const response = await fetch(`${APIURL}${PATH}`, options);
    const res = await response.json();

    return res;
  } catch (error) {
    console.log("Fetcher Error : ");
    console.error(error);
  }
}

module.exports = updater;
