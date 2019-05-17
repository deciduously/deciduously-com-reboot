---
title: "How I Emacs And So Can You"
date: "2019-03-08"
---

Emacs is a _whole thing_. It's a great tool to have in your belt, though, and nobody ever sat me down and showed me what to do with it. I think it's a damn shame I took so long to find it, so pull up a chair - we're going to set us up some editor.

This first post will go over basic usage and configuration, and next I'll go over the packages I've found most helpful.

I came to Emacs, as so many do, via [Spacemacs](http://spacemacs.org/), which is a distribution of Emacs that comes preconfigured with a bunch of stuff and with its own separate abstraction over sets of packages. It's great, actually. It also has good integration with `evil` mode, which enable Vim keybindings, making it a lot more interesting to, well, Vim users. I had already built some familiarity with Vim and was hesitant about undoing that progress, but far too curious about Emacs not to try it out. Spacemacs is great, but it's a behemoth - there's a lot there, more than I'll ever need to use. I realized after a few months that I hadn't really learned anything at all about Emacs - I was still using Vim bindings and had only ever added and removed layers from `.spacemacs` - no actual Emacsery afoot.

So, I started fresh. I got a blank `~/.emacs.d` and set out to build the editor I wanted from scratch, and this time around I buckled down and went through the Emacs tutorial to get the "real" bindings under my fingers. I now use a mix of VSCode and Emacs, but I'm glad I took the time to learn how powerful this tool really is, and still use the Emacs keybindings in VSCode instead of Vim now.

...Yes, I wrote this article in Emacs. Yeah, I heard you.

If you're planning to use Emacs in earnest, you should take the time to go through the tutorial. Until then, here's a quick overview.

## A Quick Overview

Emacs is manipulated through combinations of commands. Like Vim, it offers a scheme for controlling your text editor from the keyboard, moving away from the home row as little as possible. Unlike Vim, which has separate _modes_ that you switch in and out of, Emacs uses sequences of key combinations. No mode switching here, you use modifier keys to indicate an editor action. For example, we have "Ctrl-x, Ctrl-s" to save the current buffer, which is the current opened bit of text you're working on. You can remember it by thinking "execute save" - the "Ctrl-x" prefix is used to _execute_ a number of commands. These sequences are so common in Emacs that there's a shorthand - this command would be written `C-x C-s`. Capital C is Control, and the other most common is capital `M`. This is most likely your "alt" key. One great combo to keep in mind is `M-x`, which allows you to execute any Emacs command by name. Emacs commands are just Emacs Lisp functions, and you can write your own, but there's a ton built in. Our new best friend `C-x C-s` is shorthand for the aptly named `save-buffer`, and if you've completely forgotten the combo, you can always `M-x save-buffer` in a pinch.

If all this sounds like it's going to be a lot, that's because it absolutely is. How would you know it's called exactly that? What else is there? Fret not! In the next post we're going to install a few very helpful packages that lets us explore these trees of commands visually. It's all quite nice, I promise, [don't panic](https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcatallassi.files.wordpress.com%2F2014%2F04%2Fthe-hitchhikers-guide-to-the-galaxy-dont-panic-1280x1024-wallpaper_www-wall321-com_50.jpg&f=1)!

Here's a few helpful commands.

### Movement

```
C-f Move [f]orward one character
M-f Move [f]orward one word

C-b Move [b]ackward one character
M-b Move [b]ackward one word

C-n Move to the [n]ext line
C-p Move to the [p]revious line

C-a Move to the [a]ft of the line (okay that's a little forced - the beginning of the line)
C-e Move to the [e]nd of the line

M-< Move to the top of the file
M-> Move to the bottom of the file
```

### Copy/Cut/Paste

```
Move cursor to beginning of region

C-Spc to set marker

Move cursor to the end of the region

C-w to cut the marked region or
M-w to copy the marked region

Move cursor to target

C-y to paste region
```

### File/Window/Buffer

```
C-x C-s save current buffer
C-x C-f Open file
C-x C-c Save and quit emacs
C-x b List open buffers (This will let you select one of them)
C-x 1 Delete all other open windows (This is useful for getting rid of one-off messages that spawn windows)
C-/ Undo - keep going to keep undoing
```

### Advanced:

