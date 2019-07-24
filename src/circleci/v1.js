const axios = require("axios");

class CircleCI {
  constructor(access_token, vcs, username, project_name) {
    this.access_token = access_token;
    this.vcs = vcs;
    this.username = username;
    this.project_name = project_name;
  }
  follow_project() {
    return new Promise((resolve, reject) => {
      try {
        const URL = `https://circleci.com/api/v1.1/project/${this.vcs}/${
          this.username
        }/${this.project_name}/follow?circle-token=${this.access_token}`;
        axios
          .post(URL)
          .then(resp => {
              console.log(resp.data);
            resolve(resp.data);
          })
          .catch(err => {
            throw err;
          });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }
  env_variables(variables){
      return new Promise((resolve,reject)=>{
        try {
            const URL = `https://circleci.com/api/v1.1/project/${this.vcs}/${this.username}/${this.project_name}/envvar?circle-token=${this.access_token}`
            let promises = [];
            for(let index=0;index < variables.length;index++){
                let item = variables[index];
                promises.push(axios.post(URL,{name:item.name,value:item.value}));
            }
            Promise.all(promises).then(values=>{
                const data=[];
                values.forEach((value)=>{
                    data.push(value.data);
                })
                resolve(data);
            }).catch(error=>{
                reject(error)
            })
        } catch (error) {
            console.error(error);
            reject(error);
        }
      });
  }
}

module.exports = CircleCI;
