<img width="70" height="70" alt="正式logo" src="https://github.com/user-attachments/assets/b974e1f4-beae-4ab5-bcba-7853716822e5" />

# OmniAi

**All AI, one place.**

一款 AI 原生应用，将所有主流 AI 助手聚合在一个窗口中。可以在 ChatGPT、Claude、Gemini、Manus、DeepSeek、GLM、豆包、MiniMax、Kimi 等 AI 应用之间瞬时切换——无需浏览器标签页，无需重复登录。

[English](./README_en.md) | 简体中文

[![下载地址](https://img.shields.io/badge/Download-GitHub%20Releases-blue?style=flat-square)](https://github.com/unhurriedly/OminiAi/releases)

## 痛点

AI 工具分散在不同的应用和网站中。在它们之间切换会打断你的工作节奏——管理标签页、重新认证、丢失上下文。认知负担是真实存在的。

## 解决方案

OmniAi 将所有 AI 助手聚合在一个 AI 原生应用中。你的会话保持活跃，切换即时，所有内容井然有序。

## 功能特点

### 瞬时切换

只需单击或使用键盘快捷键，即可在任意 AI 平台之间跳转。ChatGPT、Claude、Gemini、DeepSeek、GLM、豆包、MiniMax、Kimi、文心一言——全部即时可达。

### 国际版与国内版

内置支持国际和国内 AI 服务：

- **国际版 Global**：Claude、ChatGPT、Gemini、Manus
- **国内版**：DeepSeek、GLM、MiniMax、豆包、Kimi、文心一言

随时切换区域——每个区域上次使用的服务会被记住。

### 网络加速

内置支持国内的用户使用 Global AI 服务：
上传网络加速配置文件即可完成自动加速。

### WebView 常驻

每个服务都在持久化的 WebView 中运行，永不销毁。当你切换回来时，一切都保持原样——无需重新加载，无需刷新。

### 会话持久化

认证 Cookie 安全存储，并在应用重启后保持有效。只需登录一次，持续保持登录状态。无需反复登录。

### 全局快捷键

保持双手在键盘上：

- `Option + Space` —— 全局热键，唤起或隐藏 OmniAi
- `Cmd + 1/2/3...` —— 按位置快速切换到对应 AI 服务

（全局热键可在设置中完全自定义）

### 帮助中心

内置文档，涵盖键盘快捷键、设置说明和入门指南。可随时从导航栏访问。

## 适用人群

- **开发者** —— 对比 AI 响应，在不同模型间测试提示词
- **产品经理** —— 评估不同提供商的 AI 能力
- **创作者** —— 利用不同的 AI 工具完成不同任务
- **重度用户** —— 每天使用多个 AI 助手的任何人

## 快速开始

1. **下载** 从 [Releases 页面](https://github.com/unhurriedly/OminiAi/releases) 下载最新版本
2. **安装** 将 OmniAi 应用程序双击安装
3. **启动** 从应用程序或菜单栏启动
4. **设置快捷键** 在设置 → 快捷键中配置
5. **开始使用** —— 按下热键并选择你的 AI
6. **异常处理** —— 安装后无法打开，提示删除。处理方法-打开「终端」（在启动台 → 其他 → 终端），输入
```bash
xattr -cr /Applications/OmniAi.app
```

## 隐私

OmniAi 完全在你的本地机器上运行：

- 所有会话数据存储在本地
- 无外部服务器，无代理
- 无分析、无遥测、无追踪
- 你的对话永不离开你的设备

## 发展规划

- [ ] 上下文保持
- [ ] 信息订阅模块
- [ ] Skills 引入
- [ ] 网络服务

## 贡献

欢迎贡献！请随时提交问题和建议。
