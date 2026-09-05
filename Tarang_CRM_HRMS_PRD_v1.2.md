# Tarang CRM + HRMS — Product Requirements Document

**Product:** Tarang CRM & HRMS
**Version:** 1.2
**Primary Roles:** Admin, BDA, Telecaller
**Status:** Draft for build

---

## 1. Objective

Build a centralized CRM + HRMS for Tarang to manage the complete customer journey from lead generation to conversion.

The system must support leads coming from:

- Tarang Karts
- Gated communities
- Malls
- Exhibitions
- Events
- Furniture stores
- Architects
- Interior designers
- Referrals
- Website
- Social media
- Direct enquiries
- Any other source

**Core workflow:**

`Lead Creation → Lead Assignment → Calling → Follow-up → Demo Scheduling → Demo → Sales Follow-up → Conversion`

---

## 2. Key Architectural Principle

> Anyone (Admin, BDA, Telecaller) can create a lead, but the system must always distinguish **who created it**, **who currently owns it**, **who is running the demo**, and **who is closing it**. A single "Assigned To" field is not sufficient once lead creation is open to three roles.

```
             LEAD
               │
      ┌────────┼──────────┐
      ↓        ↓          ↓
  Created By  Lead      Demo
              Owner     BDA
      │        │          │
      ↓        ↓          ↓
     Any    Telecaller   BDA
     Role   (follow-up)
               │
               ↓
          Sales Owner
               │
               ↓
           Conversion
```

---

## 3. User Roles & Permissions

### 3.1 Admin
Full system access:
- Add/edit/delete employees
- Add leads
- Assign/reassign leads (Lead Owner, Telecaller, Demo BDA, Sales Owner)
- Manage karts, locations
- Assign BDA to karts
- Assign leads to telecallers
- Assign demos to BDAs
- View all activities, employee locations
- Manage attendance
- View reports, sales funnel, source performance, kart performance
- Export reports
- View and export the full audit log (cannot delete entries)

### 3.2 BDA
Field sales and customer acquisition:
- Add leads
- View own leads / assigned leads
- Update lead information (customer info, notes, interest, requirement)
- Schedule/request follow-up
- View assigned demos, conduct demos, update demo status
- Update opportunity, mark conversion
- Check in at assigned locations
- View own performance

**Explicitly restricted:** BDA cannot reassign Lead Owner, Telecaller, or Sales Owner on a lead — that is Admin-only, to prevent two BDAs silently fighting over the same lead. A BDA can *request* reassignment, which creates an Admin-facing notification.

### 3.3 Telecaller
Calling and follow-up:
- Add leads
- View assigned leads
- Call customers, update call status, add call notes
- Schedule follow-ups
- Schedule/reschedule/confirm demos
- Update customer interest
- View pending calls, overdue follow-ups, demo-related tasks

**Explicitly restricted:** same as BDA — cannot reassign ownership fields directly.

---

## 4. Lead Creation

All three roles can create a lead. On creation, the system automatically records (never manually entered):

- **Lead Created By** — Admin / BDA / Telecaller
- Employee name, Employee ID
- Date, time
- Location, if available (GPS, if the creating device provides it)

### 4.1 Duplicate Detection (mandatory at creation — V1)

Because three roles can independently create leads for the same person (kart visit + phone-in + Instagram DM), the system **must** check the phone number against existing `Customers` at the point of creation:

- **No match found** → create new Customer + new Lead as normal.
- **Match found** → prompt the creator: *"A customer with this number already exists — link this as a new opportunity for [Customer], or view their existing lead?"*
  - Linking creates a new Lead row tied to the existing Customer ID (not a duplicate Customer), preserving source attribution for the new touchpoint while keeping one canonical customer record.
  - This is required for accurate source/conversion analytics (Sections 20–21) — without it, the same person gets double-counted across sources.

---

## 5. Lead Information Captured

### 5.1 Customer Information
- Customer name
- Phone number
- Alternate phone
- WhatsApp number
- Email
- City, Area, Address
- Customer type

### 5.2 Customer Type
```
Individual · Architect · Interior Designer · Furniture Store
Corporate · Hotel · Builder · Real Estate · Office · Other
```

---

## 6. Lead Source (Mandatory)

The creator must select a source. No lead can be saved without one.

```
Kart – Gated Community      Instagram
Kart – Mall                 Facebook
Kart – Exhibition           WhatsApp
Kart – Event                Direct Enquiry
Furniture Store             Existing Customer
Architecture Firm           Other
Interior Designer
Referral
Website
```

### 6.1 Source Details (second-level fields)

