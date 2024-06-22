module.exports = function(api) {
  api.cache(true);
  
  const presets = ['babel-preset-expo'];
  const plugins = [];

  if (process.env.NODE_ENV === 'development') {
    plugins.push('react-refresh/babel');
  }

  return {
    presets,
    plugins,
  };
};
