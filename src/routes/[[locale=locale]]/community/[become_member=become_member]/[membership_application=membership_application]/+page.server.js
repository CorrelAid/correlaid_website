import { json } from '@sveltejs/kit';
import { render } from 'svelte-email';
import MembershipApp from "$lib/emails/MembershipApp.svelte";
import nodemailer from 'nodemailer';
import { SECRET_GOOGLE_USER } from '$env/static/private'
import { SECRET_GOOGLE_PW } from '$env/static/private'


const transporter = nodemailer.createTransport({
	service: 'gmail',
  auth: {
    user: SECRET_GOOGLE_USER,
    pass: SECRET_GOOGLE_PW
  }
});

// const emailHtml = render({
// 	component: MembershipApp,
// 	props: {
// 		name: 'Svelte'
// 	}
// });

const mailOptions = {
    from: SECRET_GOOGLE_USER,
    to: "mail@jstet.net",
    subject: 'Subject',
    text: "test"
  };

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email');


        console.log(email)

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
           console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              // do something useful
            }
          });
    }
  };