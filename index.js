const express = require("express");
const youtubedl = require("youtube-dl-exec");

const app = express();

app.get("/", (req, res) => {
  const url = req.query.url;
  console.log({ url });
  youtubedl(url, {
    dumpSingleJson: true,
    noCheckCertificates: true,
    noWarnings: true,
    preferFreeFormats: true,
    addHeader: ["referer:youtube.com", "user-agent:googlebot"],
  }).then((output) => res.json(output.url));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
