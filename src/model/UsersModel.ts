export type Users = {
    id: number,
    image: string,
    firstName: string,
    lastName: string,
    age:number,
    gender:string,
    email:string,
    company: {
        name:string,
        title:string
    }
    university:string

}

export type AllUsers = {
    users:Users[],
    total:number,
    skip:number,
    limit:number
}