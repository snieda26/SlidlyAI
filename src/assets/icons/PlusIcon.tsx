import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface PlusIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({
  width = 24,
  height = 24,
  color = '#000000',
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 13H4C3.45333 13 3 12.5467 3 12C3 11.4533 3.45333 11 4 11H20C20.5467 11 21 11.4533 21 12C21 12.5467 20.5467 13 20 13Z"
      fill={color}
    />
    <Path
      d="M12 21C11.4533 21 11 20.5719 11 20.0556V4.94444C11 4.42815 11.4533 4 12 4C12.5467 4 13 4.42815 13 4.94444V20.0556C13 20.5719 12.5467 21 12 21Z"
      fill={color}
    />
  </Svg>
);

export default PlusIcon;
