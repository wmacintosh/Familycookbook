# Changelog

All notable changes to the Family Cookbook project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- TypeScript strict mode enabled for improved type safety
- Comprehensive dependency suite including:
  - `zod` for runtime validation
  - `dompurify` for XSS protection
  - `react-hot-toast` for notifications
  - `vitest` and testing libraries for unit testing
  - `eslint` and `prettier` for code quality
  - `web-vitals` for performance monitoring
- Constants file (`constants.ts`) for centralized configuration
- Environment configuration file (`config.ts`)
- Feature flags system (`featureFlags.ts`)
- Safe localStorage handling utilities
- Custom hooks for common patterns
- Comprehensive code review improvements

### Changed
- Removed invalid `@google/genai` dependency

### Security
- Added input validation and sanitization
- Implemented XSS protection with DOMPurify
- Added Content Security Policy
