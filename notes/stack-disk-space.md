---
title: Cleaning up stack's disk space usage
tags:
  - haskell
  - stack
emoji: 📚
link: https://github.com/jhuizy/code-notes
---

Stack dependencies take up a lot of disk space over time because dependencies need to be rebuilt for each version of GHC a project relies on.

# Method 1 - nuke ~/.stack

I nuke my ~/.stack/ folder periodically to free space up, after backing up ~/.stack/config.yaml  and ~/.stack/global-project/stack.yaml

# Method 2 - Remove old GHC deps

I find that a lot of ~/.stack space accrual happens when you build projects with different stackage LTS versions, especially ones with different versions of GHC

You can run `du -ah ~/.stack | sort -h` to see which versions of GHC you have installed in your snapshots. The output will look something like

```
327M	/home/<user>/.stack/snapshots/x86_64-linux-tinfo6/3cfd07c042675258b09bc1efac3b3c46bfa870526392217331fea7362c31be81/8.10.1
665M	/home/<user>/.stack/snapshots/x86_64-linux-tinfo6/91af0e891c652e331cc626256b75b5299b4d96e5c740281345b2aacccbe80fd9/8.6.3
```

If you know you no longer need a particular version (e.g. if you have 8.4.* left over from an old build you won't be building again), you can just `rm -rf` that subdirectory