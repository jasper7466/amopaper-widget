const express = require("express");
const fse = require("fs-extra");
const path = require("path");
const fetch = require("node-fetch");

const secretsPath = path.resolve(__dirname, "./secrets.json");
const secrets = fse.readJSONSync(secretsPath);
const port = 5200;

const oAuthURI = `https://${secrets.accountDomain}/oauth2/access_token`;
const pingURI = "https://www.amocrm.ru/oauth2/account/subdomain";

const app = express();

async function exchange(URI) {
  try {
    const response = await fetch(URI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...secrets.integration,
        grant_type: "authorization_code",
        code: secrets.code,
      }),
    });

    if (response.status === 200) {
      saveTokens(response);
      return console.log("Exchange successful");
    }

    throw new Error(response.status);
  } catch (error) {
    console.log(`Exchange failed ${error}`);
  }
}

async function ping(URI) {
  try {
    const response = await fetch(URI, {
      method: "GET",
      headers: { Authorization: `Bearer ${secrets.tokens.access_token}` },
    });

    if (response.status === 200) {
      return console.log("Ping successful");
    }
    if (response.status === 400) {
      refresh(oAuthURI);
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    console.log(`Ping failed ${error}`);
  }
}

async function refresh(URI) {
  try {
    const response = await fetch(URI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...secrets.integration,
        grant_type: "refresh_token",
        refresh_token: secrets.tokens.refresh_token,
      }),
    });

    if (response.status === 200) {
      saveTokens(response);
      return console.log("Refresh successful");
    }
    throw new Error(response.status);
  } catch (error) {
    console.log(`Refresh failed ${error}`);
    throw error;
  }
}

async function saveTokens(response) {
  const data = await response.json();
  const { access_token, refresh_token } = { ...data };
  secrets.tokens = { access_token, refresh_token };
  secrets.code = null;

  fse.writeJSONSync(secretsPath, secrets);
}

if (secrets.code) {
  exchange(oAuthURI);
} else if (secrets.tokens.access_token && secrets.tokens.refresh_token) {
  ping(pingURI);
}

app.use(express.json());

app.get("/access_token", (req, res) => {
  const body = req.body;

  if (
    body.x_api_key !== secrets.x_api_key ||
    body.subdomain !== secrets.subdomain
  ) {
    res.statusCode = 401;
    res.send();
  } else {
    res.json({ access_token: secrets.tokens.access_token });
  }
});

app.listen(port, () => {
  console.log(`Dev auth server listening on port ${port}`);
});
