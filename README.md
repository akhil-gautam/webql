## Requirements:
Ruby 3.0.2

## Setup if you don't use Docker
```bash
git clone git@github.com:akhil-gautam/lowcode-api.git
cd lowcode-api
bundle install
bundle exec rails db:create
bundle exec rails db:migrate
bundle exec rails server
```

## If you can use Docker
```
git clone git@github.com:akhil-gautam/lowcode-api.git
cd lowcode-api
docker-compose build
docker-compose run --rm web web bundle exec rails db:create db:migrate
docker-compose up
```

UI App: https://github.com/akhil-gautam/lowcode-ui
