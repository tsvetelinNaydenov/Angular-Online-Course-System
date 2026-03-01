export interface LoginRequest {
    email: string;
    password: string
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string
}

export interface LoginResponce {
    successful: boolean;
    result: string;
    user: {
        email: string;
        name: string;
    }
}