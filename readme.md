# Pokemon Archive

A one-stop location for Pokemon card searching and deck construction.

## Installation

Use yarn to install dependencies. If you do not have yarn already installed, you may install it through the [npm package manager](https://www.npmjs.com) like so:

```bash
npm install --global yarn
```

Otherwise, run **yarn** in order to run dependencies. 

### Vite

This React-based application uses the [Vite framework](https://vitejs.dev) to run the development server and and build the production bundle. It also makes use of [vite-plugin-ssr](https://vite-plugin-ssr.com) to provide additional features such as Server Side Rendering, Filesystem Routing, and Vercel deployment capabilities.

As of now, the Vercel-based application can be viewed through [here](https://pokemon-archive.vercel.app).

### Vercel

Vercel is used to not only deploy the application, but also to run the serverless functions in the background via **vercel dev**. In order to run this command, you must first install vercel globally via the following command:

```bash
yarn global add vercel
```

Afterwards, you can run your the serverless functions along with your frontend build by running:

```bash
yarn local
```


## Running in Development

In order to run this application in develop