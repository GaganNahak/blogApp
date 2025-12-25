import conf from "../conf/conf";
import {Client,ID,Databases,Storage,Query,Account} from 'appwrite'

export class Services{
    client=new Client();
    account
    databases
    bucket
    constructor(){
         this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
                this.account=new Account(this.client)
                this.databases=new Databases(this.client)
                this.bucket=new Storage(this.client)
    }
    //post related services
    async createPost({title,slug,content,featuredimage,status,userid}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                title,content,featuredimage,status,userid
            })
        } catch (error) {
            console.error(error);
            
        }
    }

    async updatePost({title,slug,content,featuredimage,status,userid}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                title,featuredimage,content,status,userid
            })
        } catch (error) {
            console.error(error);
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
            return true
        } catch (error) {
            console.error(error);
            return false
            
        }
    }

    async getPost(slug){
        try {
          return  this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
        } catch (error) {
            console.error(error);
        }
    }

        async getPosts(queries=[Query.equal("status","active")]){
            try {
                return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries)
            } catch (error) {
                console.error(error);
            return false
            }
        }
// file related services
        async uploadFile(file){
            try {
                return await this.bucket.createFile(
                    conf.appwriteBucketId,
                    ID.unique(),
                    file
                    //  ["read('any')"]
                )
            } catch (error) {
                 console.error(error);
            return false
            }
        }

         async deleteFile(fileId){
            try {
                await this.bucket.deleteFile(conf.appwriteBucketId,fileId)
            } catch (error) {
                console.error(error);
            return false
            }
         }

          getFilePreview(fileId){
            // console.log("Getttinng");
            
            return this.bucket.getFileView(conf.appwriteBucketId,fileId)
         }

}

const service =new Services()

export default service