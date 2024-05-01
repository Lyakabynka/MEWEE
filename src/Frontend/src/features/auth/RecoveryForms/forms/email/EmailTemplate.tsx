import React from 'react';

interface EmailTemplateProps {
  username: string;
  confirmationLink: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ username, confirmationLink }) => {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20, backgroundColor: '#f9f9f9' }}>
      <div style={{ textAlign: 'center', paddingBottom: 20 }}>
        <h1>Email Confirmation</h1>
      </div>
      <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5 }}>
        <p>Dear {username},</p>
        <p>Thank you for signing up! Please click the button below to confirm your email address:</p>
        <a href={confirmationLink} style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: 5 }}>Confirm Email</a>
        <p>If you didn't sign up for an account, you can ignore this email.</p>
      </div>
    </div>
  );
};

export default EmailTemplate;
