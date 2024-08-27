const express = require("express");
const { default: helmet } = require("helmet");
const youtubedl = require("youtube-dl-exec");

const app = express();
app.use(helmet());
app.get("/", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
  try {
    const output = await youtubedl(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    });
    res.json(output);
  } catch (err) {
    return res.status(400).json({
      DevError: {
        message: err,
        message: "Somthing went wrong!!pleas try again",
      },
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
