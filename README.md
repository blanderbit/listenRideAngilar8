# Listnride new Frontend (Angular)

## Prerequisites
Required software: `npm`, `node`

## Install
```bash
$ git clone git@github.com:listnride/listnride-frontend-new.git
$ npm ci
$ cp env.example.txt .env
$ npm run config
```

## Development server

Run `ng serve` or `npm run start1` for a dev server. Navigate to `http://localhost:4200/`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Check and fix linting errors

Run `npm run github-checks` to check if your code is ready to be pushed. 
To auto fix some of errors try `npm run prettier-fix` and/or `npm run lint-fix`

Our linter rules are mainly inspired by [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## Tips


BUG: Hot Reload not responding to changes on components
```bash
sudo sysctl fs.inotify.max_user_watches=524288
sudo sysctl -p --system
```
