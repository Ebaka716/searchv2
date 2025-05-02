# Active Context

The app now features a dedicated `/assistant` page for the Theta Assistant UI, which always starts with a fresh state. The home page (`/`) is now blank, serving as a landing or reset view. Navigation has been updated: clicking the 'Product company' text in the header routes to the blank home, while '+ New Search' in the sidebar routes to `/assistant` and resets all search histories. This ensures clear separation between starting a new search and viewing results.

Recent changes also include robust key generation for results history, eliminating duplicate key errors, improved state management for navigation between views, and the removal of the legacy DividendsCard component (now fully replaced by the shadcn/ui version). The legacy StockChartCard component from the results directory was also removed, consolidating chart usage under the charts directory. Unused ResultSectionHeader and DefinitionSection components were also deleted for further codebase clarity.

Next steps: further polish the assistant UI, expand documentation, and continue improving navigation and state handling patterns.

The sparkle.png icon is now used for results headers and the header input, replacing the Atom icon for a more visually engaging effect. All sparkle icons now use Next.js <Image> for optimization. Memory bank documentation is being actively maintained to reflect these and other UI/UX improvements. Focus remains on UI polish, visual clarity, and robust navigation/state management. 