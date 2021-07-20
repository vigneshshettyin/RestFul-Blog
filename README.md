<h1 align="center">
🌐 RestFul Blog
</h1>
<p align="center">
Featured Blogger is a MERN RestFul API-based multi-user blogging app with markdown support.
</p>

<p align="center">
   <a href="https://app.netlify.com/sites/fervent-cray-ead198/deploys">
      <img src="https://api.netlify.com/api/v1/badges/86b77a65-b4bd-46c0-88d9-37f199985c28/deploy-status" />
   </a>
</p>

> MERN is a full-stack implementation in MongoDB, Express Js, React/Redux, Nodejs

## Clone 
```terminal
$ git clone https://github.com/vigneshshettyin/RestFul-Blog.git
$ yarn install
```

## Project Structure
```terminal
LICENSE
package.json
Back-end/
   package.json
   .env (To Store Secrets)
Front-end/
   package.json
...
```

# Usage

## Prerequirements
- [MongoDB](https://www.mongodb.com/)
- [Node](https://nodejs.org/en/)
- [npm](https://nodejs.org/en/download/package-manager/)
- [yarn](https://yarnpkg.com//)

`Note : Run react and nodejs local server in differnt terminal`

## Front-end Usage (PORT: 3000)
```terminal
$ cd Front-end
$ yarn install
$ yarn start

// Deployment for Front-end app
$ yarn run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ yarn start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## Back-end Usage (PORT: 5000)

### Prepare your secret

`Note : You need to add a TOKEN_SECRET & MongoDB URI in .env`

```terminal
// in the root level
$ echo "TOKEN_SECRET=YOUR_JWT_SECRET" >> ./Back-end/.env
```

### Start

```terminal
$ cd Back-end
$ yarn install
$ yarn dev
```
