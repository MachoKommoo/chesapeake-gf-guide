# 757 Safe Eats: Chesapeake - Project Summary

## Overview
A gluten-free restaurant guide for Chesapeake, Virginia and the 757 area code. Personal reviews and safety ratings for gluten-sensitive diners.

## Tech Stack
- **Framework**: Next.js 16.2.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Hosting**: Vercel (free tier)
- **Deployment**: Git-based push to `main` branch

## Key Features

### Homepage (`/`)
- Search bar for restaurant names
- Filter buttons: GF menu, Celiac-safe, Dedicated GF fryer
- Cuisine type filters: American, Burgers, Pizza, Asian, BBQ, Mexican, Chicken
- Restaurant grid with objective safety scores (0-4)
- Featured restaurant of the week
- About section and footer

### Restaurant Detail Pages (`/restaurant/[slug]`)
- Full restaurant information
- Photo carousel with thumbnails
- Objective safety score breakdown
- GF highlights, safety notes, address, price range
- Related restaurants section

### Data Source
- Single JSON file: `src/data/restaurants.json`
- 10 restaurants with complete GF information
- Objective safety scoring based on verifiable facts

## Objective Safety Score (0-4)
Score calculated from verifiable facts:
- +1: GF Menu available (`gfFriendly`)
- +1: Dedicated GF fryer (`dedicatedFryer`)
- +1: Celiac-safe facility (`celiacSafe`)
- +1: Knowledgeable staff (`serverKnowledge`)

## Restaurants (10 total)
1. The Cheesecake Factory - American (Score: 2/4)
2. P.F. Chang's - Asian (Score: 3/4)
3. The Capital Grille - Steakhouse (Score: 2/4)
4. Neat Bird Chicken & Whiskey - Chicken (Score: 4/4) - **Featured**
5. Studly Brewing Company - Brewery & Pizza (Score: 2/4)
6. Great Pizza Co. - Pizza (Score: 2/4)
7. Taqueria La Patrona - Mexican (Score: 2/4)
8. Red Robin Gourmet Burgers - Burgers (Score: 3/4)
9. Metro Diner - Diner & Breakfast (Score: 2/4)
10. Mission BBQ - BBQ (Score: 2/4)

## Current URL
https://chesapeake-gf-guide-ks55.vercel.app

## Files Modified
- `src/app/page.tsx` - Homepage with filters and restaurant grid
- `src/app/layout.tsx` - Root layout with navigation
- `src/app/restaurant/[slug]/page.tsx` - Restaurant detail pages
- `src/app/thanks/page.tsx` - Thank you page
- `src/data/restaurants.json` - Restaurant data
- `src/data/restaurants.ts` - TypeScript types
- `src/components/PhotoCarousel.tsx` - Photo gallery component

## Working Principles (CLAUDE.md)
1. Think before coding - State assumptions, ask when unsure
2. Simplicity first - Minimal code, no unnecessary abstractions
3. Surgical changes - Only touch what's needed
4. Goal-driven execution - Define success criteria before coding

## Test Group Checklist
- Search functionality
- Filter buttons (GF menu, Celiac-safe, Dedicated fryer)
- Cuisine type filters
- Restaurant card navigation
- Detail page safety scores
- Photo carousel
- Responsive design
- About section

## Deployment
Push to `main` branch triggers automatic Vercel deployment.
