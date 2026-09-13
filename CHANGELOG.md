# Changelog

All notable changes to this project are documented in this file.

## Unreleased

### Fixed

- Retry only GET and HEAD requests; ambiguous write failures are surfaced after one attempt.

## [0.2.2] - 2026-09-08

### Changed

- Updated API documentation links to `developers.stats.company/songstats`.

## [0.2.1] - 2026-06-14

### Changed

- Updated the default Enterprise API host from `data.songstats.com` to `api.songstats.com`.

## [0.2.0] - 2026-02-19

### Changed

- Updated `README.md` installation commands for published package usage.

## [0.1.0] - 2026-02-19

### Added

- Initial standalone Node.js SDK repo for Songstats Enterprise API (`/enterprise/v1`)
- Full resource coverage:
  - `info`
  - `tracks`
  - `artists`
  - `collaborators`
  - `labels`
- Shared HTTP client with:
  - `apikey` header auth
  - JSON response decoding
  - retry/backoff on transport errors and retryable status codes
- Structured exception types for API and transport failures
- Route coverage audit doc mapping Rails routes to SDK methods
- Test suite covering route mapping, header auth, validation, and error handling
