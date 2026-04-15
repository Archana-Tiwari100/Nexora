export type ReminderVoice = "default" | "calm" | "motivational" | "friendly";
export type ReminderRepeat = "none" | "daily" | "weekly";

export type Reminder = {
  id: number;
  message: string;
  time: string; // HH:MM
  voice: ReminderVoice;
  repeat: ReminderRepeat;
  triggered: boolean;
  lastTriggeredAt: string | null; // YYYY-MM-DD for daily/none, or specific date for weekly
  createdAt: string;
};