import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface IconBackgroundProps extends SvgProps {
  primaryColor: string;
  accentColor: string;
  size?: number;
}

export const IconBackground: React.FC<IconBackgroundProps> = ({
  primaryColor,
  accentColor,
  size = 64,
  style,
  ...props
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 55 50"
    fill="none"
    style={style}
    {...props}
  >
    <Path
      fill={accentColor}
      d="M48.213 8.556C52.439 12.95 55 18.703 55 25c0 13.807-12.312 25-27.5 25-6.819 0-13.057-2.258-17.862-5.994a32.823 32.823 0 0 1 1.1-3.958c1.314-3.766 3.639-7.964 7.68-9.915 2.032-.981 4.302-1.459 6.666-1.752a80.853 80.853 0 0 1 3.586-.341c1.202-.095 2.408-.185 3.593-.31 4.73-.502 9.213-1.585 12.005-5.993 2.738-4.324 3.683-7.868 3.938-10.344.125-1.218.083-2.175.007-2.837Z"
    />
    <Path
      fill={primaryColor}
      d="M27.5 0c6.317 0 12.135 1.937 16.778 5.192.049.422.078.906.07 1.449-.035 2.302-.732 5.682-3.422 9.93-2.641 4.169-6.88 5.23-11.583 5.73-1.175.124-2.372.213-3.577.308a81.266 81.266 0 0 0-3.612.344c-2.389.297-4.73.784-6.844 1.805-4.25 2.052-6.642 6.43-7.972 10.241a33.84 33.84 0 0 0-1.31 5.002c-.034.182-.062.355-.089.518C2.221 36.255 0 30.864 0 25 0 11.193 12.312 0 27.5 0Z"
    />
  </Svg>
);