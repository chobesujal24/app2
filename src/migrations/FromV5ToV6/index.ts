/**
 * Migration helper: V5 to V6
 * Migrates agent chat config format
 */
export class MigrationAgentChatConfig {
  static migrateChatConfig(config: any): any {
    // Pass through — original migration restructured chat config fields
    return config;
  }
}
