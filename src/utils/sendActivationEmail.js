import { mailer } from './mailer.js';

export const sendActivationEmail = (email, activationToken) => {
  const link = `${process.env.SERVER_URL}/auth/activation/${activationToken}`;
  const html = `
    <h1>Account activation</h1>
    <a href="${link}">${link}</a>
  `;

  return mailer.send(email, 'node_auth-app account activation', html);
};
