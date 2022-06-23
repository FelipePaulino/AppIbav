import { connectApi } from "../ConnectApi";

class RequestService {
  async getCelulas() {
    const response = await connectApi.get("/celulas.json");

    if (response.data) {
      return response.data;
    } else {
      throw new Error("Algo deu errado na conexão do get");
    }
  }
}

export default RequestService;
