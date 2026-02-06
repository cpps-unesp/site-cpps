---
id: instalacao
title: Instalação
sidebar_label: Instalação
---

## Remover interface de rede padrão

```
rm /etc/network/interfaces.d/setup
```

## Add source list debian 11



## desabilitar suspensão e hibernação

- https://archive.is/iotiY

- https://www.2daygeek.com/enable-disable-up-down-nic-network-interface-port-linux/


```
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target

```

## Excluir NetworkManager (não)

```
https://archive.is/AK909

sudo apt-get remove --purge network-manager-gnome network-manager

```

## Fixar nomes de interfaces de rede


```
nano /etc/systemd/network/10-enp1s0.link
[Match]
MACAddress=00:40:a7:11:7e:6a

[Link]
Name=enp1s0



```

## Adicionar network/interfaces


```
auto lo
iface lo inet loopback


auto eno1
iface eno1 inet static
       address 192.168.0.31/23




```


## Instalar proxomox

- Confirmar ou adicionar em /etc/hosts o endereço de IP

```
hostname --ip-address
```

```
127.0.0.1       localhost

192.168.0.11 pve-ippri-11.lantri.org pve-ippri-11 pvelocalhost
192.168.0.12 pve-ippri-12.lantri.org pve-ippri-12 pvelocalhost
192.168.0.13 pve-ippri-13.lantri.org pve-ippri-13 pvelocalhost
192.168.0.31 pve-ippri-31.lantri.org pve-ippri-31 pvelocalhost
192.168.0.32 pve-ippri-32.lantri.org pve-ippri-32 pvelocalhost
192.168.0.33 pve-ippri-33.lantri.org pve-ippri-33 pvelocalhost

# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```




```
127.0.0.1       localhost

192.168.0.21 pve-labri-21.lantri.org pve-labri-21 pvelocalhost
192.168.0.22 pve-labri-22.lantri.org pve-labri-22 pvelocalhost
192.168.0.23 pve-labri-23.lantri.org pve-labri-23 pvelocalhost
192.168.0.24 pve-labri-24.lantri.org pve-labri-24 pvelocalhost
192.168.0.25 pve-labri-25.lantri.org pve-labri-25 pvelocalhost
192.168.0.27 pve-labri-27.lantri.org pve-labri-27 pvelocalhost
192.168.0.31 pve-labri-31.lantri.org pve-labri-31 pvelocalhost
192.168.0.32 pve-labri-32.lantri.org pve-labri-32 pvelocalhost
192.168.0.33 pve-labri-33.lantri.org pve-labri-33 pvelocalhost

# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters

```


```

- nano /etc/apt/sources.list

#########
#PROXMOX
#########

deb http://deb.debian.org/debian bookworm main contrib non-free-firmware
deb http://deb.debian.org/debian bookworm-updates main contrib non-free-firmware

# Proxmox VE pve-no-subscription repository provided by proxmox.com,
# NOT recommended for production use
deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription

# security updates
deb http://security.debian.org/debian-security bookworm-security main contrib non-free-firmware

```


```
apt autoclean && apt clean && apt update
apt install wget --yes
wget https://enterprise.proxmox.com/debian/proxmox-release-bookworm.gpg -O /etc/apt/trusted.gpg.d/proxmox-release-bookworm.gpg
```

```
apt remove qemu-system-data && apt autoclean && apt autoremove
apt autoclean && apt clean && apt update && apt full-upgrade

```

```
apt update && apt install proxmox-ve postfix open-iscsi
```

```
apt autoclean && apt clean && apt remove os-prober
```

```
nano /etc/apt/sources.list.d/pve-enterprise.list

```
## Remove the Debian kernel


```

apt remove linux-image-amd64 'linux-image-6.1*'

```

```
update-grub
```


- https://pve.proxmox.com/wiki/Install_Proxmox_VE_on_Debian_11_Bullseye
- https://pve.proxmox.com/wiki/Install_Proxmox_VE_on_Debian_Buster#Optional:_Remove_the_Debian_kernel


## NTP

```
sudo apt update && sudo apt install ntpdate nmap
```




```
sudo nmap -p123 -sU -P0 localhost

```


```
sudo nano /etc/systemd/timesyncd.conf
Servers=ntp.unesp.br

```

```
sudo touch /etc/ntp.drift

```

```
sudo nano /etc/ntp.conf
server ntp.unesp.br iburst
```

```
sudo /etc/init.d/ntp restart && sudo ntpq -c lpeer && sudo ntpdate -u ntp.unesp.br && sudo reboot now

sudo nano /etc/ntp.conf
server ntp.unesp.br iburst
sudo apt install systemd-timesyncd
nano /etc/systemd/timesyncd.conf
NTP=ntp.unesp.br
sudo systemctl start systemd-timesyncd
timedatectl
sudo ntpdate -u ntp.unesp.br
```

## Config. VLAN

```

auto enp9s0
iface enp9s0 inet manual
#porta-12

auto vmbr1
iface vmbr1 inet manual
        bridge-ports enp9s0
        bridge-stp off
        bridge-fd 0
        bridge-vlan-aware yes
        bridge-vids 2-4094

auto vmbr1.192
iface vmbr1.192 inet static
        address 192.168.0.32/23

```

