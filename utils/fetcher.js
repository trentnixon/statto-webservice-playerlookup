const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

async function fetcher(PATH, method = "GET", body = {}) {
  let APIURL;

  // get correct URL
  if (process.env.NODE_ENV === "production") {
    APIURL = process.env.PRODUCTION_API_URL;
  } else {
    // Node.js is not running in a production environment
    APIURL = process.env.LOCAL_API_URL;
  } 

  // Add fetcher options
  const options = {
    method,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI}`,
    },
  };

  //. if POST or PUT then add a body
  if (method === 'POST' ||method === 'PUT') {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${APIURL}${PATH}`,options);
    const res = await response.json();
   
    return res.data;
  } catch (error) {
    console.log('Fetcher Error : ')
    console.error(error);
  }
}

module.exports = fetcher;