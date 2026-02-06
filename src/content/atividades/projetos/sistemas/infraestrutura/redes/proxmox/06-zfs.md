---
id: zfs
title: Sobre ZFS
sidebar_label: ZFS
---

## Storage - ZFS

### ETAPA 1 - Listar partições

```
lsblk
```

### ETAPA 2 - Formatar partições

```
cfdisk
```

### ETAPA 3 - Instalação das ferramentas para gerenciamento do ZFS

```
apt-get install zfsutils zfs-initramfs zfs-zed
```

### ETAPA 4 - Testes de regressão

```
$ sudo apt-get install parted lsscsi

$ modinfo scsi_debug

$ /sbin/modprobe zfs

$ /usr/libexec/zfs/zconfig.sh -c

$ /usr/libexec/zfs/zfault.sh -c
```

**FONTE: http://zfsonlinux.org/zfs-regression-suite.html**

### ETAPA 5 - Criar um novo zpool (RAID-0)

```
zpool create -f -o ashift=12 disk01-zfs-raid0 /dev/sda /dev/sdc
```

### ETAPA 6 - Ativar compressão

```
zfs set compression=lz4 <pool>
```

### ETAPA 7

```
zfs create tank/vms
zfs create tank/bkp

zfs set compression=on tank/vms
zfs set compression=on tank/bkp

pvesm zfsscan
```

### Particionar SSD para LOG e Cache

```
# cfdisk /dev/sdd

```

### ETAPA - Adicionar log (ZIL) e cache (L2ARC) a pool existente

```
# zpool add -f <pool> log <device-part1> cache <device-part2>

# zpool add-f disk01-zfs-raid0 cache /dev/sdd6 log /dev/sdd5
 ```

  * metade da memoria RAM da máquina real = log

### ETAPA 8 - Limitar uso da mémoria utilizada pelo ZFS

```
t is good to use at most 50 percent (which is the default) of the system memory for ZFS ARC to prevent performance shortage of the host. Use your preferred editor to change the configuration in /etc/modprobe.d/zfs.conf and insert:

#  /etc/modprobe.d/zfs.conf

# options zfs zfs_arc_max=8589934592


# update-initramfs -u
```

### ETAPA 9 - Equilibrar utilização da memória pelo ZFS

```
SWAP on ZFS on Linux may generate some troubles, like blocking the server or generating a high IO load, often seen when starting a Backup to an external Storage.
We strongly recommend to use enough memory, so that you normally do not run into low memory situations. Additionally, you can lower the “swappiness” value. A good value for servers is 10:

# sysctl -w vm.swappiness=10

To make the swappiness persistent, open /etc/sysctl.conf with an editor of your choice and add the following line:

# nano /etc/sysctl.conf
# vm.swappiness = 10
```

```
It is recommended to create an extra ZFS file system to store your VM images:

# zfs create tank/vmdata
To enable compression on that newly allocated file system:

# zfs set compression=on tank/vmdata
You can get a list of available ZFS filesystems with:

# pvesm zfsscan
```

### ETAPA 10 - Ativar notificações por e-mail

```
apt-get install zfs-zed

nano/etc/zfs/zed.d/zed.rc
```

## Reutilizar storage ZFS


 - Antes de reabilitar o storage é necessário:
   - instalar o proxmox
   - inserir o node no cluster (se existir)

### Importar storages existentes

```
zpool import -a
```

É possível que uma mensagem similar a abaixo apareça:

```
cannot import 'zfs-rpl01': pool was previously in use from another system.
Last accessed by pve01 (hostid=522a0dd2) at Wed Nov 16 09:56:58 2022
The pool can be imported, use 'zpool import -f' to import the pool.
```

Nesse caso, digite o comando a seguir:

```
zpool import zfs-rpl01 -f
```

Listar um Storage importado:

```
zpool list # listar os pool criados
zpool status x # condições dos pools
zpool iostat -v
zfs list
```

### Habilitar Storage no datacenter

- Datacenter >> Storage >> ADD >> ZFS

- Renomear arquivos das máquinas:

```
sudo zfs rename zfs-rpl01/vms/vm-100-disk-0 zfs-rpl01/vms/vm-100-0-tmp
```

