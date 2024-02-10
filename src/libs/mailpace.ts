import * as MailPace from "@mailpace/mailpace.js";

const client = new MailPace.DomainClient(process.env.MAILPACE_API_KEY || "");

type SendTransactionalEmail = {
  from: string;
  to: string;
  subject: string;
  htmlbody: string;
};

export const sendTransactionalEmail = ({
  from,
  to,
  subject,
  htmlbody,
}: SendTransactionalEmail) =>
  client.sendEmail({
    from,
    to,
    subject,
    htmlbody,
  });
