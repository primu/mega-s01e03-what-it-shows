# S01E03 — what it shows

Reassessment of the supplied support knowledge-base export and mixed ticket #4471.
This repository is a MEGA.dev course exercise. It contains course-story data, not a
production support-system export. The original export was dated 2026-10-04; this
review was prepared on 2026-10-28.

## Deliverables

- [Signed reassessment source](src/routes/kb/incidents/4471-reassessment/+page.svx)
- [Rendered reassessment HTML](build/kb/incidents/4471-reassessment/index.html)
- [Rendered page screenshot](evidence/4471-reassessment.png)
- [Proposed replacement decision](src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx)
- [Exact report assignments](evidence/report-assignments.json)
- Issue drafts: [parser](issues/parser.md), [booking-v3 hint](issues/hint.md)

The supplied classifier assigns **379** unique reports to the parser and **33** to
the booking-v3 hint, totaling **412**. The input has **427 rows**, including **15**
overlapping IDs. Counts in the kb page are computed by components, not typed into
prose. Five reports remain counted under the parser by the supplied classifier but
need further investigation because their reported symptoms do not establish that mechanism.

The accepted decision 0001 is preserved. The proposed decision 0002 requires desk-owner
approval, and addresses new reports across all products the desk supports.

## View the rendered kb

The complete static build, including its CSS and JavaScript, is committed under `build/`.
Serve that folder locally with a static HTTP server and open
`/kb/incidents/4471-reassessment/`. Opening the HTML directly from GitHub shows source;
the screenshot is a convenient preview. No public hosting is required.

## Rebuild

Use Node.js 20.19+ or 22.12+ and the lockfile:

```sh
npm ci --ignore-scripts
npm run build
npm run preview -- --port 4317
```

The project adds a SvelteKit/mdsvex/static-adapter harness around the exported `.svx`
pages and supplied Svelte components. `#lib` is mapped to `src/lib`.
The original export conventions are retained in [EXPORT-README.md](EXPORT-README.md).

## Verification and limits

The Svelte production build passed. The page was opened in Chrome and its rendered
counts, cause table, timeline, duplicate examples and signature stamp were inspected.
The production booking application was not available, so no production fix or
reproduction is claimed. These counts are tied to the exported snapshot and must be
refreshed when new reports arrive.