- Criar VMs (máquinas virtuais) vazias no Proxmox:

```

```

- Renomear os discos da máquina com os nomes da criação da VM:

```

```

### Mover vms

```
mv /etc/pve/nodes/<name_node>/qemu-server/<vmid>.conf etc/pve/nodes/<name_node>/qemu-server/<vmid>.conf

```

2. Deslocar VMS

```
zfs send zfs03-twodisk01t-raid0/vms/vm-1000-disk-1 | zfs recv zfs03-twodisk01t-raid0/vm-1000-disk-1 -F
```

**FONTE**: [ZFS on Linux](https://archive.is/WqqO9) e [Storage: ZFS](https://pve.proxmox.com/wiki/Storage:_ZFS)

## PVE01

```
zpool create -f -o ashift=12 zfs02-twodisk08t-raid0 /dev/sdc /dev/sdf

zfs set compress=lz4 zfs02-twodisk08t-raid0

zfs create zfs02-twodisk08t-raid0/vms
zfs create zfs02-twodisk08t-raid0/bkp

zfs set compression=on zfs02-twodisk08t-raid0/vms
zfs set compression=on zfs02-twodisk08t-raid0/bkp
```


```
zpool import zfs01-twodisk08t-raid0 -f
zpool import -a
```

* Renomear discos antigos

zfs rename

* criar vm

* Apagar discos da vm
zfs destroy

* Renomear discos antigos com nomes dos novos

```
sudo zfs rename zfs01ssd480x3raid0/vms/vm-old100-disk-0 zfs01ssd480x3raid0/vms/vm-9999-disk-0

sudo zfs rename zfs02sas300x2raid0/vms/vm-old100-disk-0 zfs02sas300x2raid0/vms/vm-9999-disk-0

sudo zfs rename zfs62480x1/vms/vm-old100-disk-0 zfs62480x1/vms/vm-9999-disk-0

####

sudo zfs destroy zfs01ssd480x3raid0/vms/vm-100-disk-0


sudo zfs rename zfs01ssd480x3raid0/vms/vm-9999-disk-0 zfs01ssd480x3raid0/vms/vm-100-disk-0

sudo zfs destroy zfs02sas300x2raid0/vms/vm-100-disk-0

sudo zfs rename zfs02sas300x2raid0/vms/vm-9999-disk-0 zfs02sas300x2raid0/vms/vm-100-disk-0

sudo zfs destroy zfs62480x1/vms/vm-100-disk-0

sudo zfs rename zfs62480x1/vms/vm-9999-disk-0 zfs62480x1/vms/vm-100-disk-0
```

```
sudo zfs destroy zfs02-twodisk08t-raid0/vms/vm-102-disk-0

sudo zfs rename zfs02-twodisk08t-raid0/vms/vm-9999-disk-0 zfs02-twodisk08t-raid0/vms/vm-102-disk-0

sudo zfs destroy zfs02-twodisk08t-raid0/vms/vm-102-disk-1

sudo zfs rename zfs02-twodisk08t-raid0/vms/vm-9999-disk-1 zfs02-twodisk08t-raid0/vms/vm-102-disk-1

sudo zfs destroy zfs02-twodisk08t-raid0/vms/vm-102-disk-2

sudo zfs rename zfs02-twodisk08t-raid0/vms/vm-9999-disk-2 zfs02-twodisk08t-raid0/vms/vm-102-disk-2

sudo zfs destroy zfs02-twodisk08t-raid0/vms/vm-102-disk-3

sudo zfs rename zfs02-twodisk08t-raid0/vms/vm-9999-disk-3 zfs02-twodisk08t-raid0/vms/vm-102-disk-3

sudo zfs destroy zfs02-twodisk08t-raid0/vms/vm-102-disk-4

sudo zfs rename zfs02-twodisk08t-raid0/vms/vm-9999-disk-4 zfs02-twodisk08t-raid0/vms/vm-102-disk-4

sudo zfs destroy zfs02-twodisk08t-raid0/vms/vm-102-disk-5

sudo zfs rename zfs02-twodisk08t-raid0/vms/vm-9999-disk-5 zfs02-twodisk08t-raid0/vms/vm-102-disk-5
```