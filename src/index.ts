import {Client} from './lib';

export * from './lib';
export * from './managers';

const client = new Client();

client.authManager.auth('yes', 'no');
