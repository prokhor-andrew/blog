---
title: Vim Part 3 - Vertical Navigation
date: 2026-05-16
slug: vim-part-3---vertical-navigation
---

Introduction

## Top and bottom jumps 

Let's start with something easy. `gg` will take you to the very first line. `G` will take you to the last one. 


## Jumping to the particular line

To jump to a concrete line, type `:<line number>` and it will take your cursor there.


## Jumping between brackets 

To jump between brackets, make sure to move your cursor to the bracket, then press `%`.  
If the cursor was on the opening bracket, it will take you to the closing one.
If it was on the closing bracket, it will take you to the opening bracket. 


## Search mode

Search mode is your bread and butter. It is the fastest way to reach to a particular word around the file without any mental overhead(with the only exception of EasyMotions).
To do that, start by entering search mode with `/`, then proceed to type your query. 
With a proper configuration, the editor will highlight all the words that match your searched expression.
Once you are done typing, click `Enter`. This will take you to the closest matching value.
From there, you can move around results via `n` or `N`. `n` will take you to the next result, while `N` will do the opposite.

There is another way to enter search mode - `?`. This will start the search in opposite direction.
When `n` is clicked in this mode, it will move backwards and upwards, while `N` is moving to the right and down


## Conclusion

rtest



