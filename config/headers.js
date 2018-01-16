// Adding cache control policy for static assets to assist in Lighthouse score
module.exports = [
  {
    "source": "**/*.@(jpg|jpeg|gif|png|webp)",
    "headers": [{
      "key": "Cache-Control",
      "value": "max-age=7200"
    }]
  }
];