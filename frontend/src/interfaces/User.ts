export interface User{
    id?: string,
    first_name :string,
    last_name :string,
    email:string,
    password :string,
    about_me?:string,
    created_at ?:Date,
}