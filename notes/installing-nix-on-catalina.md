---
title: Installing nix on MacOS Catalina
tags:
  - nix
  - macos
emoji: 🐚
link: https://github.com/jhuizy/code-notes
---

[Nix](https://nixos.org/features.html) is a project which provides a declarative and reproducible approach to managing project dependencies.
It currently supports being run on both Linux and MacOS, but with MacOS Catalina making the root filesystem (ie. `/`) read-only, the installation story is not as straightforward as [it should be](https://nixos.org/download.html).

These are the steps I followed, and might not be the best way to work, but it's the way that worked for me.

### Creating the Volume

There is a script that can now be run as part of the Nix installation (which we'll use later on) to set up the Nix volume, but I found that I had to create it myself using the following command:

```bash
sudo diskutil apfs addVolume disk1 APFS 'Nix Store' -mountpoint /nix
```

### Run the installation script


Following [this dev.to post](https://dev.to/louy2/installing-nix-on-macos-catalina-2acb) and reading up on the official [nix docs](https://hydra.nixos.org/build/119559243/download/1/manual/#sect-macos-installation) 
eventually led me to run this command


```bash
sh <(curl -L https://nixos.org/nix/install) --darwin-use-unencrypted-nix-store-volume
```

### Fix up any shared object errors

For me initially the installatoin worked, but running any `nix-*` commands failed with

> libsodium dyld: Library not loaded

I'm not 100% sure of the root cause of these errors but upgrading the offending shared libraries in brew and relinking them seemed to fix my system enough to allow nix to work.

Something along these lines

```bash
brew upgrade libsodium
brew unlink libsodium && brew link libsodium
```

I intermittently ran into problems with brew installations, so I eventually ran a full

```bash
brew upgrade
```

Eventually I moved all my brew managed things to [home-manager](https://github.com/rycee/home-manager).
My current configuration can be found in my [home-manager repo](github.com/jhuizy/home-manager).