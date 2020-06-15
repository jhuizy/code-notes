---
title: Using xargs
tags:
  - shell
  - patterns
  - bash
emoji: 🐚
link: https://github.com/jhuizy/code-notes
---

Using output of previous command as an argument in the next command with `xargs`

For example, if we had the following command to list buckets in S3

```bash
aws s3 ls
```
And we want to list the contents of the first bucket

```bash
aws s3 ls | head -n 1 | xargs aws s3
```