```
C-M-f Move forward over a balanced expression (words count!  try this one on a bunch of different kinds of files)
C-M-b Move backward over a balanced expression
C-M-k Kill balanced expression forward
C-M-Spc Mark the end of the next s-expression
C-M-n Move forward a parenthetical group
C-M-p Move backward a parenthetical group
```

One honorary mention: `C-k [k]ill line`. This will kill from the cursor to the end of the line, and also pull the text into the buffer. You can then paste what was killed with `C-y`. As an example a common pattern for me for moving the line I'm on is `C-a C-k` to hop to the beginning and kill it, then using `C-n` or `C-p` and `C-y` to drop it somewhere else. Self test: what does `M-< C-Spc M-> M-w` do?

Each command is fairly mnemonic. It doesn't take long to get them under your fingers. I find myself saying the action I intend aloud in my head for a while when I'm learning a new one. Also, the `M` version are often "more abstracted" versions of your favorite `C` command. That's often a good thing to try when exploring a new library - many will define combinations with similar characteristics.

Some of those require three keys - `M->` has a shift involved too. Wacky, right? It definitely does take some practice, but eventually you never need to leave the home row position.

Also awesome is that these key combinations show up all over the place! If your system has `bash`, open up a terminal - `C-f`, `C-b`, `C-a`, and `C-e` all work. Anything that uses `readline` will use a subset of these commands as well. This might be common knowledge, but I had no idea until I tried Emacs. Blew my mind a little at least.

