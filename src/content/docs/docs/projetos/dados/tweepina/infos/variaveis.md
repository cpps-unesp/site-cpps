---
id: variaveis
title: Documentação TweePInA
sidebar_label: Variáveis
---

## Váriaveis coletadas

Uma descrição completa do modelo de dados da API do twitter pode ser encontrado em [Twitter API v2 data dictionary](https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/) (em inglês)

### id-info.csv

|variavel|tipo de dados|descrição|exemplo|
|--------|---------|---------|---------|
|url||URL especificada no perfil do usuário, se presente|www.linkedin.com/in/fulanodetal|
|public_metrics_followers_count||Contagem de seguidores|115|
|public_metrics_following_count||Contagem de usuários que este perfil segue|2648|
|public_metrics_tweet_count||Contagem total de tweets deste perfil|169|
|public_metrics_listed_count|||4|
|description||Texto presente na descrição do perfil deste usuário, se presente|Ele/him|
|username||Nome de usuário usado para identificar este perfil (`ex: @rafaelrdealmeida`). O campo `username` é único, mas sujeito a mudanças. Normalmente contém no máximo 15 caracteres, mas algumas contas antigas podem conter nomes maiores|rafardealmeida|
|location||Localização especificada no perfil de usuário. Como este campo é de escolha livre, pode não indicar uma localização válida|Terra|
|verified||Indica se este usuário é verificado pelo twitter. Uma conta verificada permite identificar que uma conta de interesse público é autêntica|`False`|
|protected||Indica se este usuário optou por proteger seus Tweets (tornando-os privados)|`False`|
|created_at||Data e horário UTC em que esta conta foi criada|2012-05-18T01:28:27.000Z|
|name||Nome definido pelo usuário em seu perfil. Não necessariamente é um nome pessoal. Normalmente limitado a 50 caracteres, *sujeito a mudanças*|Rafael de Almeida|
|id||Identificador único deste usuário|`583345519`|
|profile_image_url||URL da imagem de perfil, como mostrada no perfil do usuário|https://pbs.twimg.com/profile_images/1281771334142496768/o_wDR0cu_normal.jpg|
|link||Link para este perfil de usuário|https://twitter.com/rafardealmeida|

### id-tweets.csv
|variavel|descrição|exemplo|
|--------|---------|---------|
|author_id|Identificador único do User que postou este tweet|`583345519`|
|created_at|Horário da criação do Tweet|`2022-10-05T12:48:37.000Z`|
|entities_annotations|Entidade: anotações encontradas no tweet|`[{'start': 68, 'end': 73, 'probability': 0.7168, 'type': 'Product', 'normalized_text': 'Google'}]`|
|entities_hashtags|Entidade: hashtags encontradas no tweet|`[{'start': 98, 'end': 115, 'tag': 'quarentenaBrasil'}`|
|entities_mentions|Entidade: citações encontradas no tweet|`[{'start': 0, 'end': 7, 'username': 'prefsp', 'id': '1319636844821217280'}]`|
|entities_urls|Entidade: URLs encontradas no tweet|`[{'start': 0, 'end': 12, 'username': 'rochacbruno', 'id': '14347532'}]","[{'start': 101, 'end': 124, 'url': 'https://t.co/9qJBKw25ly', 'expanded_url': 'https://psono.com/', 'display_url': 'psono.com'}]`|
|id|identificador único do Tweet requisitado|`1438981952254717954`|
|in_reply_to_user_id|Se o tweet representado é uma resposta, este campo conterá o author ID do Tweet original. Nem sempre este será necessariamente o usuário mencionado diretamente no Tweet|`1081615669064552449`|
|lang|Idioma do Tweet, se detectado pelo Twitter. Retornado como uma etiqueta de idioma BCP47|`pt`|
|link|URL do tweet|`https://twitter.com/rafardealmeida/status/1438981952254717954`|
|possibly_sensitive|Este campo indica que o conteúdo [do Tweet] pode ser sensível (conteúdo explícito). Esta etiqueta pode ser atribuída pelo usuário ou pela equipe do Twitter|`False`|
|public_metrics_like_count|Número de likes no tweet|1|
|public_metrics_quote_count|Número de citações ao tweet|0|
|public_metrics_reply_count|Número de respostas ao tweet|0|
|public_metrics_retweet_count|Número de retweets|26|
|referenced_tweets|Uma lista de todos os Tweets mencionados neste Tweet. Por exemplo, se o Tweet pai é um Retweet, um Retweet com comentário ou uma resposta, este campo incluirá o Tweet relacionado, referenciado pelo Tweet pai|`[{'type': 'replied_to', 'id': '1438966744069115904'}]`|
|text|O texto do Tweet em UTF-8. Ver [twitter-text (GitHub)](https://github.com/twitter/twitter-text/) para maiores detalhes acerca de quais caracteres são atualmente considerados válidos|@isparitsa a inter-relação entre a questão indígena e o meio ambiente acredito que convergem e fortificam seus argumentos|