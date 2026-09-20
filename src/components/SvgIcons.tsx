import React from 'react';
import Svg, { Path, Circle, Rect, G, Polygon } from 'react-native-svg';

interface SvgIconProps {
  size?: number;
  color?: string;
  fill?: string;
  strokeWidth?: number;
  style?: any;
}

// 1. Navigation & Core Icons
export const DiscoverSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', fill = 'none', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} style={style}>
    <Path
      d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill !== 'none' ? fill : 'none'}
    />
    <Circle cx="19" cy="5" r="1.5" fill={color} />
  </Svg>
);

export const WotdSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', fill = 'none', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} style={style}>
    <Circle cx="12" cy="12" r="4" stroke={color} strokeWidth={strokeWidth} fill={fill !== 'none' ? fill : 'none'} />
    <Path d="M12 2V4M12 20V22M4 12H2M22 12H20M5.64 5.64L7.05 7.05M16.95 16.95L18.36 18.36M5.64 18.36L7.05 16.95M16.95 7.05L18.36 5.64" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Svg>
);

export const ScripturesSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', fill = 'none', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} style={style}>
    <Path
      d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5V19.5Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M8 7H16M8 11H13" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Svg>
);

export const SearchSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M16.5 16.5L21.5 21.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Svg>
);

export const FavoritesSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', fill = 'none', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} style={style}>
    <Path
      d="M20.84 4.61A5.5 5.5 0 0 0 12.83 4.2L12 5.03L11.17 4.2A5.5 5.5 0 0 0 3.16 11.98L12 21L20.84 11.98A5.49 5.49 0 0 0 20.84 4.61Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill}
    />
  </Svg>
);

// 2. Interactive & Detail Icons
export const FlameSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', fill = 'none', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} style={style}>
    <Path
      d="M8.5 14.5A3.5 3.5 0 0 0 12 18A3.5 3.5 0 0 0 15.5 14.5C15.5 11 12 8.5 12 8.5S8.5 11 8.5 14.5Z"
      fill={fill !== 'none' ? fill : color}
    />
    <Path
      d="M12 2C10.5 4.5 7 8 7 13.5A5 5 0 0 0 12 22A5 5 0 0 0 17 13.5C17 9 14 5 12 2Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const RefreshSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5V9H8M4 13A8.1 8.1 0 0 0 19.5 15M20 19V15H16"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const LandmarkSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M3 21H21M4 18H20M5 18V10M9 18V10M15 18V10M19 18V10M2 7L12 2L22 7V10H2V7Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const UsersSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M16 21V19A4 4 0 0 0 12 15M8 21V19A4 4 0 0 1 12 15M12 15A4 4 0 1 0 12 7A4 4 0 0 0 12 15Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M18 8A3 3 0 1 1 18 2M22 17A3 3 0 0 0 18 14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const QuoteSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', fill = 'none', style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill !== 'none' ? fill : color} style={style}>
    <Path d="M9.5 6C7.57 6 6 7.57 6 9.5C6 11.43 7.57 13 9.5 13C9.25 15.5 7.5 17 5 17V19C9 19 11.5 16 11.5 11V6H9.5ZM17.5 6C15.57 6 14 7.57 14 9.5C14 11.43 15.57 13 17.5 13C17.25 15.5 15.5 17 13 17V19C17 19 19.5 16 19.5 11V6H17.5Z" />
  </Svg>
);

export const StrongsIconSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5V19.5Z" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M14.5 12.5L17 15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Svg>
);

export const ChevronRightSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#94A3B8', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M9 18L15 12L9 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BackArrowSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#FFFFFF', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M19 12H5M12 19L5 12L12 5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CloseSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#94A3B8', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M18 6L6 18M6 6L18 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ShareSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Circle cx="18" cy="5" r="3" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="6" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="18" cy="19" r="3" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Svg>
);

export const CalendarSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#94A3B8', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Rect x="3" y="4" width="18" height="18" rx="3" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M16 2V6M8 2V6M3 10H21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Svg>
);

export const CheckSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', strokeWidth = 2.5, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M20 6L9 17L4 12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// 3. WOTD 4-Lens Icons
export const OriginalIntentSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M12 7V12L15 15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Svg>
);

export const TheologicalTruthSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M12 3V21M7 8H17" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ModernWalkSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M4 19C7 16 7 13 11 11C15 9 16 6 20 4M9 19L11 21M17 9L19 11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const PrayerFocusSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M12 2C9.5 5 8 9 8 13C8 17.5 10 21 12 22C14 21 16 17.5 16 13C16 9 14.5 5 12 2Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8 12L4 14C4 17 6 19 8 20M16 12L20 14C20 17 18 19 16 20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Svg>
);

