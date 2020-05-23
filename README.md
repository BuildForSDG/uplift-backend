An Express backend API for the uplift loans web app.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b3c40605563f4428a40aeb98552f395f)](https://app.codacy.com/gh/BuildForSDG/uplift-backend?utm_source=github.com&utm_medium=referral&utm_content=BuildForSDG/uplift-backend&utm_campaign=Badge_Grade_Settings)

## About

What is this project about. Ok to enrich here or the section above it with an image. 

Once this repo has been setup on Codacy by the TTL, replace the above badge with the actual one from the Codacy dashboard, and add the code coverage badge as well. This is mandatory.

This is a simple JavaScript starter repo template for setting up your project. The setup contains:

-   Jest: For runnung tests. We strongly recommend that JavaScript projects use Jest.
-   Eslint & Prettier: For formatting code to match ESlint AirBnB coding standard. You might need to install the ESlint and Prettier plugins for your code editor to make the most of these utilities.

## Why

Talk about what problem this solves, what SDG(s) and SGD targets it addresses and why these are imoirtant.

## Usage

How would someone use what you have built, include URLs to the deployed app, service e.t.c when you have it setup.

### Code Structure

This application utilises the concepts of Inversion of Control (IOC) and Dependency Injection
to easily manage dependencies. At the heart of the application is an IOC container within which
dependecies are defined and registered and from which dependencies can be acquired. Implementation logic 
for this IOC container can be located in the container directory located within the project root. This IOC
container relies on providers defined in the providers directory located in projectRoot/app/providers to register dependencies with it for it to be aware of the dependecy relationships that exits throughout the entire application. Finally, to tie everything together and kickstart the application, we have a file named bootstrap.js located within the app/ directory, this file links the providers defined in the providers directory with the container object and voila!!!, uplift fires up it's engines and is now ready to service http requests.  

## Setup

Install `npm` or `yarn` if you dont have any of them already installed. We recommend Yarn though.

After clonning the repo to your local machine and moving into the cloned folder, Run `yarn install` to get started by installing dependencies. 

`src/server.js` is the entry to the project and source code should go into the `src` folder.

All tests should be written in the `__tests__' folder. There's a sample in there.

This API utilises a postgres database for data persistence. To successfully integrate the database with the application, its is therefore, required that you have a database setup. You then need to create a .env file at the project root where you will specify database a connection string environment variable named DATABASE_URL with its values containing required connection details to access the database. A sample configuration file has been provided in the project root with examples on how to go about this.

### Hints

-  Run `npm install` or `yarn install` to get started. We'll assume you are using Yarn.

-  Install additional dependencies: `yarn add <dependency-name> [-D]`.

-  Run tests: `yarn test`.

-  Run tests with test coverage info: `yarn test:cover`.

-  Check the codebase for proper syntax and formatting compliance: `yarn lint`.

-  Run the app in local dev mode: `yarn start`. This starts the app in development mode making it available at 
<http://localhost:port>. The port is the one specified in the .env file containing your environment variables.

## Authors

List the team behind this project. Their names linked to their Github, LinkedIn, or Twitter accounts should siffice. Ok to signify the role they play in the project, including the TTL and mentor.

## Contributing
If this project sounds interesting to you and you'd like to contribute, thank you!
First, you can send a mail to <buildforsdg@andela.com> to indicate your interest, why you'd like to support and what forms of support you can bring to the table, but here are areas we think we'd need the most help in this project :
1.  area one (e.g this app is about human trafficking and you need feedback on your roadmap and feature list from the private sector / NGOs)
2.  area two (e.g you want people to opt-in and try using your staging app at staging.project-name.com and report any bugs via a form)
3.  area three (e.g here is the zoom link to our end-of sprint webinar, join and provide feedback as a stakeholder if you can).

## Acknowledgements

The code structure adopted for this project is based off of ideas put forward by the authors of the blog posts
listed below.

<https://medium.com/@magnusjt/ioc-container-in-nodejs-e7aea8a89600>

<https://codewithhugo.com/express-request-response-mocking>

<https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest>

## LICENSE
MIT
