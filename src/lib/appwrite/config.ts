import { Client, Account, Databases, Storage, Avatars } from "appwrite"

export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECTID,
    dataBaseID: import.meta.env.VITE_APPWRITE_DATABASEID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,

}

export const client = new Client();
client
    .setEndpoint(appwriteConfig.url)
    .setProject(appwriteConfig.projectId);


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
