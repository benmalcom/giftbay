import { IconType } from 'react-icons';
import { FaUserEdit } from 'react-icons/fa';
import { FiCompass, FiHome, FiSettings, FiTrendingUp } from 'react-icons/fi';

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
  visible: boolean;
}
export const AppLinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, path: '/home', visible: true },
  { name: 'Insights', icon: FiTrendingUp, path: '/insights', visible: true },
  { name: 'Explore Moments', icon: FiCompass, path: '/events', visible: true },
];

export const UserLinkItems: Array<LinkItemProps> = [
  { name: 'Profile', icon: FaUserEdit, path: '/profile', visible: true },
  { name: 'Settings', icon: FiSettings, path: '/settings', visible: true },
];
