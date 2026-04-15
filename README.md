# Nexora

**Nexora** is a smart productivity suite built with **React + Vite + TypeScript + Material UI**.  
It combines multiple useful mini-apps into one elegant platform with a futuristic landing page and reusable architecture.

## Live Modules

### 1. Resume Builder
Create professional resumes with:
- step-by-step form flow
- live preview
- multiple templates
- PDF export
- localStorage persistence

### 2. Task Manager
Manage daily work with:
- add tasks
- mark complete
- filter tasks
- clean dashboard UI

### 3. Voxa — Smart Voice Reminder
A voice-powered reminder assistant with:
- speaking reminders
- voice preview
- snooze for 5 minutes
- browser notifications
- repeat modes (one-time / daily / weekly)
- localStorage persistence

---

## Tech Stack

- **React**
- **Vite**
- **TypeScript**
- **Material UI**
- **html2canvas**
- **jsPDF**
- **Web Speech API**
- **Browser Notifications API**
- **localStorage**

---

## Project Structure

```bash
src/
  components/
    shared/
      AppHeader.tsx

    LandingPage/
      LandingPage.tsx

    ResumeBuilder/
      ResumeBuilder.tsx
      StepperForm.tsx
      TemplateSelector.tsx
      forms/
      preview/
      hooks/
      types/

    TaskManager/
      TaskManager.tsx
      Home.tsx
      Footer.tsx
      ...

    VoiceReminder/
      VoiceReminder.tsx
      ReminderForm.tsx
      ReminderList.tsx
      types.ts

  App.tsx
  
  Features
Nexora Platform
    futuristic landing page
    multi-project navigation
    reusable shared header
    scalable structure for future modules
Resume Builder
    personal info, education, experience, skills, projects
    live preview
    classic / modern / minimal templates
    export selected template as PDF
    dynamic file naming from user name
Task Manager
    task input
    completion toggle
    task filtering
    responsive dashboard layout
Voxa
    add reminder message and time
    choose voice style
    preview voice
    automatic speech when time matches
    snooze reminders
    repeat reminders
    browser notification support
    delete reminders
    localStorage persistence

    Installation

Clone the repository:

git clone <your-repo-url>
  cd nexora

Install dependencies:

  npm install

Start development server:

  npm run dev

Build for production:

  npm run build

Preview production build:

  npm run preview

PDF Export Notes

Resume Builder uses:

html2canvas
jsPDF

The selected resume template is exported in the same visual style shown in preview.

  Browser APIs Used
  Web Speech API

Used in Voxa to speak reminders aloud.

Notifications API

Used in Voxa to show browser notifications when reminders trigger.

Branding

Product Name: Nexora
Tagline: Your Smart Productivity Suite

Voice Reminder Module Name: Voxa

Future Improvements

Possible future modules and enhancements:

expense tracker
habit tracker
AI planner
better recurring reminder controls
deployment branding improvements
analytics dashboard
Why This Project Matters

Nexora is more than a single app.
It demonstrates:

reusable component architecture
multi-module frontend structure
modern UI design
TypeScript-based component design
integration with browser APIs
real product-style user experience
Author

Built by Archana Tiwari

Frontend project suite focused on modern UI, practical tools, and scalable architecture.