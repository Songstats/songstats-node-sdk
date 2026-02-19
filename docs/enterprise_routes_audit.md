# Enterprise Routes Audit (Songstats Rails -> Node SDK)

Audited against:

- `/Users/Oskar/1001tl/config/routes.rb`
- `/Users/Oskar/1001tl/app/controllers/enterprise/v1/*.rb`
- `/Users/Oskar/1001tl/app/helpers/enterprise_helper.rb`

Authentication observed in Rails: `apikey` request header.

## `/enterprise/v1/info`

| HTTP | Route           | SDK Method               |
| ---- | --------------- | ------------------------ |
| GET  | `/sources`      | `client.info.sources()`  |
| GET  | `/status`       | `client.info.status()`   |
| GET  | `/uptime_check` | `client.info.uptime_check()` |
| GET  | `/definitions`  | `client.info.definitions()` |

## `/enterprise/v1/tracks`

| HTTP   | Route                               | SDK Method                                            |
| ------ | ----------------------------------- | ----------------------------------------------------- |
| GET    | `/info`                             | `client.tracks.info({...})`                           |
| GET    | `/stats`                            | `client.tracks.stats({...})`                          |
| GET    | `/historic_stats`                   | `client.tracks.historicStats({...})`                  |
| GET    | `/search`                           | `client.tracks.search({ q, ... })`                    |
| GET    | `/activities`                       | `client.tracks.activities({...})`                     |
| GET    | `/comments`                         | `client.tracks.comments({...})`                       |
| GET    | `/songshare`                        | `client.tracks.songshare({...})`                      |
| GET    | `/locations`                        | `client.tracks.locations({...})`                      |
| POST   | `/link_request`                     | `client.tracks.addLinkRequest({ link, ... })`         |
| DELETE | `/link_request`                     | `client.tracks.removeLinkRequest({ link, ... })`      |
| POST   | `/add_to_member_relevant_list`      | `client.tracks.addToMemberRelevantList({...})`        |
| DELETE | `/remove_from_member_relevant_list` | `client.tracks.removeFromMemberRelevantList({...})`   |

## `/enterprise/v1/artists`

| HTTP   | Route                               | SDK Method                                               |
| ------ | ----------------------------------- | -------------------------------------------------------- |
| GET    | `/info`                             | `client.artists.info({...})`                             |
| GET    | `/stats`                            | `client.artists.stats({...})`                            |
| GET    | `/historic_stats`                   | `client.artists.historicStats({...})`                    |
| GET    | `/audience`                         | `client.artists.audience({...})`                         |
| GET    | `/audience/details`                 | `client.artists.audienceDetails({ country_code, ... })`  |
| GET    | `/catalog`                          | `client.artists.catalog({...})`                          |
| GET    | `/search`                           | `client.artists.search({ q, ... })`                      |
| GET    | `/activities`                       | `client.artists.activities({...})`                       |
| GET    | `/songshare`                        | `client.artists.songshare({...})`                        |
| GET    | `/top_tracks`                       | `client.artists.topTracks({...})`                        |
| GET    | `/top_playlists`                    | `client.artists.topPlaylists({...})`                     |
| GET    | `/top_curators`                     | `client.artists.topCurators({...})`                      |
| GET    | `/top_commentors`                   | `client.artists.topCommentors({...})`                    |
| POST   | `/link_request`                     | `client.artists.addLinkRequest({ link, ... })`           |
| DELETE | `/link_request`                     | `client.artists.removeLinkRequest({ link, ... })`        |
| POST   | `/track_request`                    | `client.artists.addTrackRequest({...})`                  |
| DELETE | `/track_request`                    | `client.artists.removeTrackRequest({...})`               |
| POST   | `/add_to_member_relevant_list`      | `client.artists.addToMemberRelevantList({...})`          |
| DELETE | `/remove_from_member_relevant_list` | `client.artists.removeFromMemberRelevantList({...})`     |

## `/enterprise/v1/collaborators`

| HTTP   | Route                               | SDK Method                                                      |
| ------ | ----------------------------------- | --------------------------------------------------------------- |
| GET    | `/info`                             | `client.collaborators.info({...})`                              |
| GET    | `/stats`                            | `client.collaborators.stats({...})`                             |
| GET    | `/historic_stats`                   | `client.collaborators.historicStats({...})`                     |
| GET    | `/audience`                         | `client.collaborators.audience({...})`                          |
| GET    | `/audience/details`                 | `client.collaborators.audienceDetails({ country_code, ... })`   |
| GET    | `/catalog`                          | `client.collaborators.catalog({...})`                           |
| GET    | `/search`                           | `client.collaborators.search({ q, ... })`                       |
| GET    | `/activities`                       | `client.collaborators.activities({...})`                        |
| GET    | `/songshare`                        | `client.collaborators.songshare({...})`                         |
| GET    | `/top_tracks`                       | `client.collaborators.topTracks({...})`                         |
| GET    | `/top_playlists`                    | `client.collaborators.topPlaylists({...})`                      |
| GET    | `/top_curators`                     | `client.collaborators.topCurators({...})`                       |
| GET    | `/top_commentors`                   | `client.collaborators.topCommentors({...})`                     |
| POST   | `/link_request`                     | `client.collaborators.addLinkRequest({ link, ... })`            |
| DELETE | `/link_request`                     | `client.collaborators.removeLinkRequest({ link, ... })`         |
| POST   | `/track_request`                    | `client.collaborators.addTrackRequest({...})`                   |
| DELETE | `/track_request`                    | `client.collaborators.removeTrackRequest({...})`                |
| POST   | `/add_to_member_relevant_list`      | `client.collaborators.addToMemberRelevantList({...})`           |
| DELETE | `/remove_from_member_relevant_list` | `client.collaborators.removeFromMemberRelevantList({...})`      |

## `/enterprise/v1/labels`

| HTTP   | Route                               | SDK Method                                               |
| ------ | ----------------------------------- | -------------------------------------------------------- |
| GET    | `/info`                             | `client.labels.info({...})`                              |
| GET    | `/stats`                            | `client.labels.stats({...})`                             |
| GET    | `/historic_stats`                   | `client.labels.historicStats({...})`                     |
| GET    | `/audience`                         | `client.labels.audience({...})`                          |
| GET    | `/audience/details`                 | `client.labels.audienceDetails({ country_code, ... })`   |
| GET    | `/catalog`                          | `client.labels.catalog({...})`                           |
| GET    | `/search`                           | `client.labels.search({ q, ... })`                       |
| GET    | `/activities`                       | `client.labels.activities({...})`                        |
| GET    | `/songshare`                        | `client.labels.songshare({...})`                         |
| GET    | `/top_tracks`                       | `client.labels.topTracks({...})`                         |
| GET    | `/top_playlists`                    | `client.labels.topPlaylists({...})`                      |
| GET    | `/top_curators`                     | `client.labels.topCurators({...})`                       |
| GET    | `/top_commentors`                   | `client.labels.topCommentors({...})`                     |
| POST   | `/link_request`                     | `client.labels.addLinkRequest({ link, ... })`            |
| DELETE | `/link_request`                     | `client.labels.removeLinkRequest({ link, ... })`         |
| POST   | `/track_request`                    | `client.labels.addTrackRequest({...})`                   |
| DELETE | `/track_request`                    | `client.labels.removeTrackRequest({...})`                |
| POST   | `/add_to_member_relevant_list`      | `client.labels.addToMemberRelevantList({...})`           |
| DELETE | `/remove_from_member_relevant_list` | `client.labels.removeFromMemberRelevantList({...})`      |
