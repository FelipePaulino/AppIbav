import IAddress from "../../types/initialValues";

const initialValueRegisterUser = {
    name: "",
    phone: "",
    email: "",
    state: "",
    network: "",
    password: "",
    category: "",
    stateCivil: "",
    numberHouse: "",
    numberCelula: "",
}

const initialValuesRequestCep: IAddress = {
    uf: "",
    cep: "",
    ddd: "",
    gia: "",
    ibge: "",
    siafi: "",
    bairro: "",
    logradouro: "",
    localidade: "",
    complemento: "",
}

export { initialValueRegisterUser, initialValuesRequestCep };