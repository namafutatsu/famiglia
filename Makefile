deploy:
	rsync -avz --delete -e ssh public/build/* myserver:projects/tarot.laflaque.fr/dist/

clean:
	rm -rf public/build

serve: clean
	npx rollup -c -w

dist: clean
	npx rollup -c

test:
	npx jest
