# Active Context

The app now features a dedicated `/assistant` page for the Theta Assistant UI, which always starts with a fresh state. The home page (`/`) is now blank, serving as a landing or reset view. Navigation has been updated: clicking the 'Product company' text in the header routes to the blank home, while '+ New Search' in the sidebar routes to `/assistant` and resets all search histories. This ensures clear separation between starting a new search and viewing results.

Recent changes also include robust key generation for results history, eliminating duplicate key errors, and improved state management for navigation between views.

Next steps: further polish the assistant UI, expand documentation, and continue improving navigation and state handling patterns. 