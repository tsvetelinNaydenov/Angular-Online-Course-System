export interface Course {
    id: string,
    title: string,
    description: string,
    creationDate: string,
    duration: number,
    authors: string[],
    authorNames?: string[]
}

export interface Author {
    id: string,
    name: string
}

export interface SuccessfulRequest<T> {
    successful: boolean,
    result: T
}

export interface FailedRequest {
    successful: false,
    result: string
}