import { API_BASE_URL } from "@/config/UrlBase";
import { UserCreationRequest } from "@/types/request/UserCreationRequest";
import { ResponseData } from "@/types/response/ResponseData";
import { UserCreateResponse } from "@/types/response/UserCreateResponse";
import { UserDetailResponse } from "@/types/response/UserDetailResponse";

const BASE_URL = API_BASE_URL;
export const createUser = async (userData: UserCreationRequest): Promise<ResponseData<UserCreateResponse>> => {
    const response = await fetch(`${BASE_URL}/api/v1/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error('Failed to create user');
    }

    const data: ResponseData<UserCreateResponse> = await response.json();
    return data;
}

export const UserInfo = async (): Promise<ResponseData<UserDetailResponse> | null> => {
    const accessToken = localStorage.getItem('accessToken');  

    if (!accessToken) {
        return null; 
    }

    const response = await fetch(`${BASE_URL}/api/v1/users/info`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    console.log(response)

    if (!response.ok) {
        throw new Error('Failed to fetch user info');
    }

    const data: ResponseData<UserDetailResponse> = await response.json(); 
    return data;
};
