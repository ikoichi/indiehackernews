import LoopsClient from "loops";

const loops = new LoopsClient(process.env.LOOPS_API_KEY || "");

type CreateUserArgs = {
  email: string;
  firstName: string;
  lastName: string;
  userGroup: string;
};

export const createLoopsContact = async ({
  email,
  firstName,
  lastName,
  userGroup,
}: CreateUserArgs) => {
  try {
    await loops.createContact(email, {
      firstName,
      lastName,
      userGroup,
      source: "Website",
    });
  } catch (err) {
    console.error("Error while adding contact to Loops", err);
  }
};

type SendTransactionalEmail = {
  transactionalId: string;
  email: string;
  dataVariables: Record<string, string>;
};

export const sendTransactionalEmail = async ({
  transactionalId, // your transactional email template id
  email,
  dataVariables,
}: SendTransactionalEmail) => {
  /*
  const dataVariables = {
    loginUrl: "https://myapp.com/login/",
  };
  */
  return await loops.sendTransactionalEmail(
    transactionalId,
    email,
    dataVariables
  );
};
