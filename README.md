# Description
**Currencyapp** is a simple test Node.js app which gets information about currencies and rates.

## Dependencies
* Node.js

## Instalation

Clone respository from Github

```sh
$ git clone https://github.com/clevermas/currencyapp.git newapp && cd newapp
```

Install Node dependencies

```sh
$ npm install
```

Then just start Node Application

```sh
$ node server
``` 

## API

All API requests you can find in test file: ``` tests/test.js ```

## Authorization

```sh
POST /api/login
```

Your request body must contain ``` password ``` parameter. The key is ``` testkey__ ```. You can change it in config file: ``` server/config/ ```.
Then you will get special token, which you have to send as HTTP header ``` token: <received token> ```.

## Testing

Install Mocha globally

```sh
$ npm install -g mocha
```
Then just execute test

```sh
$ mocha --compilers js:babel-core/register
```

# Version
0.0.0