Example:
```
Source:    Kart – Gated Community
Location:  Aparna Sarovar
Kart:      TK-004
BDA:       Rahul
```

This enables reporting such as "leads per kart" and "which gated community converts best."

---

## 7. Lead Ownership Model

Each lead carries **four distinct role fields**, never collapsed into one "Assigned To":

| Field | Meaning |
|---|---|
| **Created By** | Who originally entered the lead (any role) |
| **Lead Owner** | Who is currently responsible for the lead overall |
| **Telecaller** | Who is responsible for calling/follow-up |
| **Demo BDA** | Who is responsible for conducting the demo |
| **Sales Owner** | Who is responsible for closing the opportunity |

**Default rule (V1):** Sales Owner defaults to the Demo BDA at the moment a demo is marked "Demo Completed," and can be reassigned by Admin from that point on. This resolves the ambiguity between the ownership table and the funnel diagram — Demo BDA and Sales Owner are the same person unless Admin explicitly splits them.

Example:
```
Created By:   BDA Rahul
Lead Owner:   BDA Rahul
Telecaller:   Priya
Demo BDA:     Rahul
Sales Owner:  Rahul   (defaulted from Demo BDA)
```

---

## 8. Automatic Lead Assignment

### 8.1 When a BDA creates a lead
```
BDA creates lead → Lead enters CRM → System assigns Telecaller (round robin)
                                    → Telecaller notified
```
Lead Owner defaults to the creating BDA.

### 8.2 When a Telecaller creates a lead
```
Telecaller creates lead → System assigns Lead Owner via BDA round robin
                         → Assigned BDA notified
```
**V1 default (previously undefined — now fixed):** Lead Owner assignment uses the same round-robin mechanism as Telecaller assignment, cycling through active BDAs. Admin can override at any time. This is a deliberate simplification for V1; smarter routing (Section 9) comes later.

### 8.3 When Admin creates a lead
```
Admin creates lead → Admin selects BDA + Telecaller manually
                    OR leaves blank → system applies round robin default
```

---

## 9. Lead Assignment Rules

### V1 — Round Robin (both Telecaller and Lead Owner/BDA assignment)
```
Lead 1 → Telecaller A       Lead 1 → BDA A
Lead 2 → Telecaller B       Lead 2 → BDA B
Lead 3 → Telecaller C       Lead 3 → BDA C
Lead 4 → Telecaller A       Lead 4 → BDA A
```

### V2 — Smarter assignment based on:
- Area / BDA location
- Telecaller workload
- Language
- Employee availability
- Customer type

---

## 10. Lead Status

```
New · Assigned · Calling Pending · Contacted · Interested
Follow-up Required · Demo Required · Demo Scheduled
Demo Confirmed · Demo Completed · Quotation Sent
Negotiation · Converted · Lost · Not Interested
No Response · Wrong Number · Future Prospect
```

**Added field:** When a lead is marked **Lost** or **Not Interested**, the user must select a reason from a short controlled list (Price, Timing, Chose Competitor, Not a Fit, Unreachable, Other). This is required for source-quality analysis in Section 20 — without a reason code, "Lost" leads are not analyzable.

---

## 11. Lead Priority

```
Hot   — e.g. "Customer wants to visit the office tomorrow"
Warm  — e.g. "Interested but needs a few days"
Cold  — e.g. "Limited interest shown"
```

---

## 12. Telecaller Workflow

**Dashboard:**
```
New Leads: 12   Calls Pending: 8   Follow-ups Today: 5
Demos Today: 3  Overdue: 2
```

**Call outcome options:**
```
Interested · Not Interested · Call Back · No Answer
Busy · Wrong Number · Demo Requested · Demo Scheduled
```
Notes can be added to every call.

---

## 13. Lead Follow-up

Example: customer says "Call me tomorrow."

Telecaller selects **Follow-up → Tomorrow → Time**, and the CRM auto-creates a task:
```
Customer:     Rahul
Follow-up:    06 Sep, 11:00 AM
Assigned To:  Priya
```

---

## 14. Demo Scheduling

```
Lead → Demo Required → Select Date/Time → Select/Auto-assign BDA → Demo Scheduled
```
The assigned BDA is notified.

---

## 15. Automatic Demo BDA Assignment

**Priority order:**
1. BDA who originally generated the lead
2. BDA responsible for that location
3. Available BDA with the lowest current demo workload

Admin can override at any time.

---

## 16. Demo Status

```
Scheduled · Confirmed · Customer Arrived · Demo Started
Demo Completed · Customer Interested · Follow-up Required
No Show · Cancelled · Rescheduled
```

