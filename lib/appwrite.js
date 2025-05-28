
import { Account, Avatars, Client, ID, Databases, Query, Storage } from 'react-native-appwrite';

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.abhi.frameflow",
  projectId: "6796192f00137efbc66c",
  databaseId: "67961be400224c5283ed",
  userCollectionId: "67961c23002859b2a958",
  videoCollectionId: "67961c55003d3f21816b",
  storageId: "67961dc0000df3d3c262",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);
    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(username);
    await signin(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountid: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error.message);
  }
};

export async function signin(email, password) {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const activeSession = await account.getSession("current");
    if (!activeSession) throw new Error("No active session. Please log in again.");

    const user = await getAccount();
    if (!user) throw new Error("User is not logged in");

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountid", user.$id)]
    );

    return currentUser.documents[0] ?? null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export async function signout() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );
    return posts.documents;
  } catch (error) {
    console.error("Error fetching all posts:", error);
    throw new Error(error.message);
  }
};

export const uploadFile =  async ( file,type) => {
  if(!file)
    return;
    const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  }
  try{
    const uploadedfile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedfile.$id,type);
    return fileUrl;

  }catch(error)
  {
    throw new Error(error);
  }
}

export const getFilePreview =async(fileID,type) =>
  {
    let fileUrl;
    try
    {
     if(type === 'video')
      fileUrl =storage.getFileView(config.storageId,fileID)
    else if(type === 'image')
      fileUrl = storage.getFilePreview(config.storageId,fileID , 2000,2000,'top',100)
    else 
    throw new Error('invalid file type');
  
    if(!fileUrl)
      throw Error;
  
    return fileUrl;
    }
    catch(error)
    {
      throw new Error(error);
    }
}

export const createVideo = async(form)=>{
    try
    {
      const [thumbnailUrl,videoUrl] = await Promise.all([
           uploadFile(form.thumbnail,"image"),
           uploadFile(form.video, "video"),
      ])
  
      const newPost = await databases.createDocument(
        config.databaseId,config.videoCollectionId,ID.unique(),{
          title: form.title,
          thumbnail: thumbnailUrl,
          video: videoUrl,
          prompt: form.prompt,
          creator: form.userId,
        }
      )
  
      return newPost;
  
    }
    catch(error)
    {
      throw new Error(error)
    }
}

export async function getallpost() {
  try{
    const posts = await databases.listDocuments(
    config.databaseId,
    config.videoCollectionId);
    return posts.documents;
  }
  catch (error) {
    throw new Error(error);
  }

}

export async function getuserpost(userId)
{
  try{
    const posts =  await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("creator",userId)]
    );
    return posts.documents;
  }
  catch (error) {
    throw new Error(error);
  }
}
 
export async function searchPost (query) {
  try
  {
    const posts = await databases.listDocuments(
config.databaseId,
config.videoCollectionId,
[Query.search("title",query)]
    );
    if(!posts)
      throw new Error("Something went wrong");
    return posts.documents;
  }
  catch(error)
  {
    throw new Error(error);
  }

  }

export const getLatestPost = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );
    return posts.documents;
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    return [];
  }
};





