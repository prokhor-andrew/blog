const fs = require("node:fs");
const path = require("node:path");

const site = {
  title: "Andrii Prokhorenko",
  description: "I have been developing different software since 2016. Throughout my career I have worked as a native Android developer, native iOS developer, Flutter developer, and now I am primarily focused on NodeJS backend development. I am passionate about different aspects of software engineering, especially Functional Programming.",
  author: "Andrii Prokhorenko",
  emailUser: "prokhor.andrew",
  emailDomain: "gmail.com",
  linkedin: "https://www.linkedin.com/in/andrii-prokhorenko-990b5114a/",
  github: "https://github.com/prokhor-andrew",
  postsPerPage: 5,
};

const rootDir = __dirname;
const contentDir = path.join(rootDir, "content", "posts");
const outputDir = rootDir;
const generatedPostsDir = path.join(outputDir, "posts");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseFrontMatter(source, filePath) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    throw new Error(`${filePath} is missing front matter.`);
  }

  const data = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    data[key] = value;
  }

  if (!data.title || !data.date) {
    throw new Error(`${filePath} needs title and date fields.`);
  }

  data.slug = data.slug || slugify(data.title);

  return {
    data,
    body: match[2].trim(),
  };
}

function renderInline(markdown) {
  const tokens = [];
  let html = escapeHtml(markdown);

  html = html.replace(/`([^`]+)`/g, (_, code) => {
    const token = `@@CODE${tokens.length}@@`;
    tokens.push(`<code>${code}</code>`);
    return token;
  });

  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]+|#[^)\s]+)\)/g, (_, text, href) => {
    return `<a href="${escapeAttribute(href)}">${text}</a>`;
  });

  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  tokens.forEach((token, index) => {
    html = html.replace(`@@CODE${index}@@`, token);
  });

  return html;
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let paragraph = [];
  let list = [];
  let inCodeBlock = false;
  let codeLines = [];

  function flushParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function flushList() {
    if (!list.length) return;
    html.push("<ul>");
    for (const item of list) {
      html.push(`<li>${renderInline(item)}</li>`);
    }
    html.push("</ul>");
    list = [];
  }

  function flushCodeBlock() {
    html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
    codeLines = [];
  }

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        flushParagraph();
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2].trim())}</h${level}>`);
      continue;
    }

    const listItem = line.match(/^[-*]\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      list.push(listItem[1].trim());
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  if (inCodeBlock) {
    flushCodeBlock();
  }

  flushParagraph();
  flushList();

  return html.join("\n");
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function readPosts() {
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  return fs.readdirSync(contentDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(contentDir, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { data, body } = parseFrontMatter(source, filePath);

      return {
        title: data.title,
        date: data.date,
        slug: data.slug,
        url: `/posts/${data.slug}/`,
        body,
        html: renderMarkdown(body),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

function layout({ title, description = site.description, showIntro = false, children }) {
  const pageTitle = title === site.title ? site.title : `${title} - ${site.title}`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeAttribute(description)}">
  <style>
    :root {
      color-scheme: light dark;
      --background: #ffffff;
      --text: #000000;
      --muted: #6a655d;
      --link: var(--text);
      --rule: #ddd6c8;
      --code: #f1eadc;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --background: #151513;
        --text: #ece6d8;
        --muted: #aaa293;
        --link: var(--text);
        --rule: #38342e;
        --code: #24211c;
      }
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background: var(--background);
      color: var(--text);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 18px;
      line-height: 1.65;
    }

    main {
      width: min(100% - 32px, 680px);
      margin: 48px auto 72px;
    }

    header {
      margin-bottom: 48px;
      border-bottom: 1px solid var(--rule);
      padding-bottom: 20px;
    }

    h1,
    h2,
    h3,
    h4 {
      line-height: 1.2;
      margin: 0 0 12px;
      font-weight: 700;
    }

    h1 {
      font-size: 34px;
    }

    h2 {
      margin-top: 44px;
      font-size: 24px;
    }

    h3 {
      margin-top: 32px;
      font-size: 21px;
    }

    p {
      margin: 0 0 20px;
    }

    a {
      color: var(--link);
      text-decoration-thickness: 1px;
      text-underline-offset: 3px;
    }

    nav {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 18px;
      margin-top: 18px;
      font-size: 16px;
    }

    ul {
      margin: 0 0 20px;
      padding-left: 24px;
    }

    li {
      margin: 10px 0;
    }

    time,
    .muted {
      color: var(--muted);
    }

    .intro {
      margin-top: 18px;
      color: var(--muted);
      font-size: 17px;
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
    }

    .post-list {
      list-style: none;
      padding: 0;
    }

    .contact-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    .contact-table th,
    .contact-table td {
      padding: 6px 0;
      text-align: left;
      vertical-align: middle;
    }

    .contact-table th {
      width: 112px;
      font-size: 15px;
      font-weight: 400;
      color: var(--muted);
      white-space: nowrap;
    }

    .contact-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .contact-link svg {
      width: 18px;
      height: 18px;
      flex: 0 0 auto;
      color: currentColor;
    }

    .more-link {
      display: inline-block;
      margin-top: 4px;
      font-size: 16px;
    }

    .post-list li {
      display: grid;
      grid-template-columns: 112px 1fr;
      gap: 14px;
      align-items: baseline;
      margin: 12px 0;
    }

    .post-list time {
      font-size: 15px;
      white-space: nowrap;
    }

    article {
      border-top: 1px solid var(--rule);
      padding-top: 36px;
    }

    pre,
    code {
      background: var(--code);
      border-radius: 4px;
    }

    code {
      padding: 1px 4px;
      font-size: 0.92em;
    }

    pre {
      overflow-x: auto;
      padding: 14px 16px;
    }

    pre code {
      padding: 0;
      background: transparent;
    }

    .pagination {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      border-top: 1px solid var(--rule);
      margin-top: 44px;
      padding-top: 20px;
    }

    footer {
      border-top: 1px solid var(--rule);
      margin-top: 56px;
      padding-top: 20px;
      font-size: 15px;
      color: var(--muted);
    }

    @media (max-width: 520px) {
      body {
        font-size: 17px;
      }

      main {
        margin-top: 28px;
      }

      h1 {
        font-size: 30px;
      }

      .post-list li {
        grid-template-columns: 1fr;
        gap: 0;
      }
    }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>${escapeHtml(site.title)}</h1>
      <nav aria-label="Primary navigation">
        <a href="/">Home</a>
        <a href="/posts/">Posts</a>
        <a href="/contacts/">Contacts</a>
      </nav>
      ${showIntro ? `<p class="intro">${escapeHtml(site.description)}</p>` : ""}
    </header>

${children}

    <footer>
      <p>&copy; 2026 ${escapeHtml(site.author)}.</p>
    </footer>
  </main>
</body>
</html>`;
}

function postList(posts) {
  if (!posts.length) {
    return "<p>No posts yet.</p>";
  }

  return `<ul class="post-list">
${posts.map((post) => `        <li>
          <time datetime="${escapeAttribute(post.date)}">${escapeHtml(formatDate(post.date))}</time>
          <a href="${escapeAttribute(post.url)}">${escapeHtml(post.title)}</a>
        </li>`).join("\n")}
      </ul>`;
}

function icon(name) {
  const icons = {
    email: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M4 6.5h16v11H4z"/>
      <path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="m4.5 7 7.5 6 7.5-6"/>
    </svg>`,
    linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="4" y="4" width="16" height="16" rx="1.8" fill="none" stroke="currentColor" stroke-width="1.8"/>
      <path fill="currentColor" d="M7.4 10h2.1v7H7.4zm1.1-3.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM11 10h2v1c.4-.7 1.2-1.2 2.3-1.2 1.8 0 3 1.2 3 3.5V17h-2.1v-3.5c0-1.1-.5-1.7-1.4-1.7s-1.6.6-1.6 1.8V17H11z"/>
    </svg>`,
    github: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M9 19.3c-4 .9-4-2-5.6-2.4M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.8-1.4 5.8-6.2 0-1.4-.5-2.5-1.3-3.4.1-.3.6-1.7-.1-3.4 0 0-1.1-.3-3.5 1.3A12 12 0 0 0 9 3.8C6.6 2.2 5.5 2.5 5.5 2.5c-.7 1.7-.2 3.1-.1 3.4-.8.9-1.3 2-1.3 3.4 0 4.8 3 5.9 5.8 6.2-.4.4-.6.9-.6 1.7V21"/>
    </svg>`,
  };

  return icons[name];
}

function contactTable() {
  return `<table class="contact-table">
        <tbody>
          <tr>
            <th scope="row">Email</th>
            <td><span class="contact-link">${icon("email")}${escapeHtml(site.emailUser)}[at]${escapeHtml(site.emailDomain.replace(".", "[dot]"))}</span></td>
          </tr>
          <tr>
            <th scope="row">LinkedIn</th>
            <td><a class="contact-link" href="${escapeAttribute(site.linkedin)}">${icon("linkedin")}andrii-prokhorenko</a></td>
          </tr>
          <tr>
            <th scope="row">GitHub</th>
            <td><a class="contact-link" href="${escapeAttribute(site.github)}">${icon("github")}prokhor-andrew</a></td>
          </tr>
        </tbody>
      </table>`;
}

function pagination({ page, totalPages }) {
  if (totalPages <= 1) return "";

  const previous = page === 2 ? "/posts/" : `/posts/page/${page - 1}/`;
  const next = `/posts/page/${page + 1}/`;

  return `      <nav class="pagination" aria-label="Pagination">
        ${page > 1 ? `<a href="${previous}">Newer posts</a>` : "<span></span>"}
        ${page < totalPages ? `<a href="${next}">Older posts</a>` : "<span></span>"}
      </nav>`;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, contents) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${contents}\n`);
}

function cleanGeneratedFiles() {
  fs.rmSync(path.join(outputDir, "index.html"), { force: true });
  fs.rmSync(path.join(outputDir, "contacts"), { recursive: true, force: true });
  fs.rmSync(generatedPostsDir, { recursive: true, force: true });
}

function buildIndex(posts) {
  const latestPosts = posts.slice(0, site.postsPerPage);
  const html = layout({
    title: site.title,
    showIntro: true,
    children: `    <section aria-labelledby="posts">
      <h2 id="posts">Last Posts</h2>
      ${postList(latestPosts)}
      <a class="more-link" href="/posts/">more</a>
    </section>

    <section aria-labelledby="contacts">
      <h2 id="contacts">Contacts</h2>
      ${contactTable()}
    </section>`,
  });

  writeFile(path.join(outputDir, "index.html"), html);
}

function buildContactsPage() {
  const html = layout({
    title: "Contacts",
    children: `    <section aria-labelledby="contacts">
      <h2 id="contacts">Contacts</h2>
      ${contactTable()}
    </section>`,
  });

  writeFile(path.join(outputDir, "contacts", "index.html"), html);
}

function buildPostPages(posts) {
  for (const post of posts) {
    const html = layout({
      title: post.title,
      description: post.body.split("\n").find(Boolean) || site.description,
      children: `    <article>
      <h2>${escapeHtml(post.title)}</h2>
      <p class="muted"><time datetime="${escapeAttribute(post.date)}">${escapeHtml(formatDate(post.date))}</time></p>
${post.html}
    </article>`,
    });

    writeFile(path.join(generatedPostsDir, post.slug, "index.html"), html);
  }
}

function buildArchive(posts) {
  const totalPages = Math.max(1, Math.ceil(posts.length / site.postsPerPage));

  for (let page = 1; page <= totalPages; page += 1) {
    const start = (page - 1) * site.postsPerPage;
    const pagePosts = posts.slice(start, start + site.postsPerPage);
    const pageTitle = page === 1 ? "Posts" : `Posts, page ${page}`;
    const html = layout({
      title: pageTitle,
      children: `    <section aria-labelledby="posts">
      <h2 id="posts">${escapeHtml(pageTitle)}</h2>
      ${postList(pagePosts)}
${pagination({ page, totalPages })}
    </section>`,
    });

    const outputPath = page === 1
      ? path.join(generatedPostsDir, "index.html")
      : path.join(generatedPostsDir, "page", String(page), "index.html");

    writeFile(outputPath, html);
  }
}

function build() {
  const posts = readPosts();

  cleanGeneratedFiles();

  buildIndex(posts);
  buildPostPages(posts);
  buildArchive(posts);
  buildContactsPage();

  console.log(`Built ${posts.length} posts.`);
}

build();
