import config from "../config/config"
import { Client, ID, Storage, Databases, Query, Permission, Role } from "appwrite"
export class Service {
    client = new Client()
    database;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.database.createDocument(
                config.appwriteDataBaseId, 
                config.appwriteCollectionId, 
                slug,
                {
                        title,
                        status,
                        userId,
                        featuredImage,
                        content
                },
                [
                    Permission.read(Role.any()),
                    Permission.update(Role.any()),
                    Permission.update(Role.any()),
                  ]
            )
        } catch (error) {
            console.log("error in createPost", error)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.database.updateDocument(config.appwriteDataBaseId, config.appwriteCollectionId, slug, { //slug as unique id
                title,
                content,
                featuredImage,
                status,
            })
        } catch (error) {
            console.log("error in update post", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(config.appwriteDataBaseId, config.appwriteCollectionId, slug)
            return true
        } catch (error) {
            console.log("error in delete post", error);
            return false;
        }
    }
    async getPost(slug) {
        try {
            return await this.database.getDocument(config.appwriteDataBaseId, config.appwriteCollectionId, slug)
        } catch (error) {
            console.log("error in get post", error);
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.database.listDocuments(config.appwriteDataBaseId, config.appwriteCollectionId, queries)
        } catch (error) {
            console.log("error in get all post", error);
        }
    }

    //file upload methods

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(config.appwriteBucketId, ID.unique(), file)
        } catch (error) {
            console.log("error in upload file", error);
            return false;
        }
    }
s
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(config.appwriteBucketId, fileId)
            return true;
        } catch (error) {
            console.log("error in delete file", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(config.appwriteBucketId, fileId)
    }
}
const service = new Service();
export default service;