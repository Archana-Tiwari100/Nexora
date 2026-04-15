import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";

import AppHeader from "../shared/AppHeader";
import ReminderForm from "./ReminderForm";
import ReminderList from "./ReminderList";
import type { Reminder, ReminderRepeat, ReminderVoice } from "./types/types";

type VoiceReminderProps = {
    onBack: () => void;
};

const STORAGE_KEY = "voice-reminders-v2";

function VoiceReminder({ onBack }: VoiceReminderProps) {
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [notificationPermission, setNotificationPermission] =
        useState<NotificationPermission | "unsupported">(
            typeof window !== "undefined" && "Notification" in window
                ? Notification.permission
                : "unsupported"
        );

    useEffect(() => {
        const storedReminders = localStorage.getItem(STORAGE_KEY);

        if (storedReminders) {
            try {
                setReminders(JSON.parse(storedReminders));
            } catch {
                setReminders([]);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
    }, [reminders]);

    const requestNotificationPermission = async () => {
        if (!("Notification" in window)) {
            setNotificationPermission("unsupported");
            return;
        }

        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
    };

    const handleAddReminder = (
        message: string,
        time: string,
        voice: ReminderVoice,
        repeat: ReminderRepeat
    ) => {
        if (!message.trim() || !time) return;

        const newReminder: Reminder = {
            id: Date.now(),
            message: message.trim(),
            time,
            voice,
            repeat,
            triggered: false,
            lastTriggeredAt: null,
            createdAt: new Date().toISOString(),
        };

        setReminders((prev) => [...prev, newReminder]);
    };

    const handleDeleteReminder = (id: number) => {
        setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
    };

    const addFiveMinutes = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        date.setMinutes(date.getMinutes() + 5);

        const newHours = String(date.getHours()).padStart(2, "0");
        const newMinutes = String(date.getMinutes()).padStart(2, "0");

        return `${newHours}:${newMinutes}`;
    };

    const handleSnoozeReminder = (id: number) => {
        setReminders((prev) =>
            prev.map((reminder) =>
                reminder.id === id
                    ? {
                        ...reminder,
                        time: addFiveMinutes(reminder.time),
                        triggered: false,
                        lastTriggeredAt: null,
                        repeat: "none",
                    }
                    : reminder
            )
        );
    };

    const getReminderSpeech = (message: string, voice: ReminderVoice) => {
        switch (voice) {
            case "calm":
                return `Gentle reminder. ${message}`;
            case "motivational":
                return `Let's go. ${message}. You can do it.`;
            case "friendly":
                return `Hey, just a quick reminder. ${message}`;
            default:
                return message;
        }
    };

    const speakReminder = (message: string, voiceType: ReminderVoice) => {
        const utterance = new SpeechSynthesisUtterance(
            getReminderSpeech(message, voiceType)
        );

        const availableVoices = window.speechSynthesis.getVoices();

        if (availableVoices.length > 0) {
            const englishVoice =
                availableVoices.find((voice) =>
                    voice.lang.toLowerCase().includes("en")
                ) || availableVoices[0];

            utterance.voice = englishVoice;
        }

        if (voiceType === "calm") {
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.volume = 1;
        } else if (voiceType === "motivational") {
            utterance.rate = 1.05;
            utterance.pitch = 1.1;
            utterance.volume = 1;
        } else if (voiceType === "friendly") {
            utterance.rate = 1;
            utterance.pitch = 1.2;
            utterance.volume = 1;
        } else {
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 1;
        }

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    };

    const showBrowserNotification = (message: string, time: string) => {
        if (!("Notification" in window)) return;
        if (Notification.permission !== "granted") return;

        new Notification("Voice Reminder", {
            body: `${message} • ${time}`,
            icon: "/favicon.ico",
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const currentHours = String(now.getHours()).padStart(2, "0");
            const currentMinutes = String(now.getMinutes()).padStart(2, "0");
            const currentTime = `${currentHours}:${currentMinutes}`;

            const today = now.toISOString().slice(0, 10);
            const currentDay = now.getDay();

            setReminders((prevReminders) =>
                prevReminders.map((reminder) => {
                    const alreadyTriggeredToday = reminder.lastTriggeredAt === today;

                    const createdDate = new Date(reminder.createdAt);
                    const createdDay = createdDate.getDay();

                    const isWeeklyEligible =
                        reminder.repeat === "weekly" && currentDay === createdDay;

                    const shouldTriggerToday =
                        reminder.repeat === "none" ||
                        reminder.repeat === "daily" ||
                        isWeeklyEligible;

                    if (
                        !alreadyTriggeredToday &&
                        shouldTriggerToday &&
                        reminder.time === currentTime &&
                        !reminder.triggered
                    ) {
                        speakReminder(reminder.message, reminder.voice);
                        showBrowserNotification(reminder.message, reminder.time);

                        return {
                            ...reminder,
                            triggered: true,
                            lastTriggeredAt: today,
                        };
                    }

                    if (
                        reminder.repeat !== "none" &&
                        reminder.lastTriggeredAt !== today &&
                        reminder.triggered
                    ) {
                        return {
                            ...reminder,
                            triggered: false,
                        };
                    }

                    return reminder;
                })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <CssBaseline />

            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "#0b1220",
                    background:
                        "radial-gradient(circle at top left, rgba(59,130,246,0.18), transparent 24%), radial-gradient(circle at bottom right, rgba(236,72,153,0.15), transparent 24%), linear-gradient(180deg, #0b1220, #111827 60%, #0f172a)",
                }}
            >
                <AppHeader
                    title="Voice Reminder"
                    subtitle="Smart speaking reminders with snooze, repeat, and notifications"
                    onBack={onBack}
                    actionLabel={
                        notificationPermission === "granted"
                            ? "Notifications Enabled"
                            : notificationPermission === "unsupported"
                                ? "Notifications Unsupported"
                                : "Enable Notifications"
                    }
                    onActionClick={
                        notificationPermission === "granted" ||
                            notificationPermission === "unsupported"
                            ? undefined
                            : requestNotificationPermission
                    }
                    actionIcon={<CampaignRoundedIcon />}
                    actionDisabled={
                        notificationPermission === "granted" ||
                        notificationPermission === "unsupported"
                    }
                />

                <Box
                    sx={{
                        flex: 1,
                        display: "grid",
                        gridTemplateColumns: "420px 1fr",
                        gap: 2,
                        p: 2,
                        minHeight: 0,
                        overflow: "hidden",
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            height: 0,
                            minHeight: "100%",
                            overflowY: "auto",
                            overflowX: "hidden",
                            borderRadius: 5,
                            border: "1px solid rgba(255,255,255,0.08)",
                            bgcolor: "rgba(255,255,255,0.88)",
                            backdropFilter: "blur(18px)",
                            p: { xs: 2, sm: 3 },
                            boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
                            scrollbarWidth: "thin",
                            scrollbarColor: "#cbd5e1 transparent",
                            "&::-webkit-scrollbar": {
                                width: "8px",
                            },
                            "&::-webkit-scrollbar-track": {
                                background: "transparent",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#cbd5e1",
                                borderRadius: "999px",
                                border: "2px solid transparent",
                                backgroundClip: "content-box",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: "#94a3b8",
                            },
                        }}
                    >
                        <ReminderForm onAddReminder={handleAddReminder} />
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            height: 0,
                            minHeight: "100%",
                            overflowY: "auto",
                            overflowX: "hidden",
                            borderRadius: 5,
                            border: "1px solid rgba(255,255,255,0.08)",
                            bgcolor: "rgba(255,255,255,0.88)",
                            backdropFilter: "blur(18px)",
                            p: { xs: 2, sm: 3 },
                            boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
                            scrollbarWidth: "thin",
                            scrollbarColor: "#cbd5e1 transparent",
                            "&::-webkit-scrollbar": {
                                width: "8px",
                            },
                            "&::-webkit-scrollbar-track": {
                                background: "transparent",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#cbd5e1",
                                borderRadius: "999px",
                                border: "2px solid transparent",
                                backgroundClip: "content-box",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: "#94a3b8",
                            },
                        }}
                    >
                        <ReminderList
                            reminders={reminders}
                            onDeleteReminder={handleDeleteReminder}
                            onSnoozeReminder={handleSnoozeReminder}
                        />
                    </Paper>
                </Box>
            </Box>
        </>
    );
}

export default VoiceReminder;