---
title: Bootstrapping a node.js project with nix
tags:
  - node
  - nix
emoji: 🐚
link: https://github.com/jhuizy/code-notes
---

Use `nix-shell` to temporarily use [node2nix](https://github.com/svanderburg/node2nix) and generate a `default.nix` file from an existing `package.json` file.

```bash
nix-shell -p nodePackages.node2nix --command "node2nix . > default.nix"
```

Now we can create a new shell using

```bash
nix-shell -A shell
```

Alternatively, we create a simple `shell.nix` file which removes the need to pass in `-A shell`

```nix
{ pkgs ? import <nixpkgs> { } }:
let
  nodePackages = import ./default.nix {};
in
  nodePackages.shell
```
