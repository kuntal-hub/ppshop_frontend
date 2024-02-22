import axios from "axios";

export class BalanceService {
    async updateBalance({fiveh=0, twoh=0, oneh=0, fifty=0, twenty=0, ten=0, others=0}) {
        try {
            const response = await axios.patch("/api/v1/balance/update", {fiveh, twoh, oneh, fifty, twenty, ten, others});
            return response.data;
        } catch (error) {
            console.log("Error in updateBalance", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async getBalance() {
        try {
            const response = await axios.get("/api/v1/balance/");
            return response.data;
        } catch (error) {
            console.log("Error in getBalance", error);
            return {status:error.status, message: error.message, data: null};
        }
    }
}

export const balanceService = new BalanceService();