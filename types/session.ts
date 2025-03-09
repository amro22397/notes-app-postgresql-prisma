export type Session = {
    user : {
       "_id": string,
    "name": string,
    "email": string,
    "isVerified": boolean,
    "createdAt": string,
    "updatedAt": string,
    "__v": number,
    "resetPasswordExpires": string,
    "resetPasswordToken": string,
    "hashedPassword": string,
    "lockedPassword": string,
    }
}