import axios from "axios";
import extractSiteMetadata from "../dist/index";

const processLink = async (resourceUrl) => {
  return axios
    .get(resourceUrl)
    .then((res) => {
      const { headers } = res;
      const contentType = headers["content-type"];
      if (contentType.includes("text/html")) {
        return {
          body: res.data,
          resourceUrl,
        };
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const urlsToTest = {
  cnbcone:
    "https://www.cnbc.com/2020/10/21/aocs-twitch-stream-was-one-of-the-platforms-biggest-ever-.html",
};

processLink(urlsToTest["cnbcone"]).then((data) => {
  if (data) {
    const dataObj = extractSiteMetadata(data.body, data.resourceUrl);
    console.log(`dataObj: ${JSON.stringify(dataObj, null, 2)}`);
    return dataObj;
  }
});
