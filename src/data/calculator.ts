export const calculatorMessaging = {
  caloriesDisclaimer:
    "Optional training data from your watch or fitness app helps refine your profile — hydration insights still come from your full performance picture.",
  caloriesLabel: "Training load from your device",
  caloriesHint: "Optional — Apple Watch, Garmin, WHOOP, or fitness app",
  deviceHeadline: "Connect Your Device",
  deviceSub:
    "Sync workout data from your favorite fitness app to make your profile more personalized.",
  quickEstimateTitle: "Quick Profile",
  quickEstimateSub: "A few questions about your last session — under 60 seconds.",
  fullProfileTitle: "Full Profile",
  fullProfileSub: "Five questions for a deeper hydration and performance profile.",
} as const;

export type DeviceIntegrationId =
  | "apple-health"
  | "garmin"
  | "whoop"
  | "strava"
  | "fitbit"
  | "oura"
  | "google-fit";

export type DeviceIntegration = {
  id: DeviceIntegrationId;
  name: string;
  status: "coming_soon" | "available";
  syncFields: string[];
};

export const deviceIntegrations: DeviceIntegration[] = [
  {
    id: "apple-health",
    name: "Apple Health",
    status: "coming_soon",
    syncFields: ["calories", "duration", "activity", "heartRate", "weight"],
  },
  {
    id: "garmin",
    name: "Garmin",
    status: "coming_soon",
    syncFields: ["calories", "duration", "activity", "heartRate", "exertion"],
  },
  {
    id: "whoop",
    name: "WHOOP",
    status: "coming_soon",
    syncFields: ["calories", "duration", "heartRate", "exertion", "recovery"],
  },
  {
    id: "strava",
    name: "Strava",
    status: "coming_soon",
    syncFields: ["calories", "duration", "activity", "startTime", "endTime"],
  },
  {
    id: "fitbit",
    name: "Fitbit",
    status: "coming_soon",
    syncFields: ["calories", "duration", "activity", "heartRate"],
  },
  {
    id: "oura",
    name: "Oura",
    status: "coming_soon",
    syncFields: ["calories", "duration", "heartRate", "readiness"],
  },
  {
    id: "google-fit",
    name: "Google Fit",
    status: "coming_soon",
    syncFields: ["calories", "duration", "activity", "heartRate", "weight"],
  },
];

export const quickEstimateFields = {
  sport: {
    label: "Primary sport",
    options: [
      { value: "basketball", label: "Basketball" },
      { value: "running", label: "Running" },
      { value: "hyrox", label: "Hyrox / functional" },
      { value: "gym", label: "Gym / strength" },
      { value: "cycling", label: "Cycling" },
      { value: "other", label: "Other" },
    ],
  },
  duration: {
    label: "Session length",
    options: [
      { value: "30", label: "30 min", minutes: 30 },
      { value: "45", label: "45 min", minutes: 45 },
      { value: "60", label: "60 min", minutes: 60 },
      { value: "90", label: "90+ min", minutes: 90 },
    ],
  },
  intensity: {
    label: "Training intensity",
    options: [
      { value: "low", label: "Light", description: "Easy, conversational effort" },
      { value: "moderate", label: "Moderate", description: "Steady, working effort" },
      { value: "high", label: "Hard", description: "Pushing limits or race pace" },
    ],
  },
  sweatLevel: {
    label: "Sweat level",
    options: [
      { value: "light", label: "Light", description: "Dry quickly" },
      { value: "moderate", label: "Moderate", description: "Normal sweat" },
      { value: "heavy", label: "Heavy", description: "Soaked / salt on skin" },
    ],
  },
  hydrationFeeling: {
    label: "How did hydration feel?",
    options: [
      { value: "good", label: "Felt dialed in", description: "Energy stayed steady" },
      { value: "okay", label: "Mostly fine", description: "A few dry moments" },
      { value: "depleted", label: "Felt behind", description: "Thirsty, flat, or crampy" },
    ],
  },
} as const;

export type QuickEstimateAnswers = {
  sport: string;
  duration: string;
  intensity: string;
  sweatLevel: string;
  hydrationFeeling: string;
};

export type CalculatorMode = "full" | "quick";

export type SyncedWorkoutData = {
  source: DeviceIntegrationId;
  caloriesBurned?: number;
  durationMinutes?: number;
  activityType?: string;
  avgHeartRate?: number;
  maxHeartRate?: number;
  bodyWeightKg?: number;
  startTime?: string;
  endTime?: string;
};

export const quickStepOrder = ["sport", "duration", "intensity", "sweatLevel"] as const;
export type QuickStepKey = (typeof quickStepOrder)[number];
