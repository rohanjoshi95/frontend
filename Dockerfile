FROM httpd:alpine
LABEL "project.name"="Flexmoney Assignment"
LABEL "project.tier"="Frontend"
COPY dist/ /usr/local/apache2/htdocs/
RUN chmod -R 755 /usr/local/apache2/htdocs/
EXPOSE 4200
