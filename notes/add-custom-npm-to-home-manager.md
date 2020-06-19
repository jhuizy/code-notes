---
title: Adding custom NPM program to home-manager
tags:
  - nix
  - home-manager
  - npm
emoji: 🐚
link: https://github.com/jhuizy/code-notes
---

[home-manager]() is a tool that allows you to declaritively define reproducible home environments (think dotfiles on steroids), including what packages are available for a user.

Packages can be installed from [nixpkgs]() by adding the following to your `home.nix`


```nix
home.packages = [
  htop
  shell
  ...
];
```

Packages available on NPM can be installed using `nodePackages` like

```nix
home.packages = [
  nodePackages.webpack-cli
];
```

However, only a select number of packages are made available in nixpkgs. Short of creating a pull-request requesting the new package, we can follow these steps:

### Create a node folder

Navigate to your `home.nix` installation and create a `node` folder

```bash
cd ~/.config/nixpkgs 
mkdir -p node
touch node/node-packages.json
```

### Create a node-packages.json 

The `node-packages.json` file should define all packages you want to install from `npm`.

Here's an example I use

```json
[
  "aws-azure-login"
]
```

### Generate relevant nix files with node2nix

Using nix-shell gives us a convenient one-liner (Note: I could make this a nix-shell script called `update.sh` or similar in the future. This works for me now) 

```bash
cd node
nix-shell -p nodePackages.node2nix --command "node2nix -i ./node-packages.json -o node-packages.nix"
```

### Import generated default.nix on your home.nix

In your `home.nix` you can now reference the packages by importing the `node/default.nix` file

```nix
let
  extraNodePackages = import ./node/default.nix {};
in
  home.packages = [
    ...
    extraNodePackages.aws-azure-login
  ];
```
