# Dockerfile.rails

FROM ruby:2.6.6-alpine3.11
MAINTAINER giesbrechtjames@gmail.com

RUN apk add --update --no-cache \
      bash \
      binutils-gold \
      build-base \
      curl \
      file \
      g++ \
      gcc \
      git \
      imagemagick \
      less \
      libstdc++ \
      libffi-dev \
      libc-dev \
      linux-headers \
      libxml2-dev \
      libxslt-dev \
      libgcrypt-dev \
      make \
      netcat-openbsd \
      nodejs \
      openssl \
      pkgconfig \
      postgresql-dev \
      python \
      tzdata \
      yarn
RUN gem install bundler -v 2.1.4

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle config build.nokogiri --use-system-libraries
RUN bundle check || bundle install

COPY package.json yarn.lock ./
RUN yarn install --check-files

COPY . ./
WORKDIR client
RUN yarn install --check-files
RUN yarn build

WORKDIR /app
RUN pwd

ENTRYPOINT ["./entrypoints/docker-entrypoint.sh"]

# FROM: defines what image to start from. We’ll use the official Ruby image as a starting point.
# ARG: specifies build-time argument variables. If your workstation is running Linux, the user and group ids should match between the host and the docker container.
# RUN: executes commands inside the container. In the example, we use it to create a user and group and then to install the Rails gems.
# ENV: defines environment variables.
# WORKDIR: changes the current directory inside the container.
# USER: changes the active user inside the container.
# CMD: defines the program to run when the container starts.
