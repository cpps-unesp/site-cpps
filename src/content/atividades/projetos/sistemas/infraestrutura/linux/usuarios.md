---
id: usuarios
title: Usuários
sidebar_label: Usuários
---


### Criar usuário

```
sudo adduser <nome_usuário>
```

### Trocar de usuário

```
su <nome_usuário>
```

### Terminar todos os processos do usuário

```
sudo kill -9 `ps -fu lantri_marcelo |awk '{ print $2 }'|grep -v PID`
```

### Recuperar senha do usuário root

- [Recuperar senha de root do Linux](https://duzeru.org/pt/blog/recuperar-senha-de-root-do-linux)

- [Como recuperar a senha do usuário root usando uma live distro](https://www.vivaolinux.com.br/artigo/Como-recuperar-a-senha-de-root-usando-uma-live-distro?pagina=1)