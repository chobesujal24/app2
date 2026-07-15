/**
 * Migration helper: V3 to V4
 * Migrates LLM provider settings format
 */
export class MigrationLLMSettings {
  static migrateSettings(settings: any): any {
    // For Qyvera AI (Puter-only), simply pass through settings
    // Original migration moved provider-specific keys around,
    // but we only have Puter now
    return settings;
  }
}
