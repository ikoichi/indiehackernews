import { emailFrom } from "@/config";
import mailchimp from "@mailchimp/mailchimp_marketing";
import mailchimpTx from "@mailchimp/mailchimp_transactional";

/*
  Learn more about the MailChimp Marketing API here https://mailchimp.com/developer/marketing/api/
*/

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

type AddMailChimpListMember = {
  email: string;
  firstName: string;
  lastName: string;
  tags: string[];
};

export const addMailChimpListMember = async ({
  email,
  firstName,
  lastName,
  tags = [],
}: AddMailChimpListMember) => {
  try {
    await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_LIST_ID || "",
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
        tags,
      }
    );

    console.log(
      `Successfully added contact "${firstName}" with email "${email}" as an audience member on MailChimp.`
    );
    return true;
  } catch (err) {
    // @ts-ignore
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // @ts-ignore
      console.log(JSON.parse(err?.response?.error?.text).title);
      // @ts-ignore
      console.log(err?.response.data);
      // @ts-ignore
      console.log(err?.response.status);
      // @ts-ignore
      console.log(err?.response.headers);
      // @ts-ignore
    } else if (err?.request) {
      // The request was made but no response was received
      // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // @ts-ignore
      console.log(err?.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error(
        `Error while adding the user "${firstName}" with email "${email}" to MailChimp`,
        err
      );
    }

    return false;
  }
};

/*
  Learn more about the MailChimp Transactional API here https://mailchimp.com/developer/transactional/api/metadata/
*/

type SendTransactionalEmail = {
  to: string[];
  from?: string;
  subject: string;
  text: string;
  html: string;
};

export const sendTransactionalEmail = async ({
  to,
  from = emailFrom,
  subject,
  text,
  html,
}: SendTransactionalEmail) => {
  const mailchimp = mailchimpTx(process.env.MAILCHIMP_API_KEY || "");
  mailchimp.messages.send({
    message: {
      from_email: from,
      to: to.map((email) => ({
        email,
        type: "to",
      })),
      subject,
      text,
      html,
    },
  });
};

type SendTransactionalEmailWithTemplate = {
  to: string[];
  from?: string;
  subject: string;
  mergeTags?: { name: string; content: string }[];
  templateName: string;
  templateContent?: { name: string; content: string }[];
};

export const sendTransactionalEmailWithTemplate = async ({
  to,
  from = emailFrom,
  subject,
  mergeTags = [],
  templateName,
  templateContent = [],
}: SendTransactionalEmailWithTemplate) => {
  const mailchimp = mailchimpTx(process.env.MAILCHIMP_API_KEY || "");
  mailchimp.messages.sendTemplate({
    template_name: templateName,
    template_content: [
      /*
      Required by the API but not used when the template is stored in Mailchimp
      {
        name: "example_name",
        content: "example_content",
      },
      */
      ...templateContent,
    ],
    message: {
      from_email: from,
      to: to.map((email) => ({
        email,
        type: "to",
      })),
      subject,
      // You can also pass merge fields if your template requires them
      global_merge_vars: [
        /*
        {
          name: "merge1",
          content: "merge1 content",
        },
        */
        ...mergeTags,
      ],
    },
  });
};
