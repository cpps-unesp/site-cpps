---
id: storage
title: Storage
sidebar_label: Storage
---

## Localização de iso

```
/var/lib/vz/template/iso


## formatar

cfdisk /dev/sdd


##fixar nomes hds

ls /dev/disk/by-id/

nano /etc/zfs/vdev_id.conf

alias d01 wwn-0x5000c50071410e3f
alias d02 wwn-0x5000c500713e9223

```

## ZFS

- [ZFS: Usando Scrub para Ver Se o Pool Está Íntegro](https://www.gnulinuxbrasil.com.br/2021/02/11/zfs-usando-scrub-para-ver-se-o-pool-esta-integro-parte-14/)

- [ZFS on Linux](https://archive.is/WqqO9) e [Storage: ZFS](https://pve.proxmox.com/wiki/Storage:_ZFS)

- Instalar as bibliotecas abaixo:

```
apt-get install zfsutils zfs-initramfs zfs-zed parted lsscsi
```

- Criar ZFS Pool:

```
zpool create -f -o ashift=12 <nome_pool> <device1> <device2>
zpool create -f -o ashift=12 zfs-rpl-nvme-01 nvme1n1
zpool create -f -o ashift=12 zfs-rpl02 d01 d02
```

- Listar Pool ZFS:

```
zpool list
zpool status zfs-rpl02
zfs list
```

- Criar partição para alocar VMs:

```
zfs create <nome_pool>/vms
zfs create zfs-rpl-nvme-01/vms
zfs create zfs-rpl02/vms
```

- Verificar estado da compressão:

```
zfs get compression <nome_pool>
zfs get compression zfs-rpl-nvme-01
```

- Habilitar compressão:

```
zfs set compression=on <nome_pool>
zfs set compression=on zfs-rpl-nvme-01
zfs set compression=on zfs-rpl02/vms
```

- Definir tipo de compressão:

```
zfs set compression=<algorithm> <nome_pool/fs>
zfs set compression=lz4 zfs-rpl-nvme-01/vms
zfs set compression=lz4 zfs-rpl02/vms
```

```
pvesm zfsscan
zpool iostat -v
```

- Configuração na interface gráfica:

```
Datacenter > Storage > Add > ZFS

enable - ok
thin provision - ok
block size 8k - ok

https://forum.proxmox.com/threads/enable-sparse-on-existing-zfs-storage.74078/
https://forum.proxmox.com/threads/adding-zfs-pool-with-ashift-12-which-block-size-option.46594/
https://forum.proxmox.com/threads/problem-with-volblocksize.83193/


```

- Mover arquivos entre máquinas:

```
nome_storage_origem/vms/nome_arquivo | ssh root@numero_ip zfs receive nome_storage_destino/vms/nome_arquivo
zfs send zfs-rpl02/vms/vm-1001-disk-0 | ssh root@numero_ip zfs receive zfs-rpl-nvme-01/vms/vm-1001-disk-0
```

- Mover configurações da VM (máquina virtual):

```
scp root@numero_ip_origem:/etc/pve/qemu-server/numero_vm.conf /etc/pve/qemu-server/
```

- Ajustar configuração da VM movida:
  - Entrar no arquivo indicado abaixo e ajustar as informações. Normalmente, o nome do Storage e a interface de rede necessitam ser ajustadas.

```
/etc/pve/qemu-server/numero_vm.conf
```


- [Copy zfs volume onto another server using ssh](https://ispire.me/copy-zfs-volume-onto-another-server-using-ssh/)
- [Sending and Receiving ZFS Data](https://docs.oracle.com/cd/E18752_01/html/819-5461/gbchx.html)
- [How to Remotely Administer ZFS With Secure Shell](https://docs.oracle.com/cd/E53394_01/html/E54793/sshuser-9.html)



```
/ - 51G
/boot - 1GB
/home - 52GB
/swapp - 16GB

/250GB

https://diolinux.com.br/sistemas-operacionais/como-instalar-o-zram-no-ubuntu-e-outras-dicas-para-melhorar-o-desempenho.html

```


```
https://wiki.archlinux.org/title/ZFS_(Portugu%C3%AAs)
https://youtu.be/71o6Tyh2MUk
https://pve.proxmox.com/wiki/Storage:_ZFS
https://pve.proxmox.com/wiki/ZFS_on_Linux#zfs_compression
https://pve.proxmox.com/wiki/ZFS:_Tips_and_Tricks
https://openzfs.github.io/openzfs-docs/Project%20and%20Community/FAQ.html?highlight=vdev_id#setting-up-the-etc-zfs-vdev-id-conf-file
https://tbellembois.github.io/ZFS_debian.html



```

## NFS

### Configuração no cliente


```
sudo mkdir r -p /media/hdvm05

```

```
sudo chmod 755 -R /media/hdvm03

```

```
sudo mount -o proto=tcp -t nfs4 200.145.122.125:/media/hdvm05 /media/hdvm05/

```


### autofs

- Edite o arquivo `/etc/auto.master` para incluir a seguinte linha:

```
diretorio_raiz /etc/auto.nfs

```
- Crie o arquivo `/etc/auto.nfs` com as informações das partições a serem montada


```
compartilhada  -fstype=nfs4   endereço_servidor:/pasta/compartilhada

```

- reinicie o `autofs`

```
sudo systemctl restart autofs

```




https://www.dobitaobyte.com.br/network-file-system-nfs/


## PVESM

```
http://www.ricardobarbosams.com.br/dokuwiki/doku.php?id=infra-estrutura:proxmox:comandos_proxmox
https://pve.proxmox.com/pve-docs/pvesm.1.html

```


## IO Delay

- https://forum.proxmox.com/threads/high-io-delay.89599/
- https://forum.proxmox.com/threads/very-high-io-delay-on-any-load.37693/
- https://forum.level1techs.com/t/zfs-high-i-o-issue-txg-sync-100-and-z-trim-int-60-to-70/163166/38