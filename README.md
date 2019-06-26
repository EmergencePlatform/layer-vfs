# layer-vfs

Provides in-site VFS editing and management for emergence sites hosted on legacy emergence-kernel nodes

## Developing EmergenceEditor

### Dependencies

Install recent versions of [Habitat](http://habitat.sh) and [Docker](https://www.docker.com/) on your Linux, Mac, or Windows workstation.

### Getting Started

All you should need to do is run this command after recrusively cloning this repository:

```bash
HAB_DOCKER_OPTS="-p 1841:1841" hab studio enter -D
```

This launches a Habitat studio via a Docker container with port 1841 opened. Sencha CMD will automatically be installed and launched in watch mode. After things finally settle down, you should see this at the end of your console if everything went correctly:

```console
...
[LOG] Fashion build completed in 1.854 sec.
[LOG] Fashion waiting for changes...
```

You should now be able to open the editor at:

[http://localhost:1841/EmergenceEditor/?apiHost=skelv1-develop.dev01.slatepowered.net](http://localhost:1841/EmergenceEditor/?apiHost=skelv1-develop.dev01.slatepowered.net)

Changes made to `.scss` files under `sencha-workspace/EmergenceEditor/app/` and `sencha-workspace/packages/emergence-console-theme/` should load in the browser automatically a moment after saving.
