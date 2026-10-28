<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { uniqueById, groupByCause, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  const rows = reports as Report[];
  const unique = uniqueById(rows);
  const merged = unique.filter(r => r.mergedInto === 4471);
  const groups = groupByCause(merged, tenantOf);
  const taggedWrong = groups.flatMap(g => g.reports.filter(r => r.meta.intakeTag !== g.cause));
  const unusual = merged.filter(r => notes.oneDayMove.includes(r.id));
  const receivedBeforeJuly = merged.filter(r => r.receivedAt.slice(0, 10) < '2026-07-01').length;
  const mergedJuly2 = merged.filter(r => r.mergedAt?.slice(0, 10) === '2026-07-02').length;
</script>

<p>
  The export has <strong>{rows.length} rows</strong> but <strong>{unique.length} unique report IDs</strong>:
  {rows.length - unique.length} overlapping rows must not be counted again. All {merged.length}
  unique reports are filed under #4471. The supplied tenant-based logic assigns them to
  <strong>{groups.length} causes</strong>; {taggedWrong.length} intake tags disagree with those assignments.
</p>

<h2>Two problems need separate engineering tickets</h2>
{#each groups as group (group.cause)}
  <section>
    <h3>{group.cause === 'parser' ? 'Parser assumes month first' : 'Booking-v3 gives a month-first hint to day-first tenants'}</h3>
    <p>
      <strong>{group.reports.length} reports</strong>, across {group.tenants} tenants;
      received {group.firstSeen} through {group.lastSeen} in this export.
      {#if group.cause === 'parser'}
        The shared parser reads month first even when the tenant writes day first.
        Correct the parsing contract to respect the tenant's date convention and test ambiguous dates.
      {:else}
        The form prints <code>MM/DD/YYYY</code>, but interprets the entry using the tenant's day-first convention.
        Correct the hint and input interpretation together; a shared-parser fix alone does not resolve this path.
      {/if}
    </p>
  </section>
{/each}

<h2>{unusual.length} reports still need investigation</h2>
<p>
  The supplied classifier files the following {unusual.length} reports under <code>parser</code>.
  They remain included in that total. Their bodies describe a one-day change, an invite arriving
  before booking, or other timing anomalies. Tenant and channel routing do not prove the mechanism
  behind those symptoms. Ask for the original input, stored booking timestamp, output and timezone;
  split a further cause only when evidence supports it. Do not label these a confirmed timezone bug.
</p>
<ul>
  {#each unusual as report (report.id)}
    <li><code>{report.id}</code> · {report.tenant} · {report.channel}: “{report.body}”</li>
  {/each}
</ul>

<h2>The July spike is a merge event</h2>
<p>
  {receivedBeforeJuly} reports were already received before July. The desk merged {mergedJuly2}
  reports on 2 July. The received and merged series measure different events: the merge spike
  does not establish a July onset or a July release regression. Reports continue through the
  end of this export; a queue status of “known” does not establish a fix or resolution.
</p>
