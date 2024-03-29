<div align="center">
	<br />
	<p>
		<a href="https://minefort.com/?r=fn6x52xtos"><img src="https://cdn.minefort.com/img/logo-white.svg" width="546" alt="Minefort" /></a>
	</p>
	<br />
	<p>
		<a href="https://www.npmjs.com/package/minefort"><img src="https://img.shields.io/npm/v/minefort.svg?maxAge=3600" alt="npm version" /></a>
		<a href="https://www.npmjs.com/package/minefort"><img src="https://img.shields.io/npm/dt/minefort.svg?maxAge=3600" alt="npm downloads" /></a>
		<a href="https://github.com/google/gts"><img src="https://img.shields.io/badge/code%20style-google-blueviolet.svg" alt="Code Style: Google" /></a>
	</p>
</div>

---

## Table of Contents
<!-- TOC -->
  * [Table of Contents](#table-of-contents)
  * [Notice of Non-Affiliation and Disclaimer](#notice-of-non-affiliation-and-disclaimer)
  * [Affiliate link](#affiliate-link)
  * [Installation](#installation)
  * [Loading the module](#loading-the-module)
    * [ES Modules (ESM)](#es-modules-esm)
    * [CommonJS](#commonjs)
  * [Example usage](#example-usage)
    * [Simple example to get all of your servers](#simple-example-to-get-all-of-your-servers)
    * [Avoiding conflicts](#avoiding-conflicts)
  * [TypeScript](#typescript)
  * [Team](#team)
<!-- TOC -->

## Notice of Non-Affiliation and Disclaimer
We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Minefort.com, or any of its subsidiaries or its affiliates. The official Minefort.com website can be found at https://minefort.com/.

## Affiliate link
You can support this open source project by using the following [affiliate link](https://minefort.com/?r=fn6x52xtos).

## Installation
You can use any package manager you want, but we recommend using `yarn`.

```sh-session
npm install minefort
yarn add minefort
pnpm add minefort
```

## Loading the module
### ES Modules (ESM)
```js
import { Client } from "minefort";
```

### CommonJS
```js
const { Client } = require("minefort");
```


## Example usage

### Simple example to get all of your servers

Create and authenticate a client, and get all of your servers.

```js
const { Client } = require("minefort");

const client = new Client();

(async () => {
  await client.auth("username", "password");
  /**
   * Note:
   * You can also just use your session token to authenticate
   * like this: `client.sessionToken = "sessionToken";`
   */

  const servers = await client.servers.getMyServers();
  console.log(servers);
})();
```

### Avoiding conflicts
Importing another module with the same name will cause conflicts (eg. `discord.js`). This can simply be avoided by renaming the import.
```js
import { Client as Minefort } from "minefort";
// Using CommonJS: "const { Client: Minefort } = require("minefort")"
import { Client } from "discord.js";

// minefort client
const minefort = new Minefort();

// discord.js client
const client = new Client();
```

## TypeScript
Types are bundled with `minefort`, so you do not need to install any additional packages.

## Team
| [![Mullp](https://github.com/Mullp.png?size=100)](https://github.com/Mullp) |
|-----------------------------------------------------------------------------|
| [Mullp](https://github.com/Mullp)                                           |
