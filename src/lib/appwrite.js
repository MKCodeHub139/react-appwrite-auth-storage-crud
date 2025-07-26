import { Client, Account,Databases ,Storage} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6880c9040024d6803293'); // Replace with your project ID

export const account = new Account(client);
export const databases =new Databases(client)
export const storage =new Storage(client)
export { ID } from 'appwrite';
