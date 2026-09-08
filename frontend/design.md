
Genesis — Design System
Technology Stack
Next.js

TypeScript

TailwindCSS

shadcn/ui

1. Overview
Genesis is a minimal, fast, and responsive task manager built with Next.js and shadcn/ui. The design emphasizes clarity, consistency, and low cognitive load. Users can create, edit, organize, and track tasks across devices. Every visual rule in this document ensures a unified, predictable experience across all screens.

2. Responsive Behaviour
Mobile‑first layout

Fully responsive across mobile, tablet, and desktop

No horizontal scrolling in any view

3. Color System
Primary — #6366F1  
CTAs, active states, links, focus rings

Primary Hover — #4F46E5

Secondary — #20970B  
Reserved for DESIGN.md branding only

Neutral — #9C9C9C  
Muted text, placeholders, timestamps

Background — #FAFAFA

Surface — #FFFFFF

Text Primary — #0A0A0A

Text Secondary — #6B6B6B

Border — #E8E8EC

Success — #10B981

Warning — #F59E0B

Error — #EF4444

4. Typography
Display Font: General Sans (Fontshare)

Body Font: DM Sans (Google Fonts)

Code Font: JetBrains Mono (Google Fonts)

Type Scale
Display — 72px

Headline — 60px

Section Heading — 32px

Subhead — 24px

Body — 15px

Small — 13px

Caption — 12px

Overline — 11px uppercase

Line Heights
Display: 1.05

Headline: 1.1

Body: 1.5

Small/Caption: 1.4

5. Elevation
Minimal shadows

Cards: 1px border, hover shadow 0 8px 30px rgba(0,0,0,0.08)

Buttons: tinted glow on hover 0 4px 12px rgba(99,102,241,0.35)

Navigation: uses backdrop‑blur instead of shadow

Dropdowns/Popovers: shadow-lg

Focus ring: 0 0 0 3px rgba(99,102,241,0.12)

6. Components
Buttons
Primary: indigo fill, white text, 6px radius

Secondary: transparent bg, 1px border

Ghost: text‑only

Destructive: red text + red border

Hover: shift up 1px

Sizes: 32px / 38px / 44px

Cards
White surface

1px border

12px radius

Hover lift: 2px

Transition: 200ms

Inputs
1px border

6px radius

Padding: 10px × 14px

Placeholder: muted

Focus: indigo border + ring

Error: red border

Chips
Rounded‑full

Gray background

Active: indigo bg + white text

Status chips use semantic colors

Lists
Stacked rows

1px dividers

Padding: 12px × 16px

Hover: subtle bg

Checkboxes
20px

Rounded‑full

Gray unchecked

Indigo checked

Tooltips
Native browser tooltips only

Navigation
Sticky top

Backdrop‑blur

Height: 56px

1px bottom border

Desktop: centered links

Mobile: hamburger drawer

Search
Trigger: ⌘K

Rounded‑xl bar

Icon + shortcut badge

7. Component Rules
Use shadcn/ui components for all primitives

Do not create custom buttons

Do not create custom inputs

Use Card, Dialog, Sheet from shadcn/ui

8. Spacing
Base unit: 4px

Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

Component padding:

Small: 8×12

Medium: 10×16

Large: 12×24

Section spacing:

Mobile: 32px

Tablet: 48px

Desktop: 64px

Container max width: 1280px

Card grid gap: 20–24px

9. Border Radius
4px — tags, chips, badges

6px — buttons, inputs

8px — dropdowns, panels

12px — cards, search bar

9999px — avatars, status dots

10. Do’s and Don’ts
Do
Use indigo only for interactive elements

Maintain the 4px spacing grid

Use General Sans for headings

Use DM Sans for body

Keep card radius 12px, button/input radius 6px

Ensure contrast in light/dark modes

Don’t
Use pure black or pure white for text

Add decorative gradients or illustrations

Use shadows on static elements

Use more than two font weights per screen

Place more than one primary button in a section

11. Task Grid Layout
Tailwind pattern:
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

Rules
Mobile: 1 task per row

XL: 4 tasks per row

Use gap-4 or gap-6

Avoid custom breakpoints

Cards must have equal height (grid-auto-rows: 1fr)

No horizontal scrolling

Prioritize readability over density

12. Sidebar Layout Design Rule (NEW)
A sidebar is used for navigation and task grouping. It must follow these rules:
sidebar must use shadcn ui sidebar component
Sidebar Structure
Width: 240px desktop, 200px tablet, full‑width drawer on mobile

Background: light gray #F3F3F3

Border: 1px solid #E8E8EC

Padding: 24px vertical, 20px horizontal

Typography:

Section titles: 14px, medium, Text Secondary

Links: 15px, medium, Text Primary

Sidebar Elevation
No shadow

Uses border + subtle contrast instead of elevation

Mobile drawer uses backdrop‑blur

Sidebar Interaction
Active link:

Background: #EDEDED

Text: Primary

Border-left: 3px solid Primary

Hover:

Background: #F7F7F7

Sidebar Spacing
16px gap between items

32px gap between sections

Icons: 20px size, muted color

Sidebar Behavior
Sticky on desktop

Collapsible on tablet

