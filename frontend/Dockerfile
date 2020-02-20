FROM ubuntu:18.04
RUN apt-get update --fix-missing && apt-get upgrade -y
RUN apt-get install -y curl gnupg git
RUN groupadd -g 1000 app && useradd -m -u 1000 -g app app && chown app:app /home
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get update --fix-missing && apt-get install -y nodejs build-essential
RUN npm install -g @vue/cli --unsafe
WORKDIR /home/frontend
USER app
CMD npm install ; npx vue-cli-service build --watch
