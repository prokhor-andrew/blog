---
title: Vim Part 2 - More Navigation
date: 2026-05-16
slug: vim-part-2---more-navigation
---

In this post I will add more navigation commands. 
After trying first four basic movements, you probably realized that it is tedious to move around using the cursor.
In this post, as well as the future ones, we will be learning more efficient ways of moving around vim.


## Jumping Between Words

To jump between words, there are four commands to use. They are: `e`, `b`, `w`, and `ge`.

- `e` - jumps to the *last* letter of the word *under the cursor*. If the letter under the cursor is already the last one, it will jump to the *last* letter of the *next* word.  
This is the way to jump forward between words staying on the last letter.

![example of e operator](../images/vim-part-2-img-1.png)

- `ge` - Jumps to the *last* letter of the *previous* word. A way to navigate back from a bunch of `e`s. 

![example of ge operator](../images/vim-part-2-img-4.png)

- `w` - jumps to the *first* letter of the *next* word. This acts like `ge` but in a different direction.   

![example of w operator](../images/vim-part-2-img-3.png)

- `b` - jumps to the *first* letter of the current word *under the cursor*. If the letter under the cursor is already the first one, it will jump to the *first* letter of the *previous* word.

![example of b operator](../images/vim-part-2-img-2.png)

To jump from the start to the end of the same word, I use `e` and `b` commands. 
Let's say I am on a random word in a random position. I click `b` and immediately get to its first letter. I click `e` and get to its last letter. 

`w` is something I use to jump a bunch of words forward. If I miss the word I needed, I may adjust myself using `ge`. 
That is because `w` guarantees to land on the next word, while `ge` guarantess to land on the previous one.


## Jumping Within a Line

This one is simple. To jump to the beginning of the line use `0`. To jump to the end of it use `$`. These two are used all the time by me, and worth getting comfortable with.

Sometimes you see the character you want to reach. To jump to it, you may click `f` following with the target character. This will move the cursor to the first occurance within the line. If after the first jump you realize that you need to go further to the right, you press `;`. This will move cursor to the next occurance. Repeat the motion, until you reach your destination.  

In case you jumped over the needed character, you can press `,` which will take you back to the previous occurance.  

This method is a better way of reaching a word/letter/character within one line, as you don't have to click as much to reach the word.


Other operators worth mentioning:    
- `F` - acts as `f`, but jumps backwards.
- `t` - acts as `f`, but with every jump, it lands not on the target letter, but on the last letter before it.  
- `T` - acts as `t`, but jumps backwards.


## Conclusion

At first, I wanted to add more commands and operators. But the amount of information above should be enough to leave you overwhelmed. 

Later in this series, I will try to list as many efficient navigation patterns as possible, so do not worry if something feels clumsy. 

Keep grinding slowly. Do not rush.  
