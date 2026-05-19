---
title: Vim Part 2 - Horizontal Navigation
date: 2026-05-16
slug: vim-part-2---horizontal-navigation
---

In this post I will add more navigation commands. 
After trying first four basic movements, you probably realized that it is tedious to move around using the cursor.
In this post, as well as the future ones, we will be learning more efficient ways of moving around Vim.


## Jumping between words

To jump between words, there are four commands to use. They are: `e`, `b`, `w`, and `ge`.

- `e` - jumps to the *last* letter of the word *under the cursor*. If the letter under the cursor is already the last one, it will jump to the *last* letter of the *next* word.  
This is the way to jump forward between words staying on the last letter.

![example of e operator](../images/vim-part-2-img-1.png)

- `ge` - Jumps to the *last* letter of the *previous* word. A way to jump backwards staying on the last letter.  

![example of ge operator](../images/vim-part-2-img-4.png)

- `w` - jumps to the *first* letter of the *next* word. A way to jump forward staying on the first letter. 

![example of w operator](../images/vim-part-2-img-3.png)

- `b` - jumps to the *first* letter of the current word *under the cursor*. If the letter under the cursor is already the first one, it will jump to the *first* letter of the *previous* word. A way to jump backwards staying on the first letter. 

![example of b operator](../images/vim-part-2-img-2.png)


I know that a lot of people use `w` and `b` to move between words. I prefer `e` and `b` as they seem to be the opposites of each other.
If used in the middle of a word, they allow you to jump from the first character to the last one. It is comfortable, if you combine it with `i` to insert something before the word, or `a` to append something after it.


## Jumping within a line

This one is simple. To jump to the beginning of the line use `0`. To jump to the end of it use `$`. I use these two all the time, they are surely worth getting comfortable with.

Sometimes you see a character you want to reach. To jump to it, you may click `f` following with the target character. This will move the cursor to the first occurance within the line. If after the first jump you realize that you need to go further to the right, you press `;`. This will move the cursor to the next occurance. Repeat the motion, until you reach your destination.  

In case you jumped over the needed character, you can press `,` which will take you back to the previous occurance.  

This method is a better way of reaching a word/letter/character within one line, as you don't have to click as much to reach the word.


Other operators worth mentioning:    
- `F` - acts as `f`, but jumps backwards.
- `t` - acts as `f`, but with every jump, it lands not on the target letter, but on the last letter before it.  
- `T` - acts as `t`, but jumps backwards.


## Conclusion

I wanted to add more commands and operators, but the amount of information above should be enough to leave you overwhelmed. 

Later in this series, I will try to list as many efficient navigation patterns as possible, so do not worry if something feels clumsy. 

Keep grinding slowly. Do not rush.  
