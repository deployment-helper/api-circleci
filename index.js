const CircleCI = require("./src/circleci");
const util = require("util");
exports.mcrc_pipeline_circleci = function(req, resp) {
  const method = req.method;
  const body = req.body;
  try {
    switch (method) {
      case "POST":
        if (
          body.access_token &&
          body.vcs &&
          body.username &&
          body.project_name
        ) {
          const circleCI = new CircleCI(
            body.access_token,
            body.vcs,
            body.username,
            body.project_name
          );
          circleCI
            .follow_project()
            .then(data => {
              resp.send(createSuccessResp("Success", data));
            })
            .catch(err => {
              throw err;
            });
        } else {
          throw new Error(
            "access_token, vcs, username and project_name is required."
          );
        }
        break;
      default:
        throw new Error("Method not supported.");
    }
  } catch (err) {
    console.error(err);
    resp.send(createErrResp("ERROR", err));
  }
};

exports.mcrc_pipeline_circleci_variables = function(req, resp) {
  const method = req.method;
  const body = req.body;
  try {
    switch (method) {
      case "POST":
        if (
          (body.access_token && body.vcs && body.username && body.project_name,
          body.variables)
        ) {
          const circleCI = new CircleCI(
            body.access_token,
            body.vcs,
            body.username,
            body.project_name
          );
          circleCI
            .env_variables(body.variables)
            .then(data => {
              resp.send(createSuccessResp("Success", data));
            })
            .catch(err => {
              throw err;
            });
        } else {
          throw new Error(
            "access_token, vcs, username and project_name is required."
          );
        }
        break;
      default:
        throw new Error("Method not supported.");
    }
  } catch (err) {
    console.error(err);
    resp.send(createErrResp("ERROR", err));
  }
};

const message_format = {
  statusCode: 200,
  isBase64Encoded: false,
  body: {
    status: "",
    message: "",
    data: {},
    error: null
  }
};

function createSuccessResp(message, data) {
  const respJson = JSON.parse(JSON.stringify(message_format));
  let resp_body = {};
  (resp_body.status = "OK"), (resp_body.message = message);
  resp_body.data = data;
  respJson.body = resp_body;
  console.log(respJson);
  return respJson;
}

function createErrResp(message, err) {
  const respJson = JSON.parse(JSON.stringify(message_format));
  let resp_body = {};
  (resp_body.status = "FAIL"), (resp_body.message = message);
  resp_body.err = err;
  respJson.body = resp_body;
  return respJson;
}
