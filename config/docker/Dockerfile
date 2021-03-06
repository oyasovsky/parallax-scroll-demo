FROM ubuntu:latest

# Adding user `node`
RUN groupadd --gid 1000 node \
  && useradd --uid 1000 --gid node --shell /bin/bash --create-home node

# Copying Project from Local
COPY ./ /home/node
WORKDIR /home/node

# Installing OS Dependecies
RUN set -ex \
    && apt-get update \
    && apt-get -y install wget curl bash build-essential libssl-dev libffi-dev xvfb gtk2-engines-pixbuf vim default-jdk xfonts-100dpi xfonts-75dpi xfonts-cyrillic dbus-x11 git=1:2.7.4-0ubuntu1.2

# Adding Google Chrome
RUN set -ex \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'

# Adding NodeJs
RUN  set -ex \
    && cd /home/node/ \
    && curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh \
    && chmod 755 nodesource_setup.sh \
    && ./nodesource_setup.sh


# Installing 3rd Party Dependencies
RUN  set -ex \
    && apt-get update \
    && apt-get -y install python2.7 nodejs google-chrome-stable \
    && ln -s /usr/bin/python2.7 /usr/bin/python \
    && update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10

# Docker Entrypoint script
RUN set -ex \
    && cp /home/node/config/docker/docker-entrypoint.sh /usr/local/bin/ \
    && chmod 755 /usr/local/bin/docker-entrypoint.sh 

# Installing App Dependencies
RUN set -ex  \
    && rm -rf package-lock.json \
    && npm install  \
    && npm rebuild node-sass
    # && npm install gulp-cli protractor \
    # && ./node_modules/.bin/gulp driver-update 
    
# ENTRYPOINT ["docker-entrypoint.sh"]

# CMD ["app:test"]
CMD ["npm", "run", "serve:jit"]