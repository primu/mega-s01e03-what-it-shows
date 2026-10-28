import{a as p,f as c}from"./CeQ0Fui8.js";import{R as u}from"./lxLLZh2g.js";import{w as n,g as l}from"./-v_Lc1Yp.js";import{l as h,s as m}from"./BvfZsH8o.js";import{D as f}from"./BMQSWMDQ.js";import{R as g}from"./DcCN1BeL.js";const e={layout:"runbook",title:"0002 · Merge reports only with evidence of the same cause",owner:"support desk",status:"proposed",reviewed:"2026-10-28T00:00:00.000Z",signature:"primu / Codex / S01E03"},{layout:T,title:D,owner:S,status:M,reviewed:P,signature:v}=e;var b=c(`<h2>Context</h2> <p>The desk handles several products. Subject-only merging under accepted decision 0001 put
separate date mechanisms in #4471 and hid a problem without its own ticket. Intake tags also
disagree with tenant configuration. The <a href="/kb/incidents/4471-reassessment/">reassessment</a> contains computed evidence and uncertainty.</p> <h2>Proposed replacement for decision 0001</h2> <p>Use subjects to find candidate reports, then read the body and verify the mechanism using
the product, tenant configuration, channel and observed behavior. Merge only when evidence
supports the same cause. Different subjects can be duplicates; identical subjects need not be.
Unknown tenants or unsupported symptoms go into investigation, with a request for missing
evidence. The date-specific classifier is evidence for this incident, not a universal
classifier for every product on the desk.</p> <!> <h2>Rollout and consequences</h2> <p>The support owner must approve this proposal before it replaces accepted decision 0001.
Until then, pause automatic merges on subject alone and review new reports manually.
After approval, link triage to this record, split existing mixed tickets, preserve report IDs
and event timestamps, and assign one accountable owner to each cause. Recompute counts after
new exports and review the policy at least every 180 days. Reading reports takes longer, but
prevents unrelated fixes from being hidden behind one “known” status.</p> <p>Do not edit the accepted historical decision; record future changes in another numbered record.</p> <!>`,1);function _(o,r){const a=h(r,["children","$$slots","$$events","$$legacy"]);u(o,m(()=>a,()=>e,{children:(i,w)=>{var t=b(),s=n(l(t),8);f(s,{});var d=n(s,8);g(d,{get signature(){return v}}),p(i,t)},$$slots:{default:!0}}))}const U=Object.freeze(Object.defineProperty({__proto__:null,default:_,metadata:e},Symbol.toStringTag,{value:"Module"}));export{U as _,_ as a};
