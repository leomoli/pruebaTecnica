export type OneUser ={
    image: string,
    username: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    age:number,
    bloodGroup:string,
    gender:string,
    email:string,
    phone: string,

    address: {
        address:string,
        city: string,
        state: string,
        country: string
    },

    company: {
        department:string,
        name:string,
        title:string
    },
    university:string
}

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