---

## 17. Missed Demo Update Automation

If a demo's scheduled time passes and the status is still **Scheduled** or **Confirmed**, the CRM automatically raises:

> **Alert:** "Demo status has not been updated for [Customer]. Please update the outcome."

Sent to: Assigned Telecaller, Demo BDA, Admin.

---

## 18. Lead Timeline

Every lead has an append-only, human-readable timeline. Nothing is ever deleted from it.

```
05 Sep – Lead Created            (Created By: BDA Rahul)
05 Sep – Lead Assigned           (Telecaller: Priya)
05 Sep – Customer Contacted
05 Sep – Customer Interested
05 Sep – Demo Scheduled          (06 Sep, 4:00 PM)
06 Sep – Demo Completed          (BDA: Rahul)
08 Sep – Follow-up
10 Sep – Quotation Sent
15 Sep – Converted
```

The timeline is a rendered view generated from the structured `Lead_Assignments` and `Audit_Log` tables (Section 24) — it is not itself the source of truth for ownership history.

---

## 19. Lead Reassignment

Admin can reassign: Lead Owner, Telecaller, Demo BDA, Sales Owner.

```
Telecaller A (leave / overloaded) → Admin reassigns → Telecaller B
```

Every reassignment is written to the `Lead_Assignments` history table (who changed it, old value, new value, timestamp, optional reason) — this is required data, not just an audit-log text entry, so that metrics like "average time to reassignment" and "reassignment frequency per employee" can be queried directly.

---

## 20. Geo-Location

With permission, the system tracks employee location:
```
BDA Rahul  — Current Area: Gachibowli — Last Updated: 10:42 AM
BDA Priya  — Current Area: Kondapur   — Last Updated: 10:38 AM
```

For field BDAs: GPS location, check-in, check-out, timestamp, assigned location.

---

## 21. Kart Management

### 21.1 Kart fields
- Kart ID
- Kart name/number
- Current location
- Location type
- Assigned BDA (current)
- Deployment date
- Expected removal date
- Status: `Available · Assigned · Deployed · Maintenance · Inactive · Removed`

### 21.2 Kart Deployment History (added)

A kart's location and assigned BDA change over its lifetime (Section 6's own example implies this). The current-state fields above are not sufficient for historical performance analysis — a `Kart_Deployments` table is required, logging each location/BDA assignment period with start and end dates. Kart performance metrics (Section 22) should be computed per deployment period, not just against the kart's current location.

---

## 22. Kart → Lead Relationship

```
Kart → Location → BDA → Lead
```

Example:
```
Kart: TK-004        Generated Leads: 85
Location: Aparna Sarovar   Interested: 42
BDA: Rahul           Demos: 25
                     Conversions: 8
```

---

## 23. Attendance / HRMS

**Employees can:** check in, check out, apply leave, view attendance, view assigned tasks.

**Admin can view:** Present, Absent, Late, Leave, Field employees, Office employees.

---

## 24. Audit Log

Every important action is recorded and cannot be deleted by normal users — only viewed by Admin.

```
Lead #1025
Created:    BDA Rahul — 05 Sep, 10:30 AM
Assigned:   Telecaller Priya — 05 Sep, 10:31 AM
Status:     New → Interested — 05 Sep, 11:20 AM
Demo:       Scheduled for 06 Sep, 4 PM — 05 Sep, 11:30 AM
Demo:       Completed — 06 Sep, 4:45 PM
```

This is treated as a **Must Have for V1**, not a later addition — with three roles able to create and touch leads, the audit log is how Admin resolves ownership disputes and reassignment history from day one.

---

## 25. Performance Dashboards

### 25.1 BDA Performance
```
Leads Generated · Qualified Leads · Demos · Completed Demos
Follow-ups · Conversions · Revenue · Conversion Rate
```

### 25.2 Telecaller Performance
```
Leads Assigned · Calls Made · Customers Contacted · Interested Leads
Demos Scheduled · Demos Completed · Follow-ups Completed · Conversions Generated
```

### 25.3 Admin Dashboard — Overall Funnel
```
Total Leads → Contacted → Interested → Demo Scheduled →
Demo Completed → Quotation → Negotiation → Converted
```

### 25.4 Admin Dashboard — Today
```
New Leads · Calls Pending · Follow-ups Due · Demos Today
Overdue Activities · Conversions
```

---

## 26. Source Analytics

Drill-down path: **Source → Location → Kart → BDA → Leads → Conversion**

