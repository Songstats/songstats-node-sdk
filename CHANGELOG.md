# Changelog

All notable changes to this project are documented in this file.

## [0.2.0] - 2026-02-19

### Changed

- Removed `charts` resource client from the SDK surface
- Removed `stations` resource client from the SDK surface
- Removed internal `/api/v1` enterprise admin/billing client surface to align with Ruby gem scope
- Kept `info` endpoints:
  - `client.info.sources()` (`/sources`)
  - `client.info.status()` (`/status`)
  - `client.info.definitions()` (`/definitions`)

## [0.1.0] - 2026-02-19

### Added

- Initial standalone Node.js SDK repo for Songstats Enterprise API (`/enterprise/v1`)
- Full resource coverage:
  - `info`
  - `tracks`
  - `artists`
  - `collaborators`
  - `labels`
  - `charts`
  - `stations`
- Shared HTTP client with:
  - `apikey` header auth
  - JSON response decoding
  - retry/backoff on transport errors and retryable status codes
- Structured exception types for API and transport failures
- Route coverage audit doc mapping Rails routes to SDK methods
- Test suite covering route mapping, header auth, validation, and error handling
