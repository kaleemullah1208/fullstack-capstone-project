# User Story: Browse Available Gifts

## User Story Template
**As a** registered community member,  
**I need** to view a catalog of all available donated gifts on the main page,  
**so that** I can easily find and request items that I need.

## Details and Assumptions
- The user has navigated to the GiftLink application in the browser.
- The backend API service (`/api/gifts`) and MongoDB database (`giftsdb`) are running and populated with gift items.
- Each gift card displays the gift title, image, condition badge (New, Like New, Older), date added, and a brief description preview.
- Clicking the "View Details" button navigates the user to the dedicated product details page (`/app/product/:id`).

## Acceptance Criteria
### Scenario 1: Successfully loading and viewing gift cards
**Given** the user is on the GiftLink gifts catalog page (`/app`)  
**When** the page finishes loading data from the backend  
**Then** a responsive grid of gift cards should be displayed  
**And** each card should show the gift name, image, condition badge, date added, and a "View Details" button.

### Scenario 2: Navigating to gift details
**Given** the user is viewing the available gifts grid  
**When** the user clicks on the "View Details" button for an item  
**Then** the application navigates to `/app/product/:id` showing the full description, comments, and sentiment analysis.
