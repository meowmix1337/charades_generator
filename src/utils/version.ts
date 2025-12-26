// Auto-generated version info
export const VERSION = import.meta.env.VITE_APP_VERSION || '0.0.1';
export const BUILD_DATE = import.meta.env.VITE_BUILD_DATE || new Date().toISOString();
export const GIT_HASH = import.meta.env.VITE_GIT_HASH || 'dev';

export function getVersionInfo() {
  return {
    version: VERSION,
    buildDate: BUILD_DATE,
    gitHash: GIT_HASH,
    fullVersion: `v${VERSION} (${GIT_HASH.substring(0, 7)})`,
  };
}
