/**
 * Realm schema: Settings
 * Holds app settings.
 */

export const Settings: SettingsSchema = {
  name: 'Settings',
  properties: {
    language: 'string',
    location: 'string',
  },
};

interface SettingsSchema {
  name: string;
  properties: {
    language: string;
    location: string;
  };
}
