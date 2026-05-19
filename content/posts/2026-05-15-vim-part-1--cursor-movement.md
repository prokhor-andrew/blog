---
title: Vim Part 1 - Cursor Movement
date: 2026-05-15
slug: vim-part-1--cursor-movement
---


In this little post, I will focus on Vim modes, basic navigation, and the commands that enable character modifications. 


## Main modes   


Vim is a mode based editor. It has many different modes, but the two main ones are:
- *Normal* mode
- *Insert* mode

We will get to the other modes later.

"Mode based" means one key may do different things depending on the state of the editor.      

In Normal mode, `x` when clicked will remove the character under the cursor.

In Insert mode, the same key will print a letter 'x' just like in any text editor.


## Switching modes

Normal mode is usually the starting point of Vim navigation. 

To enter Insert mode, press `i`. This will move the cursor to the left of the selected character. 

To get back to Normal mode, press `Esc`. It is a bit akward to reach it with the left pinky. That is why another key is usually remapped to it.
I use `Caps Lock` as my `Esc` button.

To enter Insert mode but with the cursor to the right, press `a`. 


## Weird cursor

In Vim, the cursor does not usually lie between characters like in any common editor. At least not in Normal mode. 

The reason for that is we usually execute commands on characters, and not type text. 

As soon as we enter Insert mode, the cursor switches to the familiar one, indicating where the character will be inserted.

I have to mention, that it is not always the case, and it depends on the configuration of the editor.


## How to exit Vim

I was showing this blog post to my girlfriend, while she was trying the motions herself.
When she was done, she asked the reasonable question:"So, how do I close this?". 
Classic first Vim experience. 

Jokes aside, to exit Vim, type `:` followed by `wq`. This will save your progress and close the editor. 


## Cursor movements

In Normal mode, clicking `h` moves the cursor one character to the left.

Clicking `j` moves the cursor one character to the bottom.

Clicking `k` does the same but to the top.

And `l` moves it to the right.


## Undoing changes

Before we start deleting stuff, let's learn how to undo stuff.

To undo the applied change, press `u`.  

To redo it, hold `Ctrl` and press `r`. 


## Deleting a character

As I have mentioned before, `x` removes the character under the cursor. 


## Replacing a character

To replace a character under the cursor, press `r` and the character you want to replace the original one with. 


## Toggling case 

One final character modification that I use all the time is `~` which toggles the case of the selected character.


## Conclusion 

These are the basics. They must be mastered. You don't have to spend hundreds of hours practicing. 

Just be comfortable with running them slowly at first, and then faster.  

Eventually, they will be used all the time when learning new skills.
