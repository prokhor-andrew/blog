---
title: Vim Part 3 - Vertical Navigation
date: 2026-05-16
slug: vim-part-3---vertical-navigation
---


## Top and bottom jumps 

Let's start with something easy. `gg` will take you to the very first line. `G` will take you to the last one. 


## Jumping to the particular line

To jump to a concrete line, type `:<line number>` and it will take your cursor there.

There is a better way to do this though. Start typing a number of the line where you want to land your cursor, and then type `G`. 


## Jumping between brackets 

To jump between brackets, make sure to move your cursor to the bracket, then press `%`.  
If the cursor was on the opening bracket, it will take you to the closing one.
If it was on the closing bracket, it will take you to the opening bracket. 


## Search mode

Search mode is your bread and butter. It is the fastest way to reach a particular word around the file without much mental overhead, with the only exception being EasyMotion.

To do that, enter Search mode with `/`, then type your query. With a proper configuration, the editor will highlight all words that match your search expression. Once you are done typing, press `Enter`. This will take you to the next matching value after your cursor. If search wrapping is enabled, Vim will continue from the top of the file after reaching the end. From there, you can move around the results with `n` and `N`. `n` takes you to the next result, while `N` goes in the opposite direction.

There is another way to enter search mode: `?`. This starts the search in the opposite direction. In this mode, `n` moves backward through the file, while `N` moves forward.


## Conclusion

I am trying to keep these posts simple and progressively make them harder, some of the options above are not the best ways to navigate around.
Right now, the focus is on presenting the basics. Later, I will have a compilation of drills with a minimal set of the most useful motions and how to use them.   

There is one thing I briefly mentioned in this blog post but didn't care to elaborate, and that is EasyMotions. It is supposed to be a plugin that enables to do an even easier navigation around the editor.      
I haven't tried it yet, but I am planning to. As soon as I get my hands on it, I will make sure to carefully summarise my experience here.

