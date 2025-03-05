FROM node:23-bookworm
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive \
    apt-get -y install default-jre-headless && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
RUN npx -y playwright@1.50.1 install chrome
CMD ["npx", "playwright", "test"]