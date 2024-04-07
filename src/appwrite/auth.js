import config from '../config/config'
import { Client,ID,Account } from 'appwrite'

export class AuthServices{
    client = new Client();
    account = null;
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
    }
    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);
             if(userAccount){
                //call another method
                return this.login({email,password})
            }
            else{
                return userAccount;
            }
        }
        catch(error){
            throw error;
        }
    } 

    async login({email,password}){
        try {
            const userData = await this.account.createEmailPasswordSession(email,password);
            return userData;
        } catch (error) {
            console.log("error in login");
            throw error;
        }
    }
    
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("error in getCurrentuser",error);
        }
        return null;
    }
    
    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("error in logout",error);
        }
        return null;
    }

};

const authServices = new AuthServices();

export default authServices;