export const STATIC_BASE_URL = ``;

export const API_URL = 'http://localhost:5000';

export const STATIC_URLS = {
  IMAGES: `${STATIC_BASE_URL}/images`,
  SVG_ICONS: `${STATIC_BASE_URL}/images/svg`,
  BACKGROUND: `${STATIC_BASE_URL}/images/background`,
  LOGO: `${STATIC_BASE_URL}/images/logos`,
}

export enum DeviceTypes {
  mobile = 'mobile',
  desktop = 'desktop',
  tablet = 'tablet',
}

export enum AppRoutes {
  login = 'login',
  registration = 'registration',
  tasks = 'tasks',
}