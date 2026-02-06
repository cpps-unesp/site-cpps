---
id: tela-preta
title: Tela Preta
sidebar_label: Tela Preta
---
:::tip
As instruções abaixo visam resolver o problema de tela preta no compartilhamento em video conferências 
:::

### Abrir o arquivo custom.conf

```
sudo nano /etc/gdm3/custom.conf  
```

### Descomentar a linha indicada abaixo

Retirar o `#` da linha indicada abaixo

```
#WaylandEnable=false descomentar esta linha 
```

- ctrl+x
- Sim
- Enter

### Reiniciar o computador

```
sudo reboot now
```