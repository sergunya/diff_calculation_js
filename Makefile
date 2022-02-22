install:
	npm ci

brain-games:
	node bin/brain-games.js

publish:
	npm publish --dry-run

make lint:
	npx eslint .

make test:
	NODE_OPTIONS=--experimental-vm-modules npx jest --collect-coverage
