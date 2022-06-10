# Pokemon Archive

A one-stop location for Pokemon card searching and deck construction.

## Installation

Use yarn to install dependencies. If you do not have yarn already installed, you may install it through the [npm package manager](https://www.npmjs.com) like so:

```bash
npm install --global yarn
```

Otherwise, run **yarn** in order to install dependencies. 

### Vite

This React-based application uses the [Vite framework](https://vitejs.dev) to run the development server and and build the production bundle. It also makes use of [vite-plugin-ssr](https://vite-plugin-ssr.com) to provide additional features such as Server Side Rendering, Filesystem Routing, and Vercel deployment capabilities.

### Vercel

[Vercel](https://vercel.com/) is used to not only deploy the application, but also to locally run backend serverless functions in the background. In order to make use of it in development, you must install vercel globally via the following command:

```bash
yarn global add vercel
```

The deployed application can be viewed through [here](https://pokemon-archive.vercel.app).

## Running in Development

In order to run this application in development, you need to not only run Vite's development's server for the frontend, but you must also run Vercel's serverless functions in the background in order have a working backend API. These two things can be taken care of at the same time by running the **vercel dev** command. This can be done via yarn using the following line:

```bash
yarn local
```

This command works by running a test server for Vercel's serverless functions, and then internally calling whatever command is linked to **yarn dev**, which in this application's case will run the frontend application in Vite's development server.

## Deploying to Production

Deploying to production is very simple. All you have to do is push your most recent (bug-free) changes to the **main** branch of this application's associated git repository. This can be done using this line:

```bash
git push origin main
```

After the latest changes have been pushed to git, Vercel will detect that latest changes in the **main** branch and attempt to build the application on [production](https://pokemon-archive.vercel.app). If everything goes well, you should be able to see the latest changes on there.