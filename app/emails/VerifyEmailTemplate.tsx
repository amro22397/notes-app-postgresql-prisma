import React from 'react'
import { Container, Heading, Html, Link, Section, Tailwind, Text } from '@react-email/components'
// import './VerifyEmailTemplate.css'

const VerifyEmailTemplate = (verificationLink: string) => {
  return (
    <Html>
{/* <Head>
  <style>
    
  </style>
</Head> */}

<Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
            },
          },
        },
      }}
    >


<Container className='flex justify-center items-center'
style={{ fontFamily: 'Arial' }}>
  <Section className="max-w-[600px] mx-auto px-[20px] py-2 bg-[#ffffff] rounded-[10px] shadow-md mt-[50px]">
    <Heading as="h1" className='text-[#333333] text-center text-[22px] font-[600] mx-[0px] my-[10px]'>Verify Your Email Address</Heading>
    <Text className='text-[#666666] leading-[1.5] mb-[2px] mx-[12px]'>
            Thank you for signing up! To complete your registration, please click
      the button below to verify your email address.

    </Text>
    <Link href={verificationLink} className="block mx-auto my-[12px] py-[15px] bg-[#61a9f6] text-white
    text-[16px] font-semibold rounded-[5px] text-center w-[170px] hover:bg-[#93c7ff]">Verify Email</Link>
    <Text className="text-center mt-[10px] text-[#999999] text-[15px]">This link will expire in 30 minutes.</Text>
  </Section>
</Container>

</Tailwind>
</Html>
  )
}

export default VerifyEmailTemplate
