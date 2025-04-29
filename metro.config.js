// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('ts', 'tsx');
config.resolver.assetExts.push('ttf'); // Добавляем поддержку .ttf
config.resolver.extraNodeModules = {
  '@components': `${__dirname}/src/components`,
  '@constants': `${__dirname}/src/constants`,
  '@navigation': `${__dirname}/src/navigation`,
  '@screens': `${__dirname}/src/screens`,
  '@api': `${__dirname}/src/api`,
  '@assets': `${__dirname}/assets`,
  '@utils': `${__dirname}/src/utils`,
  '@types': `${__dirname}/src/types`,
};

module.exports = config;