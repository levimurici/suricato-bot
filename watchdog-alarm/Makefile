.PHONY: help
.DEFAULT_GOAL := help

DOCKER=$(shell which docker)
REPOSITORY?=dendebaiano/suricato-wd-bot
VERSION?=1.1.0
APILOCALHOST?=api
APILOCALPORT?=3000
BOT_TOKEN?=5048613373:AAHIUMeg9EC5HWYTecDWJqoxYGNfxMbO-54


image: ## build the docker image from Dockerfile
	$(DOCKER) build --no-cache -t ${REPOSITORY}:${VERSION} \
        --build-arg VERSION=${VERSION} \
        --build-arg LOCALHOST=${APILOCALHOST} \
        --build-arg LOCALPORT=${APILOCALPORT} \
        --build-arg BOT_TOKEN=${BOT_TOKEN} \
        --build-arg VCS_REF=`git rev-parse --short HEAD` \
        --build-arg BUILD_DATE=`date -u +"%Y-%m-%dT%H:%M:%SZ"` . && \
        $(DOCKER) push ${REPOSITORY}:${VERSION}

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'