## Criar cluster

```
pvecm create nome_cluster
```


## Incluir node no cluster

```
pvecm add pve-ippri-11
```

## ISO

```
cd /var/lib/vz/template/iso

```

## NVIDIA

```
https://averagelinuxuser.com/debian-11-after-install/
https://forums.developer.nvidia.com/t/nvidia-smi-has-failed-because-it-couldnt-communicate-with-the-nvidia-driver-make-sure-that-the-latest-nvidia-driver-is-installed-and-running/197141

https://linuxhint.com/install-nvidia-drivers-debian-11/

https://www.youtube.com/watch?v=jzYA1ojXVhM

https://www.nvidia.com.br/Download/driverResults.aspx/186033/br


```


# NVIDIA Driver e outros

```
https://mateusmuller.me/2017/09/07/como-atualizar-o-driver-da-nvidia-no-linux/
https://solveforum.com/forums/threads/how-to-install-nvidia-drivers-on-proxmox.77606/
https://forum.proxmox.com/threads/you-are-attempting-to-remove-the-meta-package-proxmox-ve.110023/
https://forum.proxmox.com/threads/installing-nvidia-drivers-on-proxmox-host.69554/


# https://averagelinuxuser.com/debian-11-after-install/

```

### verificar modelo da placade video


```
lspci | egrep 'VGA|NVIDIA'

```

###  Efetuar o download no [site da NVIDIA](https://www.nvidia.com.br/Download/index.aspx?lang=br)

```

apt update

apt-get install -y libglvnd-dev

apt install pve-headers

```


```

nano /etc/modprobe.d/blacklist.conf

```

```

blacklist vga16fb
blacklist nouveau
blacklist rivafb
blacklist nvidiafb
blacklist rivatv

```


- ajuste via grub



```

./NVIDIA-Linux-*** --no-x-check

```

## Adicione o botão Minimizar

 - Abra Tweaks> Barras de título da janela> Ativar Minimizar

```
https://forum.proxmox.com/threads/configure-pfsense-with-a-public-ip-single.46319/
https://forum.proxmox.com/threads/closed-masquerading-in-proxmox-7.104591/
https://forum.proxmox.com/threads/iptables-issue-between-proxmox-and-pfsense-vm.101113/
https://forum.proxmox.com/threads/loss-of-network-connection-when-trying-to-install-proxmox-on-a-debian-server-configured-with-a-vlan-aware-bridge-on-a-bond.106149/
https://forum.proxmox.com/threads/pfsense-wan-only-1-public-ip-how-to-bridge.25469/
https://forum.proxmox.com/threads/one-public-ip-on-a-dedicated-server.82158/
https://forum.proxmox.com/threads/pfsense-on-a-pve-cluster.84896/
https://forum.proxmox.com/threads/pfsense-on-a-3-node-cluster.105252/
https://forum.proxmox.com/threads/getting-nat-to-work.78466/


```

```
pvecm nodes

Membership information
----------------------
    Nodeid      Votes Name
         1          1 pve-ippri-32 (local)
         2          1 pve-ippri-31

pvecm expected 1
Unable to set expected votes: CS_ERR_INVALID_PARAM


pvecm delnode 192.168.0.33
400 Parameter verification failed.
node: invalid format - value does not look like a valid node name

pvecm delnode <node>


pvecm delnode pve-ippri-33
Could not kill node (error = CS_ERR_NOT_EXIST)
Killing node 3



```


```

post-up echo 1 > /proc/sys/net/ipv4/ip_forward
post-up iptables -t nat -A PREROUTING -i vmbr0 -p tcp --dport 11111 -j DNAT --to 192.168.0.1:111
post-down iptables -t nat -D PREROUTING -i vmbr0 -p tcp --dport 11111 -j DNAT --to 192.168.0.1:111

```



## IO Delay

- https://forum.proxmox.com/threads/high-io-delay.89599/
- https://forum.proxmox.com/threads/very-high-io-delay-on-any-load.37693/
- https://forum.level1techs.com/t/zfs-high-i-o-issue-txg-sync-100-and-z-trim-int-60-to-70/163166/38


## Ajuste grub


### Ajustar no arquivo abaixo  o `GRUB_DEFAULT` para `4` E `GRUB_TIMEOUT` para `5`

```
sudo nano /etc/default/grub

```

### Atualizar o grub

```
sudo update-grub

```


## NTP - UBUNTU

### Edite o arquivo de configuração:


```
sudo nano /etc/systemd/timesyncd.conf


```

```
[Time]
NTP=ntp.unesp.br br.pool.ntp.org time.google.com
FallbackNTP=ntp.ubuntu.com

```

### Reiniciar o serviço

```
sudo systemctl restart systemd-timesyncd
```

## Instalar Chrome

```
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && sudo dpkg -i google-chrome* && sudo apt-get -f install
```

## atualizar o sistema


```
sudo apt update && sudo apt upgrade
```

## Alterar nome do computador


https://labriunesp.org/docs/projetos/sistemas/linux/alterar-nome-pc