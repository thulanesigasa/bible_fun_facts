import * as Updates from 'expo-updates';

export interface UpdateStatus {
  isAvailable: boolean;
  isDownloading: boolean;
  isDownloaded: boolean;
  channel: string;
  runtimeVersion: string | null;
  error: Error | null;
}

/**
 * Retrieve current active OTA update channel (e.g. 'production' or 'preview').
 */
export function getCurrentChannel(): string {
  return Updates.channel || 'development';
}

/**
 * Check whether an OTA update is available on the current channel and runtime.
 */
export async function checkOTAUpdate(): Promise<boolean> {
  if (__DEV__ || !Updates.isEnabled) {
    return false;
  }

  try {
    const update = await Updates.checkForUpdateAsync();
    return update.isAvailable;
  } catch (error) {
    console.warn('[OTA] Check failed:', error);
    return false;
  }
}

/**
 * Download the available OTA update and prepare it for application.
 */
export async function downloadOTAUpdate(): Promise<boolean> {
  if (__DEV__ || !Updates.isEnabled) {
    return false;
  }

  try {
    const result = await Updates.fetchUpdateAsync();
    return result.isNew;
  } catch (error) {
    console.warn('[OTA] Download failed:', error);
    return false;
  }
}

/**
 * Reload the application to apply the downloaded OTA update immediately.
 */
export async function reloadAppOTA(): Promise<void> {
  if (!Updates.isEnabled) {
    return;
  }
  await Updates.reloadAsync();
}