This was but a touch of the commands available. You can make windows (try `C-x 2` or `C-x 3` to split the window horizontally or vertically) and do all kinds of fun stuff (check out [`C-x z`](https://www.gnu.org/software/emacs/manual/html_node/emacs/Repeating.html)) - I cannot hope to do it all justice here so I won't try. I definitely recommend going through the tutorial and looking at the [`manual`](https://www.gnu.org/software/emacs/manual/html_node/emacs/index.html#Top). This post is going to focus on the config, and this all should get you up and running. You can also fall back to the arrow keys and mouse to hop around if you need, but it's worth it to force yourself not to!

Now we're going to start to dive through my personal `init.el`. Contain your excitement, please, we've only just begun.

## init.el

Emacs is really a lisp interpreter with a solid text editor bundled. I've always thought the whole "Emacs vs. Vim" debate was a little ridiculous - they're wildly different. Vim is for when you would use a text editor, Emacs feels much more akin to driving a hyper-customizable IDE. There's no "Notepad++ vs IntelliJ" flame war going on, why should there be one between Vim and Emacs?

Anyway, the goodness starts in a file called `init.el`. This is an ELisp file that lives in your `emacs.d` directory and is evaluated on startup. Mine begins with a number of variables being set. These are my preferences, season to taste:

```elisp
(setq delete-old-versions -1 ) ; delete excess backups silently
(setq version-control t )
(setq vc-make-backup-files t )
(setq vc-follow-symlinks t )
(setq backup-directory-alist `(("." . "~/.emacs.d/backups")) )
(setq auto-save-file-name-transforms '((".*" "~/.emacs.d/auto-save-list/" t)) )
(setq inhibit-startup-screen t )
(setq ring-bell-function 'ignore ) ; silent bell on mistakes
(setq coding-system-for-read 'utf-8 )
(setq coding-system-for-write 'utf-8)
(setq sentence-end-double-space nil)
(setq-default fill-column 80) ; toggle wrapping text at this column
(setq initial-scratch-message "EEEEEEEEEEEmacs...macs...(macs)... Hi Ben." ) ; You should probably change this
(global-display-line-numbers-mode t )
(menu-bar-mode -1) ; no need for the menu bars - we've got key combos for that!
(toggle-scroll-bar -1)
(tool-bar-mode -1)
```

@yorodm hepfully suggests the following more complete UTF-8 config:

{% devcomment 9979 %}

Thanks, Yoandy!

Remember before when I said Emacs was a Lisp interpreter? It's serious business. You don't need to restart the editor to make changes, or even reload the whole buffer. You can use `C-x C-e` with your cursor at the end of any of those parenthesized s-expressions to have Emacs evaluate it immediately. Aww _yeah_. Try toggling the scroll bar on and off BEFORE YOUR VERY EYES. You can also use `M-x eval-buffer` to reload the whole thing or just mark a region and use `M-x eval-region` - you do you, you know?

This section is pretty readable. You use `setq` to set the value of variables. Anything set to a value of `-1` is like setting it to `false` - I'm disabling the menu bar and toolbar and all the extra stuff that's on by default. All the functionality therein is also exposed via endless trees of keyboard commands.

Now for the packages!

### use-package

Packages in Emacs are powerful, and with that power does come some complexity. To tame the beast, I recommend a tool called [`use-package`](https://github.com/jwiegley/use-package). It's a macro that lets you compartmentalize your package declarations and set per-package configurations in a neat and tidy way. To set it up with the Emacs package manager, add the following to `init.el`:

```elisp
;; use-package setup
(require 'package)
(setq package-enable-at-startup nil) ; dont do it immediately
(setq package-archives '(("org"       . "http://orgmode.org/elpa/")
			 ("gnu"       . "http://elpa.gnu.org/packages/")
			 ("melpa"     . "https://melpa.org/packages/")))
(package-initialize)

;; Bootstrap use-package
(unless (package-installed-p 'use-package)
  (package-refresh-contents) ; update archives
  (package-install 'use-package)) ; grab the newest use-package

;; Define packages
(require 'use-package)

;; Always download if not available
(setq use-package-always-ensure t)
```

Don't forget to `M-x eval-buffer`!

### Testing it out

To check that it's all working, lets add a package. A good one to start with is [all-the-icons](https://github.com/domtronn/all-the-icons.el). This installs a bunch of icons and fonts - no more blank squares anywhere. Add the following:

```elisp
(use-package all-the-icons)
```

With your cursor at the end of the line, smash that `C-x C-e` and Emacs will install the package. It works because we have `(setq use-package-always-ensure t)` set. This particular package has a one-time setup step - go ahead and execute `M-x all-the-icons-install-fonts` now so you never have to worry about it again.

You should be good to go! This is a very blank slate - head to part 2 to get productive with it!

Oh, by the way... the self test answer from above: `M-< C-Spc M-> M-w` will copy the whole buffer. I was going to wait for the next post but I just couldn't. Emacs is _just so exciting_.

In the first post we looked at some basic usage and navigation, and set up `use-package` so we can easily add community packages to our Emacs installation.

## Breathing Room

I think I go a little overboard with this, but every time one of my `use-package` declarations goes over a single line, I like to pull it out to its own file. That way I just have one line to comment/uncomment in `init.el` to activate/deactivate a package. To set this up, create a directory inside `.emacs.d` - I just called mine `.emacs.d/lisp`. We can ensure it gets evaluated by adding the following to `init.el`:

```elisp
;; Pull in ./lisp/*
(add-to-list 'load-path (expand-file-name "lisp" user-emacs-directory))
```

Now any `whatever.el` elisp file we put in this directory will be visible to `init.el`.

The Emacs ecosystem is big, and there are multiple solutions and sets of solutions for any given problem. I like to keep mine pretty minimal, this is just the set that works for me - I do urge you to explore! The packages used in this set, notably, are not the same set that Spacemacs is based around. When you do your own research, it sorta-kinda comes down to [`helm`](https://github.com/emacs-helm/helm) & friends vs. [`ivy/swiper/counsel`](https://github.com/abo-abo/swiper) - this is the `ivy` route. I intentionally wanted to try something different from what I had gotten to know via Spacemacs, but it shouldn't be taken as a value judgement at all. I've enjoyed using both greatly.

These are completion engines. Remember the last post, when we forgot `C-x C-s` but then still miraculously knew it was `save-buffer`? With `ivy`, you'd be able to just hit `M-x` and then frantically start typing `save` and `ivy` will find everything it possibly could be. It will even helpfully show you the assigned key combination for a given command if there is one. Pretty damn handy with a tool as vast as Emacs! It's a personal always-on concierge.

### Ivy/Counsel/Swiper

That's as good a place to start as any. Ivy is the main event here, and `counsel` and `swiper` are `ivy`-imbued versions of common commands and file search, respectively. Create a file called `init-ivy.el`:

```elisp
;;; #init-ivy.el
;;; Commentary:
;;; http://oremacs.com/swiper/#installation
;;; https://sam217pa.github.io/2016/08/30/how-to-make-your-own-spacemacs/#fnref:3
;;; https://writequit.org/denver-emacs/presentations/2017-04-11-ivy.html#fnr.2
;;; Code:
(use-package ivy
  :diminish (ivy-mode . "")
  :init (ivy-mode 1) ; globally at startup
  :config
  (setq ivy-use-virtual-buffers t)
  (setq ivy-height 20)
  (setq ivy-count-format "%d/%d "))
(provide 'init-ivy)
;;; init-ivy.el ends here.
```

In this same file, I also set up `counsel`. This package overrides some built-in Emacs commands with more user friendly versions. Add this above the final comment:

```elisp
;; Override the basic Emacs commands
(use-package counsel
  :bind* ; load when pressed
  (("M-x"     . counsel-M-x)
   ("C-s"     . swiper)
   ("C-x C-f" . counsel-find-file)
   ("C-x C-r" . counsel-recentf)  ; search for recently edited
   ("C-c g"   . counsel-git)      ; search for files in git repo
   ("C-c j"   . counsel-git-grep) ; search for regexp in git repo
   ("C-c /"   . counsel-ag)       ; Use ag for regexp
   ("C-x l"   . counsel-locate)
   ("C-x C-f" . counsel-find-file)
   ("<f1> f"  . counsel-describe-function)
   ("<f1> v"  . counsel-describe-variable)
   ("<f1> l"  . counsel-find-library)
   ("<f2> i"  . counsel-info-lookup-symbol)
   ("<f2> u"  . counsel-unicode-char)
   ("C-c C-r" . ivy-resume)))     ; Resume last Ivy-based completion
```

Don't worry too too much about memorizing everything here right off the bat - it will be here when you need it. For a while I had an index card with a few of the most handy ones sitting on my desk. In the last post we covered the "save" action, which was a whole keypress more than you're probably used to - this is because `C-s` is reserved for searching for text in the given file. Check out the [video demo](https://www.youtube.com/watch?v=VvnJQpTFVDc).

### Interlude: Wait, There Totally Are Modes

Well, yes, but they're not Vim modes! In Emacs, a `mode` determines how Emacs semantically understands the text in the current buffer. These fall into two categories, `major` and `minor` - each buffer has one major mode, and can have multiple minor modes. A major mode might be something like `clojure-mode` - this text is only Clojure code, not some other type of code as well, but could have `ivy-mode` and `spellcheck-mode` enabled as well, because that functionality can stack.

Alright, now that `init-ivy.el` has been added to `lisp/`, we can add it to `init.el`:

```elisp
(require 'init-ivy)
```

That's it! Evaluating that `require` expression with `C-x C-e` will read our new file and set up Ivy for us.

### Flycheck

Another package I love is [flycheck](https://www.flycheck.org/en/latest/), which provides on the fly syntax checking. It has indicators for problematic lines, squiggly underlines, and pop-up tooltips - all the trappings of a modern syntax checker. This declaration is simpler:

```elisp
;;; lisp/init-flycheck.el
(use-package flycheck
  :init (global-flycheck-mode))
(provide 'init-flycheck)
```

And in `init.el`:

```elisp
(require 'init-flycheck)
```

Some languages will require special setup, but most things will just work out of the box.

### Company

A perfect complement to `flycheck-mode` is [`company-mode`](https://company-mode.github.io/), which provides text-completion. As you type, it will make suggestions. You can scroll through them with `M-n` and `M-p`, and use the enter key to select. There are more ways to interact with it as well - peep the docs for deets.

In `lisp/init-company.el`:

```elisp
(use-package company
  :config
  (add-hook 'after-init-hook 'global-company-mode))
(provide 'init-company)
```

And of course `(require 'init-company)` in `init.el`. Now we're starting to feel like a real IDE!

### which-key

This is probably my favorite of the bunch. Ivy is giving us some nice completions, but you still need to know where to start - it's not great for discovering what's available. [Which-key](https://github.com/justbur/emacs-which-key) will pop up a window when you begin a command listing everything available. In our `save-buffer` example, when you type the first `C-x`, you'll get a big pane detailing every combination available after `C-x`, with the combo and the command name. This is how I find new combos to learn, and it's great for jogging your memory.

My `init-which-key.el`:

```elisp
(use-package which-key
  :init
  (which-key-mode)
  :config
  (which-key-setup-side-window-right-bottom)
  (setq which-key-sort-order 'which-key-key-order-alpha
	which-key-side-window-max-width 0.33
	which-key-idle-delay 0.05)
  :diminish which-key-mode)

(provide 'init-which-key)
```

Tweak these to your liking, these settings work for me. Of course, don't forget `(require 'init-which-key)` in `init.el`!

### Smartparens

This minor mode helps manage your parentheses. It has a number of [facilities](https://github.com/Fuco1/smartparens) for manipulating parenthetical expressions - a huge help no matter what programming language you use.

`lisp/init-smartparens.el`:

```elisp
(use-package smartparens
  :config
  (require 'smartparens-config)
  (add-hook 'lisp-mode-hook #'smartparens-strict-mode))
(provide 'init-smartparens)
```

I've added a hook that activates an even stricter version when I'm in a specific minor mode - this is also something you'll need to tweak for yourself! I actually also use `smartparents-strict-mode` in `rust-mode` - we'll get to the langauge-specific stuff later.

By now you know the drill for getting it into `init.el`!

### Neotree

This is my last general package. Neotree is a habit I picked up from Vim - it shows a graphical overview of the directory tree that you can use to switch between files. Another nicety that IDEs feel like they should have - though for the most part I find myself invoking `C-x C-f` or `C-x b` to navigate around in a project.

`lisp/init-neotree.el`:

```elisp
(use-package neotree
  :init
  (require 'neotree)
  :config
  (setq neo-theme (if (display-graphic-p) 'icons 'arrow))
  (setq neo-smart-open t)
  )
(provide 'init-neotree)
```

I lied - that was the second to last. I also use [`find-file-in-project`](https://github.com/technomancy/find-file-in-project).

```elisp
(use-package find-file-in-project)
```

## Keybindings

The next order of business is setting up your own keybindings. We can use `global-set-key` for this. The first one I set is the key to activate `neotree` - add this to your `init.el`:

```elisp
(global-set-key [f8] 'neotree-project-dir)
```

To enable this behavior, I have the following snippet stolen from the emacs wiki placed in `lisp/bl-fns.el` to facilitate NeoTree attempting to use the git project root when it opens:

```elisp
(defun neotree-project-dir ()
  "Open NeoTree using the git root."
  (interactive)
  (let ((project-dir (ffip-project-root))
	(file-name (buffer-file-name)))
    (if project-dir
	(progn
	  (neotree-dir project-dir)
	  (neotree-find file-name))
      (message "Could not find git project root."))))

(provide 'bl-fns)
```

Pretty easy, right? Now the F8 key will toggle the NeoTree window. Cool. Another keybinding I add for myself that I find useful is this:

```elisp
(global-set-key (kbd "C-c q") (lambda ()
	       		       (interactive)
   			       (other-window -1)))
```

The `kbd` macro lets you define combos using the handy shorthand. This combo, `C-c q`, will switch back to the previous active window. I generally only have two or three open and find myself using this one a lot.

I also like this shorthand for `company-complete`:

```elisp
(global-set-key (kbd "C-c h") 'company-complete)
```

## Language-specific packages

### Clojure

For clojure, I use [CIDER](https://github.com/clojure-emacs/cider):

```elisp
;; init-clojure.el
(use-package clojure-mode)
(use-package cider)
(provide 'init-clojure)
```

CIDER is a whole can of worms in and of itself - I'll come back to that in a separate post sometime!

### Rust

Rust has a little more going on to set it up with flycheck and cargo and everything:

```elisp
;; init-rust.el
(use-package rust-mode)
(use-package flymake-rust)
(use-package racer)
(use-package company)
(use-package cargo
  :config
  (add-hook 'rust-mode-hook 'cargo-minor-mode))
(use-package flycheck-rust)
(with-eval-after-load 'rust-mode
  (add-hook 'flycheck-mode-hook #'flycheck-rust-setup))
(provide 'init-rust)
```

To be completely honest, Rust was my biggest driver in migrating toward VSCode - Rust in Emacs is fantastic, Rust in VSCode is unparalleled. The above works great, but I just can't in good faith recommend this setup _over_ using the RLS from VSCode.

### Some More

Forth, JavaScript/HTML/CSS, and Reason/OCaml I use with zero config:

```elisp
(use-package forth-mode)
(use-package js2-mode)
(use-package reason-mode)
(use-package web-mode)
(use-package ocp-indent)
```

And....that's all I got for ya! This set of packages provides a complete multi-language IDE without much bloat.

To update your installed packages, run `M-x list-packages` - this will refresh the latest package list. Then just type `U` (shift-u) to upgrade any that are outdated.
