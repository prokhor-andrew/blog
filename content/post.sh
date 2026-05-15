#!/opt/homebrew/bin/bash

title=$1

if [[ -z "$title" ]]; then
    echo 'Usage: post.sh "Post Title"'
    exit 1
fi

date=$(date +%Y-%m-%d)
slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd 'a-z0-9-')
filename="posts/${date}-${slug}.md"

if [[ -e "$filename" ]]; then
    echo "File already exists: $filename"
    exit 1
fi

cat > "$filename" <<EOF
---
title: $title
date: $date
slug: $slug
---

EOF

echo "Created: $filename"
