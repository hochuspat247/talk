// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('ts', 'tsx');
config.resolver.extraNodeModules = {
  '@components': `${__dirname}/src/components`,
  '@constants': `${__dirname}/src/constants`,
  '@navigation': `${__dirname}/src/navigation`,
  '@screens': `${__dirname}/src/screens`,
  '@types': `${__dirname}/src/types`,
  '@api': `${__dirname}/src/api` 
};

module.exports = config;