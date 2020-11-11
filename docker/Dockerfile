FROM gitlab-registry.forge.diplomatie.gouv.fr/rece/ci-cd/images_docker/frontal-apache-sp:master
RUN mkdir app \
     && mv target/*.zip app/static.zip \
     && cd app \
     && unzip static.zip \
     && rm static.zip
COPY /app/ /var/www/rece/rece-ui/
