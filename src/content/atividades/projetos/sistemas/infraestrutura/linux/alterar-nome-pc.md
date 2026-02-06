---
id: alterar-nome-pc
title: Alterar nome do computador
sidebar_label: Alterar nome do computador
---


### Verificar nome atual

```
hostnamectl status
```

### Novo nome do computador

- substitua `<novo_nome>` pelo nome que deseja dar ao computador

```
hostnamectl set-hostname <novo_nome>
```