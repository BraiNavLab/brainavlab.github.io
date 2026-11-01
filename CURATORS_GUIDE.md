# BraiNavLab website: guide for the curators

How to update the website of the BraiNavLab research group (University of Verona), published at <https://brainavlab.github.io/>.

It is a [Jekyll](https://jekyllrb.com/) site: content lives in plain text files, and GitHub Pages rebuilds the site at every push on `main`.

## Preview on your computer

You need Ruby. The first time, install the tools with `gem install jekyll bundler`, then run:

```bash
./build_site.sh
```

and open <http://127.0.0.1:4000>. The page reloads by itself when you save a file. Stop it with `Ctrl+C`.

## Where things are

| What | Where |
|---|---|
| Menu, social links, number of news on the home page | `_config.yml` |
| Home page | `index.html` |
| Other pages | `pages/` |
| News, publications, events | `_news/` |
| Research topics | `_projects/` |
| People | `_data/people.yml` |
| Funded projects | `_data/funded_projects.yml` |
| Partner logos on the home page | `_data/partners.yml` and `img/partners/` |
| Styles | `css/group.scss` |
| Scripts | `js/site.js` |
| Optional restyling | `css/restyle.scss`, `js/restyle.js`, `_includes/home-hero.html`, `fonts/` (`restyle: false` in `_config.yml` turns it off; to remove it for good, set that first, then delete these files) |
| Working files that are not published | `img/_sources/`, `back_up_stuff/` |

Folders starting with `_` are not published as they are: Jekyll uses them to build the pages.

## Common tasks

### Add a news item

Create a file in `_news/`, for example `2026_11_20_news.md`:

```yaml
---
title: "Title of the news"
date: 2026-11-20
type: "News"          # Publication | News | Event (Event = initiatives organized by the lab)
image: /img/news/event/my_image.jpg
image_fit: contain    # optional: for logos and banners, shows the image whole instead of cropping it
article_url: "https://..."   # optional, use only one: paper_url (Read Paper), article_url (Read Article), event_url (See the Event)
video: /img/news/event/my_video.mp4   # optional: adds a Watch Video button
highlight: true       # optional: shows it in the Highlights of the home page instead of the carousel
---

Text of the news. The first paragraph is the one shown on the card.
```

It appears by itself on the News & Events page and, among the latest 8, in the home page carousel. For publications there are ready-made images: `/img/news/publication/publication_standard_ieee.jpg` and the others in that folder.

### Add or move a person

Add a block to `_data/people.yml`, copying an existing one. `status_group` decides the section of the People page:

- `active`: lab members;
- `collab`: collaborators, external to both the Department and the University;
- `alumni`: former members of the lab.

### Add a research topic

Add a file to `_projects/`, copying an existing one. The `order` field sets its position on the page (1 comes first), and `people` lists the keys used in `_data/people.yml`. The number in the file name is only part of the URL.

### Add a funded project

Add a block to `_data/funded_projects.yml`. When a project ends, change its `status` to `"Closed"`.

### Add a partner logo

Put the logo in `img/partners/` (SVG if possible) and add a block to `_data/partners.yml`. The world map on the home page is `img/home_img/world_collaborations.png`; its editable sources are in `img/_sources/map/`.

## Images

Keep images light, because every visitor downloads them. Before adding one, resize it to at most 1200 px wide (640 px for portraits). On a Mac:

```bash
sips -Z 1200 my_image.jpg
```

Use JPG for photos, and PNG or SVG only for logos that need a transparent background.
