# **POC - Docker with HTTPS**

> `POC feita para testar uma aplicação rodando com https localmente`

> Neste projeto já tem uma chave válida até fim de 2023, mas se quiser gerar uma nova só seguir a parte de `como criar o certificado`, voce só precisa ter 1 certificado e ele ficará valido por 1 ano... vale lembrar que só vai funcionar para os dominios no momento da criação, se for fazer isso em outro projeto ai terá que gerar outro certificado pois o certificado aqui valem para o docker-ssl.dev

> Na hora que for importar o certificado no navegador a senha será: `123456`

A poc consistem em:

- um api feita em nestjs (node)
- um site feito em nextjs (node)
- nginx como proxy reverso

Então, no final:

- quando eu acessar `docker-ssl.dev` será aberto o site com https
  - lembrando que `docker-ssl.dev` é `localhost:3000`
- quando eu acessar `api.docker-ssl.dev` será aberto o api com https
  - lembrando que `api.docker-ssl.dev` é `localhost:4000`

---

## **Rodando o projeto**

Para rodar o projeto faça: `docker-compose up -d`

Após isso importe o certificado (`.docker/nginx/certs/cert.p12`) no chrome ou no seu navegador

https://support.securly.com/hc/en-us/articles/206081828-How-do-I-manually-install-the-Securly-SSL-certificate-in-Chrome-

---

## **Mapear os certificados no NGINX**

Com os certificados criados, vamos mapear a pasta `.docker/nginx/certs` para dentro do container do nginx em `/etc/ssl/` (verificar o docker-compose.yml)

Depois no `nginx.conf` falamos onde está os certificados (cert.pem, key.pem) e deixamos ele escutando na porta 443 (https) (verificar o .docker/nginx/nginx.conf)

---

## **Como criar o certificado:**

> O jeito mais simples foi usando o `mkcert`

Instalar o mkcert

https://github.com/FiloSottile/mkcert

```bash
cd ./.docker/nginx/certs
mkcert -key-file key.pem -cert-file cert.pem docker-ssl.dev *.docker-ssl.dev
```

Esses certificados serão utilizados pelo `nginx`

Para o navegador reconhecer precisamos gerar um outro arquivo (`.p12`) a partir desses dois.

Para gerar o arquivo `cert.p12`, precisamos fazer os comandos abaixo:

```sh
cp key.pem key.key
cp cert.pem cert.crt

openssl pkcs12 -export -inkey ./key.key -in ./cert.crt -out ./cert.p12
```

> depois pode apagar o .key .crt

---

### **Adicionar os host à maquina**

https://phoenixnap.com/kb/how-to-edit-hosts-file-in-windows-mac-or-linux

No caso seria:

```
127.0.0.1 docker-ssl.dev
127.0.0.1 api.docker-ssl.dev
```
