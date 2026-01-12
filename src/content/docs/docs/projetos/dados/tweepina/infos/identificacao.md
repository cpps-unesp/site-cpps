---
id: identificacao-status
title: Documentação Tweepina
sidebar_label: Identificação de Status
---

## Como saber se um Status é um tweet, retweet ou um retuite comentado


- Quando o status é uma quote - retuite comentado - haverá a marcação
  `'is_quote_status': True,`

  No json, o campo retweeted será False

- Quando o status é um retweet, haverá a marcação
  `'retweeted': True,`

- Caso tanto retweeted quando is_quote_status forem False, o tweet é original.

### Verificar status_permalink

Se tweet possui um quoted_status_permalink
verificar se todos os quotes tem um quoted_status_permalink
Criar excessão quando é esse tipo de tweets
Decidir se isso será enquadrado como retweet ou quote

- Decisão: Criar a categoria Retweet de quoted_text - **retweet align**

Tanto no caso de quotes quanto de retweets, os objetos Status trazem consigo -mações tanto do original quanto do citado ou retuitado.

### Lista de variáveis


```
in_reply_to_user_id
text
author_id	id
created_at

id == id (default) --> OK
content == text (default) --> OK
user_id == author_id --> OK
num_likes == public_metrics.like_count --> OK
num_retweets == public_metrics.retweet_count --> OK
hashtags == entities.hashtags.tag --> ok
mentions == entities.mentions.username --> ok
retweeted == referenced_tweets.type --> ok 
is_quote_status == referenced_tweets.type --> ok
== lang --> Ok
== possibly_sensitive -->
timezone == created_at --> ok
created_at == created_at --> ok 
urls == media.fields -->ok
link == entities.urls.unwound_url --> ok (pego pela montagem da url)
place == includes.places -- pendente - https://twittercommunity.com/t/problem-with-include-extentions-to-a-request/153168 -- ok
geo == geo.coordinates.coordinates '' -- pendente - para o futuro
```

### Sobre country Codes

- https://blog.twitter.com/developer/en_us/a/2012/more-changes-withheld-content-fields.html