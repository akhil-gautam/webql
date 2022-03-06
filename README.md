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
<br/>
<h3 align="center">
 Workflow
</h3>

![image](https://user-images.githubusercontent.com/28865023/156912526-3bbce7e6-185a-47e2-9fdf-c13cfa46f25a.png)

<br/>
<h2 align="center">
  Components that are currently supported
</h2>
  
<h4 align="center">Table, Cards, BarChart</h4>

![image](https://user-images.githubusercontent.com/28865023/156908776-51997cf2-9262-44f3-981f-17ff6747333c.png)

<h4 align="center">Forms</h4>

![image](https://user-images.githubusercontent.com/28865023/156911222-d2a132bc-97db-4ae2-a2cb-74b2c82e7942.png)

<br/>

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

## Contribute
Contributors are welcomed! Contributions can be as small as fixing a typo. Please start contributing by creating issues in the repo. 

### !! To be added soon
Please go through our contribution guide.
