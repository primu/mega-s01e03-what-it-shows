# Booking-v3 date hint contradicts day-first tenant parsing

## Scope and count

**33 unique reports** assigned to `hint` from source ticket #4471, across 3 tenants,
received 2026-04-17 through 2026-09-22 in the supplied 2026-10-04 export.
Deduplicate by report ID (last occurrence wins), filter `mergedInto === 4471`, and
apply `causeOf` using the tenant's locale and booking form. The affected path is
`channel === 'form'`, a day-first tenant, and `form === 'booking-v3'`.

## Observed behavior

Booking-v3 prints **MM/DD/YYYY** under the input, while the form reads the entered date
using the tenant's day-first convention. People following the hint get a swapped date.
For example R-41230 is a form report from copper.studio (`es-ES`, booking-v3):
the client came on 1 June instead of 6 January. Its browser locale and intake tag
suggest `parser`, but the configured tenant and form place it in `hint`.

Affected tenant configurations: alder.physio (`de-DE`), copper.studio (`es-ES`),
and pale.harbour (`pt-PT`), all using booking-v3.

## Expected behavior and fix to investigate

Make the displayed format, input validation and date interpretation agree with the
tenant's locale. Test the displayed hint together with submitted ambiguous dates and
dates with days above 12 for each affected tenant. Verify resulting booking/invite dates.

This needs its own ticket because changing the shared month-first parser does not repair
a contradictory form hint. The export documents the path; production reproduction
and fix verification remain engineering work.

## Evidence and count checks

18 reports are intake-tagged `hint`; 15 are tagged `parser`. Intake tagging is not
the classification rule. The supplied tenant-based classifier gives 33, not the
raw count of intake tags or export rows. The parser ticket covers the other 379,
for a total of 412 unique source reports.

- `src/lib/kb/causes.ts` (`DATE_HINT`, `causeOf`, `uniqueById`)
- `src/lib/kb/locales.ts`, `src/lib/data/tenants/*.json`, `src/lib/data/reports-4471.json`
- `src/routes/kb/incidents/4471-reassessment/+page.svx`
- `build/kb/incidents/4471-reassessment/index.html` and `evidence/4471-reassessment.png`
- `evidence/report-assignments.json` lists the counted report IDs.

Keep this open until this form path is verified fixed. Split and transfer reports once,
preserving their IDs; do not close it just because the parent ticket is marked “known.”
