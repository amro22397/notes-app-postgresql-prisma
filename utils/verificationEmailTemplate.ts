// import { useTranslations } from 'next-intl' 

// const verificationEmail = useTranslations('VerificationEmail');

export const verificationEmailTemplate = (verificationLink: string) => {
  return `
  <html>
<head>
  <style>
    body {
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
  margin: 0;
  padding: 0;

  
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
}

h1 {
  color: #333333;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  margin: 10px 0;
}

p {
  color: #666666;
  line-height: 1.5;
  margin-bottom: 2px;
  margin: 12px 0;
}

.button {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: #9ecdff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin: 12px auto;
  text-align: center;
  width: 170px; /* Added to center the button */
}

.expire-time {
  text-align: center;
  margin-top: 10px;
  color: #999999;
}

.button:hover {
  background-color: #93c7ff;
}
  </style>
</head>
<body>
  <div class="container">
    <h1>Verify Your Email Address</h1>
    <p>
            Thank you for signing up! To complete your registration, please click
      the button below to verify your email address.

    </p>
    <a href=${verificationLink} class="button">Verify Email</a>
    <p class="expire-time">This link will expire in 30 minutes.</p>
  </div>
</body>
</html>
  `
}