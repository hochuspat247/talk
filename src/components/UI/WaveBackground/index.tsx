
import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { styles } from './styled';
import { WavesBackgroundProps } from './types';
import { COLOR_SCHEMES } from './config';

const WavesBackground: React.FC<WavesBackgroundProps> = ({
  colorScheme = 'default',
}) => {
  const { orange, yellow } = COLOR_SCHEMES[colorScheme];

  return (
    <View style={styles.container}>
      {}
      <Svg
        viewBox="0 0 390 546"
        style={[styles.svg, styles.yellow]}
        preserveAspectRatio="none"
      >
        <Path
          d="M232.04 167.64C252.424 30.3604 357.707 -1.18631 407.8 0.200359L414.56 599.76H-8.19971V395.92C-1.95971 379.28 24.4563 369.92 40.6803 367.84C60.9603 365.24 206.56 339.24 232.04 167.64Z"
          fill={yellow}
        />
      </Svg>

      {}
      <Svg
        viewBox="0 0 349 600"
        style={[styles.svg, styles.orange]}
        preserveAspectRatio="none"
      >
        <Path
          d="M108.68 167.563C88.2959 30.2832 -16.9868 -1.26346 -67.0801 0.123211L-73.8401 599.683H348.92V395.843C342.68 379.203 316.264 369.843 300.04 367.763C279.76 365.163 134.16 339.163 108.68 167.563Z"
          fill={orange}
        />
      </Svg>
    </View>
  );
};

export default WavesBackground;