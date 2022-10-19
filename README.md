# Docker with HTTPS

Structure:

- nginx
- nestjs (api)
- nextjs (web)

Instalar o mkcert

https://github.com/FiloSottile/mkcert

Criar os certificados localmente

cd ./.docker/nginx/certs
mkcert -key-file key.pem -cert-file cert.pem docker-ssl.dev \*.docker-ssl.dev

Instalar

mkcert -install

rodar o projeto

docker-compose up -d

Adicionar os host à maquina
https://phoenixnap.com/kb/how-to-edit-hosts-file-in-windows-mac-or-linux

no caso seria:
127.0.0.1 docker-ssl.dev
127.0.0.1 api.docker-ssl.dev
