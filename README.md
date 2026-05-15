# Blog

A small static blog generated from Markdown.

## Source vs generated files

Edit source files:

- `content/posts/*.md` for blog posts
- `build.js` for layout, styles, navigation, homepage text, and pagination settings

Do not edit generated files directly:

- `_site/index.html`
- `_site/posts/index.html`
- `_site/posts/<slug>/index.html`
- `_site/posts/page/<number>/index.html`

These files are rewritten every time you run `npm run build`.

## Write a post

Create a Markdown file in `content/posts`:

```md
---
title: My Post Title
date: 2026-05-15
slug: my-post-title
---

Post content goes here.
```

The generated URL will be:

```text
/posts/my-post-title/
```

## Build

```sh
npm run build
```

The build creates:

- `_site/index.html`
- `_site/posts/index.html`
- `_site/posts/<slug>/index.html`
- `_site/posts/page/<number>/index.html` when there are more than 10 posts

The published site is still plain static HTML.
