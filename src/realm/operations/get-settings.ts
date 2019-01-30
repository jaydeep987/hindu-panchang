import Realm from 'realm';

import { config } from '../../common/config';
import { AppSettings } from '../../interface/app-settings';
import { Settings } from '../schema/settings';

/**
 * Retrieve settings from realm.
 * Returns default settings if there are no settings saved in realm or some error to retrieve
 *
 * @param realm Realm instance
 */
export function getSettings(realm?: Realm): AppSettings {

  if (!realm) {
    return config.defaultSettings as AppSettings;
  }

  const settings: Realm.Results<AppSettings & Realm.Object> = realm.objects<AppSettings>(Settings.name);

  if (settings.length) {
    return settings[0];
  }

  // give default if cannot fetch from realm
  return config.defaultSettings as AppSettings;
}
