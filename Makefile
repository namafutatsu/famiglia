deploy:
	rsync -avz --delete -e ssh public/ myserver:projects/tarot.laflaque.fr/dist/
