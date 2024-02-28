import axios from "axios";

export class EntryService {
    async createEntry({ customer_id, amount, cId, name, aadhar, phone, address="",accountId="cash" }) {
        try {
            if (!amount) {
                throw new Error("Please provide amount");
            }
            let response;
            if (!customer_id) {
                if (!name || !cId || !aadhar || !phone) {
                    throw new Error("Please provide all the required fields");
                }
                if (cId.length < 4) {
                    throw new Error("id should be atleast 4 characters long");
                }
                if (aadhar.length < 12 || isNaN(aadhar)) {
                    throw new Error("Invalid aadhar number");
                }
                if (phone.length < 10) {
                    throw new Error("Invalid phone number");
                }
                response = await axios.post("/api/v1/entry/create", { amount, cId, name, aadhar, phone, address, accountId });
            } else if (customer_id) {
                response = await axios.post("/api/v1/entry/create", { amount, customer_id, accountId });
            } else {
                throw new Error("Invalid request");
            }
            return response.data;
        } catch (error) {
            console.log("Error in entryService.createEntry", error);
            return {status:error.status, message: error.message, data: null};
        }

    }

    async deleteEntry({eId}) {
        try {
            const response = await axios.delete(`/api/v1/entry/delete/${eId}`);
            return response.data;
        } catch (error) {
            console.log("Error in entryService.deleteEntry", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async deleteAllEntries() {
        try {
            const response = await axios.delete("/api/v1/entry/alldelete");
            return response.data;
        } catch (error) {
            console.log("Error in entryService.deleteAllEntries", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async getEntriesByDate({date,page=1,limit=24}) {
        try {
            if (!date) {
                throw new Error("Please provide date");
            }
            const response = await axios.get(`/api/v1/entry/date/${date}?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.log("Error in entryService.getEntriesByDate", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async getAllEntriesByOwnerId({cId,page=1,limit=24}) {
        try {
            if (!cId) {
                throw new Error("Please provide customer id");
            }
            const response = await axios.get(`/api/v1/entry/owner/${cId}?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.log("Error in entryService.getAllEntriesByOwnerId", error);
            return {status:error.status, message: error.message, data: null};
        }
    }
}

export const entryService = new EntryService();