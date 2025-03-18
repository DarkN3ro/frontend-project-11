dev:
	npx webpack serve --mode development

install:
	npm ci

build:
	npx webpack --mode production

lint:
	npx eslint .
