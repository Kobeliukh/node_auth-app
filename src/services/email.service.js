import { mailer } from './mailer.js';

export const emailService = {
  sendActivationEmail: (email, activationToken) => {
    const link = `${process.env.SERVER_URL}/auth/activation/${activationToken}`;
    const html = `
    <h1>Account activation</h1>
    <a href="${link}">${link}</a>
  `;

    return mailer.send(email, 'node_auth-app account activation', html);
  },

  sendActivationEmailPending: (email, activationToken) => {
    const link = `${process.env.SERVER_URL}/auth/new-email-confirmation/${activationToken}`;
    const html = `
    <h1>Confirmation of a new email address</h1>
    <a href="${link}">${link}</a>
  `;

    return mailer.send(email, 'node_auth-app new email confirmation', html);
  },

  notifyOldEmail: (oldEmail, newEmail) => {
    const html = `
    <h1>Your email address has been changed</h1>
    <p>
      Hello,
      We have received a request to update the email address associated with your account to ${newEmail}.
    </p>
  `;

    return mailer.send(
      oldEmail,
      'node_auth-app request to change email address',
      html,
    );
  },

  sendPasswordResetConfirmation: (email, confirmationToken) => {
    const link = `${process.env.CLIENT_URL}/auth/password-reset/${confirmationToken}`;
    const html = `
      <h1>Email confirmation</h1>
      <a href="${link}">${link}</a>
    `;

    return mailer.send(email, 'node_auth-app email confirmation', html);
  },
};
