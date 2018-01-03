module.exports = function(dist) {
  return {
    dist,
    filesToCache: ['html', 'js', 'css'],
  }
};