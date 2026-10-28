# Shared parser reads day-first tenant input as month first

## Scope and count

**379 unique reports** assigned to `parser` from source ticket #4471, across 11 tenants,
received 2026-04-01 through 2026-10-04 in the supplied 2026-10-04 export.
Count by unique report ID (last occurrence wins), filter `mergedInto === 4471`,
then run the supplied `causeOf` against each tenant's locale, form version and report channel.
Do not count raw overlapping export rows or group by `meta.intakeTag`.

## Observed behavior

The shared parser assumes month-first dates for tenants who write day first.
For example, report R-41200 from harbour.dental (`en-GB`, booking-v2, app)
describes a 7 April reminder going out on 4 July. R-41203 describes 2 December
becoming 12 February. These are reported symptoms and the kb's documented mechanism;
we have not reproduced the production application.

## Expected behavior and fix to investigate

Interpret date input according to the tenant's explicit format contract. Reject ambiguity
or inconsistent input where appropriate. Test both ambiguous dates and dates whose day
exceeds 12 across the configured tenant locales. Verify the emitted booking/invite date.

This ticket is separate from the booking-v3 hint mismatch: that path tells users to
enter month first but interprets their input day first. Fixing one path does not prove
the other fixed.

## Count limitations and follow-up

356 reports in this group are intake-tagged `parser`; 23 are intake-tagged `hint`.
These tags do not define the cause. Five reports flagged in `desk-notes.json`
(R-41202, R-41209, R-41236, R-41344, R-41620) remain included in the classifier's 379.
Their bodies describe timing anomalies that need investigation; this count is a routing
assignment, not proof that all five share this mechanism. Obtain original input, stored
timestamps, timezone and rendered output. Do not assert a third confirmed cause without evidence.

## Evidence and acceptance

- `src/lib/kb/causes.ts`, `locales.ts`, `src/lib/data/tenants/*.json`
- `src/lib/data/reports-4471.json`, `desk-notes.json`
- `src/routes/kb/incidents/4471-reassessment/+page.svx`
- `build/kb/incidents/4471-reassessment/index.html` and `evidence/4471-reassessment.png`
- `evidence/report-assignments.json` lists every ID counted under each cause.

## Engineering outcome

After our first submission, the course's engineering update reported #4471 closed on
5 October: **parser FIXED — `fix(dates): parse dd/mm for eu locales`**.
Source: https://hq.mega.dev/challenges/what-it-shows#engineering-update (checked 28 October 2026).
Close this ticket as **completed** based on that reported fix. We did not independently
reproduce production behavior. The 379 reports remain the historical export count.
The course accepted this cause and count; the signed kb records the later desk update.
