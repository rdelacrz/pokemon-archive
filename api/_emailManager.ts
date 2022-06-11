import fetch from 'node-fetch';

export const sendEmail = async (toEmail: string, subject: string, body: string, firstName?: string, lastName?: string) => {
  const name = [firstName, lastName].filter(n => !!n?.length).join(' ');

  const bodyParams = {
    sender: {
      name: 'Pokemon Archive',
      email: 'no-reply@pokemon-archive.com',
    },
    to: [  
      {  
        email: toEmail,
        name,
      },
    ],
    subject,
    htmlContent: body,
  }
  
  return await fetch(
    process.env.SENDINBLUE_API_URL || '',
    {
      method: 'POST',
      headers: {
        'api-key': process.env.SENDINBLUE_API_KEY || '',
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(bodyParams),
    }
  );
}