---
title: Vim Part 5 - Scrolling
date: 2026-05-17
slug: vim-part-5---scrolling
---


Vertical navigation exists when you need to move your cursor to 
a line or a character.
Sometimes there is a need in quickly scanning the text with your eyes from the top to the bottom without the cursor being involved.


## Scrolling half a screen

To scroll up half a screen, hold `Ctrl` and press `u`. 

To do the same but down, hold `Ctrl` and press `d`.

Should be pretty intuitive!


## Scrolling one full screen

To scroll up full screen, hold `Ctrl` and press `b`.

To scroll down full screen, hold `Ctrl` and press `f`.


## Repositioning view port around the cursor 

There are three commands in Vim that move the cursor around the viewport. 

- `H` moves the cursor to the first visible line. 
- `M` moves the cursor to the central visible line. 
- `L` moves the cursor to the last visible line. 

Combined with `zt`, `zz`, and `zb` we can even get something close to a scrolling behavior.

- `zt` takes the current line and makes it the first visible one.
- `zz` takes the current line and makes it the central visible one.
- `zb` takes the current line and makes it the last visible on.


## Animation issue


By default, there is no scrolling animation in Vim. But there are plugins that allow you to do that. 

For vanilla Vim, sexy_scroller.vim should suffice. I have never used it, so tread with caution.

For Neovim I use neoscroll.nvim plugin. 

I would not focus on these until you actively start using Vim without issues. I haven't talked about how to configure plugins yet, and it can quickly become overwhelming.   

## Conclusion

At first I treated scrolling as something not that important. After a while I realized, that the majority of my time is spent looking through hundreds lines of code, and there was no sane way of moving around vertically without pain. 

Also, I do strongly recommend to install a plugin for a smooth scroll behavior. Our eyes are very good at tracking objects moving in space. But take those objects, teleport them, and suddenly something feels off. 

Whenever we clearly see the destination we need to land on, we don't care about animation. You lock your eyes on it, hit the navigation shorcut and you are there.

But whenever we browse with our eyes, it is important to avoid screen jumps, as they increase mental overhead.
