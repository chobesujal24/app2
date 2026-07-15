/**
 * Migration helper: V6 to V7
 * Migrates API keys from languageModel settings to keyVaults
 */
export class MigrationKeyValueSettings {
  static migrateSettings(settings: any): any {
    // Pass through — original migration moved apiKey fields to keyVaults
    // Puter API doesn't use API keys, so this is a no-op
    return settings;
  }
}
