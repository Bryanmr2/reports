FROM mysql:latest

ENV MYSQL_DATABASE=user
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=your_user_password # Replace with your custom user password, if needed

ADD schema.sql /docker-entrypoint-initdb.d

EXPOSE 3306