// 4. Biblical Genre SVGs (Replacing Emojis strictly per Rule 2 & 4)
export const GenreLawSvg: React.FC<SvgIconProps> = ({ size = 18, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M12 3V21M4 8L12 5L20 8M4 8L7 14C7 15.5 5.5 17 4 17C2.5 17 1 15.5 1 14L4 8ZM20 8L23 14C23 15.5 21.5 17 20 17C18.5 17 17 15.5 17 14L20 8Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const GenreHistorySvg: React.FC<SvgIconProps> = ({ size = 18, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M3 21H21M4 18H20M6 18V9M10 18V9M14 18V9M18 18V9M3 9H21M12 3L2 9H22L12 3Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const GenreWisdomSvg: React.FC<SvgIconProps> = ({ size = 18, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M9 18H15M10 22H14M12 2A7 7 0 0 0 5 9C5 12.3 7 14.5 8 16H16C17 14.5 19 12.3 19 9A7 7 0 0 0 12 2Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const GenreProphecySvg: React.FC<SvgIconProps> = ({ size = 18, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M2 12C2 12 5.5 5 12 5C18.5 5 22 12 22 12C22 12 18.5 19 12 19C5.5 19 2 12 2 12Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
  </Svg>
);

export const GenreGospelSvg: React.FC<SvgIconProps> = ({ size = 18, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M12 2V22M7 7H17" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={strokeWidth} />
  </Svg>
);

export const GenreEpistleSvg: React.FC<SvgIconProps> = ({ size = 18, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M3 7L12 13L21 7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const GenreApocalypticSvg: React.FC<SvgIconProps> = ({ size = 18, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M4 17L2 7L7 10L12 4L17 10L22 7L20 17H4Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Rect x="4" y="17" width="16" height="3" rx="1.5" stroke={color} strokeWidth={strokeWidth} />
  </Svg>
);

export const getGenreSvg = (genre: string, size = 18, color = '#F59E0B') => {
  switch (genre) {
    case 'Law': return <GenreLawSvg size={size} color={color} />;
    case 'History': return <GenreHistorySvg size={size} color={color} />;
    case 'Wisdom': return <GenreWisdomSvg size={size} color={color} />;
    case 'Prophecy': return <GenreProphecySvg size={size} color={color} />;
    case 'Gospel': return <GenreGospelSvg size={size} color={color} />;
    case 'Epistle': return <GenreEpistleSvg size={size} color={color} />;
    case 'Apocalyptic': return <GenreApocalypticSvg size={size} color={color} />;
    default: return <ScripturesSvg size={size} color={color} />;
  }
};

// 5. Auth Provider SVGs
export const AppleSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#FFFFFF', style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <Path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM14.97 4.88C15.54 4.18 15.93 3.2 15.82 2.22C14.97 2.25 13.92 2.79 13.33 3.49C12.8 4.1 12.34 5.08 12.47 6.04C13.42 6.11 14.41 5.57 14.97 4.88Z" />
  </Svg>
);

export const GoogleSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#FFFFFF', style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M21.8 12.23C21.8 11.45 21.73 10.7 21.6 10H12V14.07H17.5C17.26 15.33 16.53 16.4 15.44 17.13V19.7H18.78C20.73 17.9 21.8 15.29 21.8 12.23Z"
      fill={color}
    />
    <Path
      d="M12 22C14.76 22 17.08 21.09 18.78 19.7L15.44 17.13C14.52 17.75 13.36 18.13 12 18.13C9.33 18.13 7.07 16.33 6.26 13.91H2.8V16.59C4.54 20.05 8.01 22 12 22Z"
      fill={color}
    />
    <Path
      d="M6.26 13.91C6.05 13.29 5.93 12.63 5.93 11.95C5.93 11.27 6.05 10.61 6.26 9.99V7.31H2.8C2.08 8.74 1.67 10.3 1.67 11.95C1.67 13.6 2.08 15.16 2.8 16.59L6.26 13.91Z"
      fill={color}
    />
    <Path
      d="M12 5.77C13.5 5.77 14.85 6.29 15.91 7.3L18.86 4.35C17.07 2.68 14.75 1.7 12 1.7C8.01 1.7 4.54 3.65 2.8 7.31L6.26 9.99C7.07 7.57 9.33 5.77 12 5.77Z"
      fill={color}
    />
  </Svg>
);

// 6. Profile, Account, Auth & Settings SVGs
export const ProfileSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SettingsSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M19.4 15A1.65 1.65 0 0 0 19.73 16.82L19.8 16.89C20.25 17.34 20.25 18.06 19.8 18.51L18.51 19.8C18.06 20.25 17.34 20.25 16.89 19.8L16.82 19.73A1.65 1.65 0 0 0 15 19.4A1.65 1.65 0 0 0 13.8 20.89V21A1.5 1.5 0 0 1 12.3 22.5H10.5A1.5 1.5 0 0 1 9 21V20.89A1.65 1.65 0 0 0 7.8 19.4A1.65 1.65 0 0 0 5.98 19.73L5.91 19.8C5.46 20.25 4.74 20.25 4.29 19.8L3 18.51C2.55 18.06 2.55 17.34 3 16.89L3.07 16.82A1.65 1.65 0 0 0 3.4 15A1.65 1.65 0 0 0 1.91 13.8H1.8A1.5 1.5 0 0 1 0.3 12.3V10.5A1.5 1.5 0 0 1 1.8 9H1.91A1.65 1.65 0 0 0 3.4 7.8A1.65 1.65 0 0 0 3.07 5.98L3 5.91C2.55 5.46 2.55 4.74 3 4.29L4.29 3C4.74 2.55 5.46 2.55 5.91 3L5.98 3.07A1.65 1.65 0 0 0 7.8 3.4A1.65 1.65 0 0 0 9 1.91V1.8A1.5 1.5 0 0 1 10.5 0.3H12.3A1.5 1.5 0 0 1 13.8 1.8V1.91A1.65 1.65 0 0 0 15 3.4A1.65 1.65 0 0 0 16.82 3.07L16.89 3C17.34 2.55 18.06 2.55 18.51 3L19.8 4.29C20.25 4.74 20.25 5.46 19.8 5.91L19.73 5.98A1.65 1.65 0 0 0 19.4 7.8A1.65 1.65 0 0 0 20.89 9H21A1.5 1.5 0 0 1 22.5 10.5V12.3A1.5 1.5 0 0 1 21 13.8H20.89A1.65 1.65 0 0 0 19.4 15Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const LogOutSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#EF4444', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M9 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 17L21 12L16 7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M21 12H9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BookmarkSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', fill = 'none', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill !== 'none' ? fill : 'none'} style={style}>
    <Path
      d="M19 21L12 16L5 21V5A2 2 0 0 1 7 3H17A2 2 0 0 1 19 5V21Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill !== 'none' ? fill : 'none'}
    />
  </Svg>
);

export const MailSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#94A3B8', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M22 6L12 13L2 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const LockSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#94A3B8', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Rect x="3" y="11" width="18" height="11" rx="2" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M7 11V7A5 5 0 0 1 17 7V11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const EyeSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#94A3B8', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
  </Svg>
);

export const EyeOffSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#94A3B8', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12C1 12 2.76 7.42 6.53 4.97M9.9 4.24A9.12 9.12 0 0 1 12 4C19 4 23 12 23 12C23 12 21.6 15.66 18.66 18.06M1 1L23 23" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M10 10.5A3 3 0 0 0 13.5 14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const UserSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#94A3B8', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M20 21V19A4 4 0 0 0 16 15H8A4 4 0 0 0 4 19V21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BellSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#94A3B8', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M13.73 21A2 2 0 0 1 10.27 21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const GlobeSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#94A3B8', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M2 12H22M12 2A15.3 15.3 0 0 1 16 12A15.3 15.3 0 0 1 12 22A15.3 15.3 0 0 1 8 12A15.3 15.3 0 0 1 12 2Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BookOpenSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M2 3H8A4 4 0 0 1 12 7A4 4 0 0 1 16 3H22V19H16A4 4 0 0 0 12 23A4 4 0 0 0 8 19H2V3Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 7V23" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ScrollSvg: React.FC<SvgIconProps> = ({ size = 24, color = '#F59E0B', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M19 17V5A3 3 0 0 0 16 2H5A3 3 0 0 0 2 5V19A3 3 0 0 0 5 22H18A4 4 0 0 0 22 18V16A3 3 0 0 0 19 13H5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// 7. Wizard Navigation & Validation SVGs
export const CrossSvg: React.FC<SvgIconProps> = ({ size = 18, color = '#64748B', strokeWidth = 2.5, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M18 6L6 18M6 6L18 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ChevronLeftSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#0F172A', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const AtSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#94A3B8', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Circle cx="12" cy="12" r="4" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M16 8V12A3 3 0 0 0 19 15A6.5 6.5 0 0 0 19 9A7 7 0 1 0 19 15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ShieldCheckSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#94A3B8', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M12 22S20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9 12L11 14L15 10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const TargetSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#94A3B8', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="12" cy="12" r="6" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="12" cy="12" r="2" stroke={color} strokeWidth={strokeWidth} />
  </Svg>
);

export const CameraSvg: React.FC<SvgIconProps> = ({ size = 20, color = '#FFFFFF', strokeWidth = 2, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="13" r="4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);


