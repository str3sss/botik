FROM node:lts-alpine AS deps

# Create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

RUN apk add --no-cache curl bash
RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:${PATH}"
RUN bun --version

# Copy source files
COPY . /usr/src

# Install dependencies and build project
RUN bun install

EXPOSE 3000
CMD bun start
