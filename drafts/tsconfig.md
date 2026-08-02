## TSConfig 


- To specify which sources to work with, use `files` or `include`. Both accept an array object. `include` works with globs.
- To specify a glob that recursively works with a particular file type, use: src/**/*.ts
- `allowUnreachableCode` - fail if there is unreachable 
- `allowUnusedLabels` - fail if label is unused
- `alwaysStrict` - forces usage of strict javascript mode, which throws errors in a lot of cases where 'sloppy' mode silently ignores them.
