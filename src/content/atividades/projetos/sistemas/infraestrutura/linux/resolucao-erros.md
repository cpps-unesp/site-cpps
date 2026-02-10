---
id: resolucao-erros
title: Resoluções de eventuais erros no computador
sidebar_label: Resoluções de eventuais erros no computador
---

- [Error al iniciar Linux - initramfs](https://youtu.be/I_Nnq9HDQrA)

## Resolver "/usr/bin/dpkg returned an error" In Ubuntu

```
sudo dpkg --configure -a
sudo apt install --fix-broken
sudo rm -rf /var/lib/dpkg/info/*.*
sudo apt remove --purge package_name
sudo apt clean
sudo apt autoremove

sudo apt update
```

### Material de apoio

- [How to Solve “Sub-process /usr/bin/dpkg returned an error code (1)” In Ubuntu](https://www.tecmint.com/sub-process-usr-bin-dpkg-returned-an-error-in-ubuntu/)
- [apt - E: Sub-process /usr/bin/dpkg returned an error code (1)](https://www.vivaolinux.com.br/dica/apt-E-Sub-process-usrbindpkg-returned-an-error-code-1-Resolvido)
