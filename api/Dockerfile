FROM php:8.3-apache

# Copie tes fichiers PHP dans le dossier public du serveur
COPY . /var/www/html/

# Active mod_rewrite (si tu en as besoin pour des URLs clean)
RUN a2enmod rewrite

# Donne les bons droits
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
# Si tu as besoin d'extensions PHP, tu peux les installer ici