# Docker with HTTPS

Structure:

- nginx
- nestjs (api)
- nextjs (web)

Instalar o mkcert

https://github.com/FiloSottile/mkcert

Criar os certificados localmente

cd ./.docker/nginx/certs
mkcert -key-file key.pem -cert-file cert.pem conciliador.dev \*.conciliador.dev

Instalar

mkcert -install

rodar o projeto

docker-compose up -d
