import mailchimp from "@mailchimp/mailchimp_marketing";

type AddUserToMailChimp = {
  email: string;
  userName: string;
};

export const addUserToMailChimp = async ({
  email,
  userName,
}: AddUserToMailChimp) => {
  try {
    await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_LIST_ID || "",
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: userName,
        },
        tags: ["free_trial"],
      }
    );

    console.log(
      `Successfully added contact "${userName}" with email "${email}" as an audience member on MailChimp.`
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
        `Error while adding the user "${userName}" with email "${email}" to MailChimp`,
        err
      );
    }

    return false;
  }
};
