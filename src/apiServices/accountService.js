import axios from "axios"

export class AccountService {
    async createAccount({name, balance=0}) {
        try {
            if(!name){
                throw new Error("Name is required");
            }
            const response = await axios.post("/api/v1/account/create", {name, balance});
            return response.data;
        } catch (error) {
            console.log("Error in createAccount", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async updateAccount({accountId, balance}) {
        try {
            if(!accountId){
                throw new Error("Account ID is required");
            }
            if(balance === undefined || balance === null || balance === "" || isNaN(balance)){
                throw new Error("Balance is required");
            }
            const response = await axios.patch(`/api/v1/account/update/${accountId}`, {balance});
            return response.data;
        } catch (error) {
            console.log("Error in updateAccount", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async getAccounts() {
        try {
            const response = await axios.get("/api/v1/account/");
            return response.data;
        } catch (error) {
            console.log("Error in getAccounts", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async deleteAccount({accountId}) {
        try {
            if(!accountId){
                throw new Error("Account ID is required");
            }
            const response = await axios.delete(`/api/v1/account/delete/${accountId}`);
            return response.data;
        } catch (error) {
            console.log("Error in deleteAccount", error);
            return {status:error.status, message: error.message, data: null};
        }
    }
}

export const accountService = new AccountService();