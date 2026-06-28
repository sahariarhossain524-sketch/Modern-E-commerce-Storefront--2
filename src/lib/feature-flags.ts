// Simple feature flag utility. In a real-world scenario, this might connect to a service like LaunchDarkly or a DB table.

export type FeatureFlag = 'BULLMQ_BACKGROUND_JOBS' | 'ADVANCED_ANALYTICS' | 'NEW_DASHBOARD_UI';

// Hardcoded flags for now. Could be driven by process.env or DB.
const flags: Record<FeatureFlag, boolean> = {
  BULLMQ_BACKGROUND_JOBS: process.env.ENABLE_BULLMQ === 'true',
  ADVANCED_ANALYTICS: true,
  NEW_DASHBOARD_UI: false,
};

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return !!flags[flag];
}

export function assertFeatureEnabled(flag: FeatureFlag) {
  if (!isFeatureEnabled(flag)) {
    throw new Error(`Feature ${flag} is disabled.`);
  }
}
