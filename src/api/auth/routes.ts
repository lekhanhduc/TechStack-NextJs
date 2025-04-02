import { API_BASE_URL } from "@/config/UrlBase";
import { SignInRequest } from "@/types/request/SignInRequest";
import { ResponseData } from "@/types/response/ResponseData";
import { SignInResponse } from "@/types/response/SignInResponse";

const BASE_URL = API_BASE_URL;
export const authentication = async (authData: SignInRequest) : Promise<ResponseData<SignInResponse>> => {
    const response = await fetch(`${BASE_URL}/api/v1/auth/sign-in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    })

    if(!response.ok) {
        throw new Error("Authentication failed");
    }

    const data: ResponseData<SignInResponse> = await response.json();
    return data;
}