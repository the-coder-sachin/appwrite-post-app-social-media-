import { config } from "../config/config";
import { Client, Account, ID } from "appwrite";
class AuthService {
    client = new Client();
    account;
    constructor(parameters) {
        this.client
        .setEndpoint(config.url)
        .setProject(config.projectId);
        this.account = new Account(this.client);

    }
    async createAccount ( {email, password , name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // call login function
                this.login({email, password})
            }else{
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }
    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw new Error(error);
            
        }
    }
    async getCurrentUser(){
      try {
        return this.account.get()
      } catch (error) {
        throw new Error(error);
      }
      return null
    }
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}
const authService = new AuthService()

export default authService