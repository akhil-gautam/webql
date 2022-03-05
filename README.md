[![GitHub issues](https://img.shields.io/github/issues/akhil-gautam/lowcode-ui?style=flat-square)](https://github.com/akhil-gautam/lowcode-ui/issues)

<!-- https://img.shields.io/github/forks/akhil-gautam/lowcode-ui?style=flat-square

https://img.shields.io/github/stars/akhil-gautam/lowcode-ui?style=flat-square

https://img.shields.io/github/license/akhil-gautam/lowcode-ui?style=flat-square -->


<h1 align="center">
  WebQL
</h1>

<h3 align="center">
  A barebone low-code platform that just works without any hustle.
</h3>

<p align="center">
  WebQL has a different take on the low-code solution, you can create muti-page web-apps which would totally resemble a custom codeline 🎊 🎉
</p>

<br/>
<br/>

<p align="center">
  
![pika-2022-03-02T07_22_54 954Z](https://user-images.githubusercontent.com/28865023/156314722-7697f8ee-8684-4c27-a30f-450d929edc11.png)
  <br/>
</p>

## Local development

### Manual setup
- **Ruby 3.0.2**
- **Node 16.14.0**

```bash
git clone git@github.com:akhil-gautam/webql.git

cd webql

bundle install

# install packages of client and traverse back to root
cd client && npm install && cd ..

# create & migrate database
bundle exec rails db:create db:migrate

# start the application
foreman start -f Procfile.dev
```

### Quickstart with docker
```bash
git clone git@github.com:akhil-gautam/webql.git

cd webql

docker-compose up
```