```
Gated Community
  Leads: 500  Interested: 230  Demos: 120  Conversions: 35  Revenue: ₹XX
     ↓
  Aparna Sarovar
     ↓
  Kart TK-004 → 85 Leads → 8 Conversions
```

---

## 27. Key CRM Metrics

| Metric | Formula |
|---|---|
| Lead Conversion Rate | Converted Leads ÷ Total Leads × 100 |
| Demo Conversion Rate | Converted Customers ÷ Completed Demos × 100 |
| Contact Rate | Contacted Leads ÷ Total Leads × 100 |
| Demo Booking Rate | Demos Scheduled ÷ Interested Leads × 100 |
| Source Conversion Rate | Conversions from Source ÷ Leads from Source × 100 |

---

## 28. Notifications

| Role | Notified on |
|---|---|
| **Admin** | New lead, unassigned lead, overdue follow-up, missed demo update, employee absence, low-performing source, conversion |
| **BDA** | New demo, demo reminder, lead assigned, follow-up reminder, customer rescheduled |
| **Telecaller** | New lead, follow-up reminder, demo reminder, missed demo status, overdue task |

---

## 29. Database Structure

```
USERS
 ├── Employees
 ├── Roles
 └── Permissions

HRMS
 ├── Attendance
 ├── Leave
 └── Employee Locations

KART MANAGEMENT
 ├── Karts
 ├── Locations
 └── Kart Deployments        ← history table, not current-state only

CRM
 ├── Customers
 ├── Leads
 ├── Lead Sources
 ├── Lead_Assignments        ← structured history: who/from/to/when/reason
 ├── Call Logs
 ├── Follow-ups
 ├── Demos
 ├── Opportunities
 ├── Quotations
 └── Conversions

SYSTEM
 ├── Notifications
 └── Audit_Logs
```

**Note on Leads vs Lead_Assignments:** the `Lead` table stores current-state columns (Lead Owner, Telecaller, Demo BDA, Sales Owner) for fast dashboard reads. `Lead_Assignments` is the append-only history of every change to those fields, used for audit, reassignment metrics, and timeline rendering. Both exist — one is not a replacement for the other.

---

## 30. Lead Table — Fields

```
Lead ID
Customer ID

Created By
Created By Role

Lead Owner
Telecaller
Demo BDA
Sales Owner

Source
Source Location
Kart ID

Lead Status
Lead Priority
Lost/Not-Interested Reason      ← new

Customer Requirement
Product Interest
Expected Purchase Date
Budget

Created Date
Updated Date
Next Follow-up Date

Conversion Status
Conversion Date
Order Value
```

---

## 31. V1 Development Priority

### Must Have
1. Login & role management
2. Employee management
3. Kart management (incl. deployment history)
4. Location management
5. Lead creation by Admin / BDA / Telecaller
6. **Duplicate-lead detection at creation (phone-number match)**
7. Lead source tracking
8. Lead assignment (round robin, with explicit BDA-assignment default for Telecaller-created leads)
9. Telecaller calling workflow
10. Follow-ups
11. Demo scheduling
12. Automatic Demo BDA assignment
13. Demo status
14. Overdue / missed-demo alerts
15. Lead timeline
16. **Audit log (Lead_Assignments + Audit_Logs tables)**
17. Admin dashboard
18. BDA dashboard
19. Telecaller dashboard
20. Basic attendance
21. Basic GPS/location
22. Reports & CSV export

### V2
- WhatsApp integration, automated WhatsApp messages
- Calling integration
- Advanced GPS tracking
- Quotations, payment tracking, revenue analytics
- Advanced HRMS, payroll, performance incentives
- Smarter assignment (area, workload, language, availability)
- AI lead scoring
- AI-generated follow-up messages

---

## 32. Summary of Changes from v1.1

- Added mandatory duplicate-detection step at lead creation (phone-number match against existing Customers).
- Fixed the undefined "appropriate BDA" assignment logic for Telecaller-created leads — now explicitly round robin in V1.
- Resolved Sales Owner vs Demo BDA ambiguity — Sales Owner defaults from Demo BDA at Demo Completed, overridable by Admin.
- Elevated Audit Log from implied to an explicit V1 Must Have.
- Clarified data model: `Lead` holds current state, `Lead_Assignments` holds structured reassignment history (not just a text audit trail).
- Added Kart Deployment History as its own table, since kart location/BDA assignment changes over time.
- Added a required reason code for Lost / Not Interested statuses, needed for source-quality analytics.
- Explicitly restricted BDA/Telecaller from reassigning ownership fields — Admin-only, with a request/notify flow for BDAs and Telecallers.
