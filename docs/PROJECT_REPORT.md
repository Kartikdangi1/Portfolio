# A Dependency-Free Bilingual Portfolio Site

A portfolio site built to present engineering work invites a particular kind of scrutiny: a visitor who understands the underlying projects will also notice if the site presenting them is built carelessly. This repository is a bilingual, English and German, portfolio site built entirely from vanilla HTML, CSS and JavaScript, with no build step and no external framework, deployed to GitHub Pages through a continuous-integration workflow and indexed by search engines through a submitted sitemap, a `robots.txt` file and a verified ownership record, evidence that this is a live, discoverable site rather than a local demonstration never actually deployed.

## Implementation

Eight project cards, covering a Bachelor's thesis, a Master's-level research project still in progress, a university cobot project, a human-in-the-loop reinforcement-learning platform, and several smaller pieces of work, are rendered from a data file rather than written directly into the page markup, alongside a separate file holding every English and German string and a third holding site-wide configuration; a project's card content is therefore a data change, editing one file, rather than an edit to the page structure itself. A typewriter effect in the page's header cycles through thirty short, domain-specific phrases describing the work the page presents, and a scroll-linked graphic uses the browser's own animation-frame timer together with two sine waves at frequencies chosen to never repeat in phase with each other, layered on top of the element's scroll-following position, so the resulting motion reads as a small, continuous hover rather than as a graphic mechanically tracking the scrollbar's position.

Accessibility is handled explicitly rather than left to default browser behaviour: interactive project cards respond to the keyboard as well as to a pointer, a video modal stores which element held focus before it opened and restores focus to that same element on close, and appropriate labelling attributes are present throughout rather than added only where a visible accessibility audit happened to flag their absence. A resume-download button is shown only once the underlying file actually exists, checked through a lightweight request for the file's headers alone rather than its full content, so the button's visibility reflects the file's real presence rather than an assumption that it will eventually be there.

## Validation

The site's live deployment, its passing search-engine verification, and its generated sitemap are themselves evidence the build and deployment pipeline functions correctly end to end. No automated test suite covers the page's own JavaScript; correctness has been checked by using the deployed site directly across the light and dark themes and the two supported languages.

## Limitations

Being entirely dependency-free by design means any interactive behaviour beyond what plain JavaScript and CSS provide directly would need to be implemented from scratch rather than pulled in from an existing library, a trade already made deliberately in favour of a smaller, simpler deployment rather than a broader feature set.

## Further Work

Extending the existing card-and-data-file structure to a ninth project, or a tenth, requires no change to the page's own logic, only a new entry in the existing data file, which is the direct benefit of having kept content and structure separate from the outset.
