---
title: Vim Part 4 - More of Insert mode
date: 2026-05-17
slug: vim-part-4---more-of-insert-mode
---

In this post I will try to introduce four more ways to enter Insert mode that will make your life easier.  
In addition to entering Insert mode, they do it with a motion.


## Jump to the end of a line

Imagine you are stuck somewhere in the middle of a line and you want to jump to the end and continue typing. 
You could press `$` followed by `a` and that would be totally fine. 
In fact, if you feel like that is easier for you, do not even bother trying to change that.

But with `A` you can achieve the same result with only one click. Not only that, but reaching `$` may seem akward to some of you. 

I would not say that it is a big optimization.  
Nevertheless, almost every time after jumping to the end of the line I start typing. 
Because of that, I absute the crap out of `A` all the time.


## Jump to the beginning of a line

Just like you can jump straight to the end of a line, you can jump to the beginning by pressing `I`. 


## Delete the line      

Just like you can delete a character under the cursor and enter Insert mode, you can delete the whole line with `S` and enter Insert mode. 


## Jump to a new line 

This command is, in my opinion, the MVP of Vim. I use it more than any other command from my arsenal. 

In order to type this particular line I used it twice :)

The command is `o`. It creates a new line below the line where the cursor is, moves the cursor there, and enters Insert mode.


## Move the current line and create a new one 


Another beautiful command that achives almost the same as `o` is ... `O`. `O` moves the current line lower by 1 row, creates a new line in place of it, and enters Insert mode. 
This is an amazing command if you need to squeeze something in between the lines.  
In coding, I use it all the time after creating if-then statement like this:


```typescript
if (true) {
} // cursor is here
```

Then I press `O` and it becomes


```typescript
if (true) {
    // cursor is here
} 
```

This can be applied to creating functions, classes, and anything else with brackets or scopes.


## Conclusion

Whenever you need to use `0` or `$`, stop yourself for a second, and think if `I` or `A` could be used instead.  
Thinking like this is not what you want to do during coding. But I am encouraging you to experiment and see, if it works for you or not. 

