# Vercel + esbuild issue repro

See https://github.com/vercel/vercel/issues/7287

## Running locally

```
yarn install
yarn build
yarn dev
```

Note the code is successfully transformed by esbuild.

## Running on Vercel

See https://vercel-esbuild-repro.vercel.app

```
Error: The package "esbuild-linux-64" could not be found, and is needed by esbuild.

If you are installing esbuild with npm, make sure that you don't specify the
"--no-optional" flag. The "optionalDependencies" package.json feature is used
by esbuild to install the correct binary executable for your current platform.
    at generateBinPath (/var/task/output/server/pages/node_modules/esbuild/lib/main.js:1816:15)
    at esbuildCommandAndArgs (/var/task/output/server/pages/node_modules/esbuild/lib/main.js:1872:31)
    at ensureServiceIsRunning (/var/task/output/server/pages/node_modules/esbuild/lib/main.js:2034:25)
    at transform (/var/task/output/server/pages/node_modules/esbuild/lib/main.js:1929:37)
    at loader (/var/task/output/server/pages/api/index.js:4804:33)
    at processTicksAndRejections (internal/process/task_queues.js:95:5)
    at Object.callRouteLoader (/var/task/output/server/pages/node_modules/@remix-run/server-runtime/data.js:77:14)
```
