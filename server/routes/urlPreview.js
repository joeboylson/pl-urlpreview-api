const express = require("express");
const { getLinkPreview } = require("link-preview-js");

const urlPreviewRouter = express.Router();

urlPreviewRouter.get("/", async (request, response) => {
  const { url } = request.query;

  const responseData = {
    data: null,
    success: false,
    message: null,
    error: null,
  };

  getLinkPreview(url)
    .then((data) => {
      response.send({
        ...responseData,
        data: data,
        success: true,
      });
    })
    .catch((error) => {
      response.send({
        ...responseData,
        error: error.toString(),
        message: "Oops, there was an error",
      });
    });
});

module.exports = {
  urlPreviewRouter,
};
