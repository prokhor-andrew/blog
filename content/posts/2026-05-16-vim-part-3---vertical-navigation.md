---
title: Vim Part 3 - Vertical Navigation
date: 2026-05-16
slug: vim-part-3---vertical-navigation
---

Vertical navigation is pretty much the a navigation around the file.  


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
Once you are done typing, click `Enter`. This will either take you to the closest matching value on the same line your cursor is on, or it will take you to the first value in the file.
From there, you can move around results via `n` or `N`. `n` will take you to the next result, while `N` will do the opposite.

There is another way to enter search mode - `?`. This will start the search in opposite direction.
In this mode, `n` moves left and up, while `N` moves right and down.


## Conclusion

As I am trying to keep these simple and progressively make them harder, some of the options above are not the best ways to navigate around.
Right now, the focus is on presenting the basics. Later, I will have a compliation of drills with minimal set of the most useful motions and how to use them.   

There is one thing I briefly mentioned in this blog post, and that is EasyMotions. It is supposed to be a plugin that allows an even easier navigation around the editor.      
I haven't tried it yet, but I am planning to. As soon as I get my hands on it, I will make sure to carefully analyze my experience with a detailed summary here.

