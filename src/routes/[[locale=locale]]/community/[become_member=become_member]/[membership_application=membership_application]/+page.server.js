import {render} from 'svelte-email';
import MembershipApp from '$lib/emails/MembershipApp.svelte';
import nodemailer from 'nodemailer';
import {SECRET_GOOGLE_USER} from '$env/static/private';
import {SECRET_GOOGLE_PW} from '$env/static/private';
import {SECRET_TURNSTILE_KEY} from '$env/static/private';
import {fail} from '@sveltejs/kit';

async function validateToken(token, secret) {
  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        response: token,
        secret: secret,
      }),
    },
  );

  const data = await response.json();

  return {
    // Return the status
    success: data.success,

    // Return the first error if it exists
    error: data['error-codes']?.length ? data['error-codes'][0] : null,
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({request}) => {
    const data = await request.formData();

    const {success, error} = await validateToken(
      data.get('turnstile'),
      SECRET_TURNSTILE_KEY,
    );

    if (!success) {
      console.error(error);
      return fail(404, {turnstile_error: error});
    }

    const name = data.get('name');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SECRET_GOOGLE_USER,
        pass: SECRET_GOOGLE_PW,
      },
    });

    const renda = render({
      template: MembershipApp,
      props: {
        name: name,
      },
    });

    const options = {
      from: SECRET_GOOGLE_USER,
      to: 'mail@jstet.net',
      subject: 'hello world',
      html: renda,
    };

    transporter.sendMail(options, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        // do something useful
      }
    });
  },
};
