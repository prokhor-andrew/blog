# Blog

A small static blog generated from Markdown.

## Source vs generated files

Edit source files:

- `content/posts/*.md` for blog posts
- `build.js` for layout, styles, navigation, homepage text, and pagination settings

Do not edit generated files directly:

- `index.html`
- `posts/index.html`
- `posts/<slug>/index.html`
- `posts/page/<number>/index.html`
- `contacts/index.html`

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

- `index.html`
- `posts/index.html`
- `posts/<slug>/index.html`
- `posts/page/<number>/index.html` when there are more than 5 posts
- `contacts/index.html`

The published site is still plain static HTML.

## Deploy

For GitHub Pages, use:

```text
Settings -> Pages -> Deploy from a branch -> main -> /root
```

Run `npm run build`, commit the generated files, and push.
