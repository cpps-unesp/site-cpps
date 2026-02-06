---
id: info-hardware
title: Informações de Hardware
sidebar_label: Informações de Hardware
---

### Informações do processador do computador

```
sudo dmidecode -t processor
```

### Informações sobre placa mãe

```
sudo dmidecode -t 2

```

### Lista de HDs instalados no computador

```
lsblk
```

### Descrição das informações do HD

```
sudo smartctl -d ata -a -i /dev/sda
```