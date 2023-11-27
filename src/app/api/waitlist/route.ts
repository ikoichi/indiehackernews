// import { createLoopsContact } from "@/libs/loops";
// import { addMailChimpListMember } from "@/libs/mailchimp";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  result: boolean;
};

export async function POST(req: Request) {
  const body = await req.json();
  const email = body.email;
  if (email) {
    /* 
    addMailChimpListMember({
      email,
      firstName: "",
      lastName: "",
      tags: ["waitlits"],
    }); 
    */
    /* 
    createLoopsContact({
      email,
      firstName: "",
      lastName: "",
      userGroup: "Waitlist",
    }); 
    */
  }

  return Response.json({ result: true });
}
