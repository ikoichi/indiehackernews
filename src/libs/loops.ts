import axios from "axios";

type CreateUserArgs = {
  email: string;
  firstName: string;
  lastName: string;
  userGroup: string;
};

export const createLoopsContact = ({
  email,
  firstName,
  lastName,
  userGroup,
}: CreateUserArgs) => {
  try {
    axios.post(
      "https://app.loops.so/api/v1/contacts/create",
      {
        email: email,
        firstName,
        lastName,
        userGroup,
        source: "Website",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
        },
      }
    );
  } catch (err) {
    console.error("Error while adding contact to Loops", err);
  }
};
