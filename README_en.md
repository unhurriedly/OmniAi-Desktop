<img width="70" height="70" alt="OmniAI logo" src="https://github.com/user-attachments/assets/b974e1f4-beae-4ab5-bcba-7853716822e5" />

# OmniAI

**All AI, one place.**

An AI-native desktop app that brings leading AI assistants together in one window. Switch instantly between ChatGPT, Claude, Gemini, Manus, DeepSeek, GLM, Doubao, MiniMax, Kimi, and more, without juggling browser tabs, signing in repeatedly, or losing context.

English | [简体中文](./README.md)

[Official website](https://unhurriedly.github.io/OmniAi-Desktop/) | [Download the latest release](https://github.com/unhurriedly/OmniAi-Desktop/releases)

[![Download](https://img.shields.io/badge/Download-GitHub%20Releases-blue?style=flat-square)](https://github.com/unhurriedly/OmniAi-Desktop/releases)

<img width="3840" height="1672" alt="OmniAI workspace" src="https://github.com/user-attachments/assets/9d9b32d8-9c95-4e11-8286-30ddd1e19574" />
<img width="3806" height="1516" alt="OmniAI model switching" src="https://github.com/user-attachments/assets/c150b937-20b3-438f-9d87-2cff5b611948" />
<img width="3840" height="1502" alt="OmniAI workflow" src="https://github.com/user-attachments/assets/9324ce07-f5fb-44a1-8e8f-6d6890b4bfce" />

## The Problem

AI tools are scattered across different apps and websites. Switching between them interrupts your flow: managing tabs, signing in again, and losing context all create unnecessary cognitive overhead.

## The Solution

OmniAI brings all your AI assistants into one native workspace. Sessions stay active, switching is instant, and every service remains organized in one place.

## Features

### Instant Switching

Jump between AI platforms with a click or keyboard shortcut. ChatGPT, Claude, Gemini, DeepSeek, GLM, Doubao, MiniMax, Kimi, and ERNIE Bot are all instantly accessible.

### Global and China Services

OmniAI includes built-in support for both global and China-based AI services:

- **Global:** Claude, ChatGPT, Gemini, Manus, Perplexity
- **China:** DeepSeek, GLM, MiniMax, Doubao, Kimi, ERNIE Bot, Qwen, Jimeng, Coze

Switch regions at any time. OmniAI remembers the last service used in each region.

### Plugins

- The core app stays lightweight, containing only the WebView container, navigation, and essential settings.
- Optional features are available as independent plugins that users can install on demand.
- Plugins are released through GitHub, and the app automatically detects new versions.
- [Browse and download plugins](https://github.com/unhurriedly/OmniAi-Desktop/tree/main/Plugins)

### Persistent WebViews

Each service runs in a persistent WebView that remains active when you switch away. Return to a service and continue exactly where you left off, without reloading or refreshing.

### Persistent Sessions

Authentication cookies are stored locally and remain available after restarting the app. Sign in once and stay signed in.

### Global Shortcuts

Keep your hands on the keyboard:

- `Option + Space` - Show or hide OmniAI from anywhere
- `Cmd + 1/2/3...` - Switch to an AI service by its position

The global shortcut can be fully customized in Settings.

### Help Center

Built-in documentation covers keyboard shortcuts, settings, and getting started. It is always available from the navigation bar.

## Who Is It For?

- **Developers** - Compare model responses and test prompts across services
- **Product managers** - Evaluate capabilities from different AI providers
- **Creators** - Use the right AI tool for each part of the creative process
- **Power users** - Work with multiple AI assistants every day

## Getting Started

1. **Download** the latest version from [GitHub Releases](https://github.com/unhurriedly/OmniAi-Desktop/releases).
2. **Install** OmniAI on your Mac.
3. **Launch** it from Applications or the menu bar.
4. **Configure shortcuts** in Settings > Shortcuts.
5. **Start using OmniAI** by pressing your global shortcut and choosing a service.
6. **If macOS says the app cannot be opened**, open Terminal and run:

```bash
xattr -cr /Applications/OmniAi.app
```

## Privacy

OmniAI runs entirely on your local machine:

- Session data is stored locally
- No external proxy server
- No analytics, telemetry, or tracking
- Your conversations stay between you and the AI services you use

## Roadmap

- [ ] Context preservation
- [ ] Information subscriptions
- [ ] Skills integration
- [ ] Web services

## Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request.
