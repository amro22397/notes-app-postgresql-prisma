export type User = {

    id: string,
  createdAt: Date,
  updatedAt: Date,

  name: string | null | undefined,
  email: string | null | undefined,
  image: string | null | undefined,
  hashedPassword: string | null | undefined,
  lockedPassword: string | null | undefined, 
  
  resetPasswordToken: string | null | undefined,
  resetPasswordExpires: Date | null | undefined,
  resetLockPasswordToken: string | null | undefined,
  resetLockPasswordExpires: Date | null | undefined,
  isVerified: boolean | null | undefined,
  isGoogleUserVerified: boolean | null | undefined,
  verifyToken: string | null | undefined,
  verifyTokenExpires: Date | null | undefined,

} | null


export type Session = {
  user: User | null | undefined
} | null