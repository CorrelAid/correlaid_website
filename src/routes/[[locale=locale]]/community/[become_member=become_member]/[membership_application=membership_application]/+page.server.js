import { json } from '@sveltejs/kit';
import { render } from 'svelte-email';
import MembershipApp from "$lib/emails/MembershipApp.svelte";
import nodemailer from 'nodemailer';
import { SECRET_GOOGLE_USER } from '$env/static/private'
import { SECRET_GOOGLE_PW } from '$env/static/private'




/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        console.log("received")
        const data = await request.formData();

        const name =  data.get("name")
        

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: SECRET_GOOGLE_USER,
                pass: SECRET_GOOGLE_PW
            }
        });

        const renda = render({

            template: MembershipApp,
            props: {
                name: name
            }


        });

        const options = {
            from: SECRET_GOOGLE_USER,
            to: "mail@jstet.net",
            subject: 'hello world',
            html: renda
        };

        transporter.sendMail(options, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                // do something useful
            }
        });
    }
};