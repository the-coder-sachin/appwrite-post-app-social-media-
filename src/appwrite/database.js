import { config } from "../config/config";
import { Client, Databases, Storage, ID, Query } from "appwrite";

export class Service  {
    client = new Client;
    databases;
    storage;
    constructor(){
        this.client
        .setEndpoint(config.url)
        .setProject(config.projectId);
        this.databases = new this.databases(this.client);
        this.storage = new this.storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                   title, content, featuredImage, status, userId
                }
            )
        } catch (error) {
            console.log(`create post error : ${error}`);
            
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
      try {
        return await this.databases.updateDocumnent(
            config.databaseId,
            config.collectionId,
            slug,
            {
                title,content,featuredImage,status
            }
        )
      } catch (error) {
        console.log(`update post err: ${error}`);
      }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.collectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log(`delete err : ${error}`);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
             config.databaseId,
             config.collectionId,
             slug
            )
        } catch (error) {
            console.log(`getpost err: ${error}`);
            return false
        }
    }

    async getPosts(Queries = [Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.collectionId,
                Queries,
            )
        } catch (error) {
            console.log(`get Posts err: ${error}`);
            return false;
        }
    }

    // upload services

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(`upload file err: ${error}`);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.bucketId,
                fileId,
            );
            return true
        } catch (error) {
            console.log(`delete file err: ${error}`);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            config.bucketId,
            fileId
        )
    }
}
const service = new Service();
export default service;