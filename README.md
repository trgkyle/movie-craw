# Heroku deploy
git push heroku main


# Existing Git repository
For existing repositories, simply add the heroku remote
heroku git:remote -a movie-craw


# Run pm2 background

pm2 start pm2.json