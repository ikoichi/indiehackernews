require("dotenv").config();

console.warn(
  "\x1b[94m\x1b[1m==>> Shipped Environment variables check \x1b[0m\x1b[49m"
);

if (!process.env.DATABASE_URL) {
  console.warn("|| No \x1b[33mDATABASE_URL\x1b[0m environment variable set");
  console.warn("|| Configure it to handle authentication");
  console.warn("|| Docs page: https://docs.shipped.club/features/database");
  console.warn("=============================================");
}

if (!process.env.NEXTAUTH_URL) {
  console.warn("|| No \x1b[33mNEXTAUTH_URL\x1b[0m environment variable set");
  console.warn("|| Authentication will not work");
  console.warn(
    "|| Docs page: https://docs.shipped.club/features/authentication#setup"
  );
  console.warn(
    "==========================================================================="
  );
}

if (!process.env.NEXTAUTH_SECRET) {
  console.warn("|| No \x1b[33mNEXTAUTH_SECRET\x1b[0m environment variable set");
  console.warn("|| Authentication will not work");
  console.warn(
    "|| Docs page: https://docs.shipped.club/features/authentication#setup"
  );
  console.warn(
    "==========================================================================="
  );
}

if (!process.env.MAILPACE_EMAIL_SERVER) {
  console.warn(
    "|| No \x1b[33mMAILPACE_EMAIL_SERVER\x1b[0m environment variable set"
  );
  console.warn("|| Magic Link emails will not work");
  console.warn(
    "|| Docs page: https://docs.shipped.club/features/authentication#magic-links"
  );
  console.warn(
    "==========================================================================="
  );
}

if (!process.env.EMAIL_FROM) {
  console.warn("|| No \x1b[33mEMAIL_FROM\x1b[0m environment variable set");
  console.warn(
    "|| Docs page: https://docs.shipped.club/features/authentication#magic-links"
  );
  console.warn(
    "==========================================================================="
  );
}

if (!process.env.GOOGLE_CLIENT_ID) {
  console.warn(
    "|| No \x1b[33mGOOGLE_CLIENT_ID\x1b[0m environment variable set"
  );
  console.warn("|| Google Authentication will not work");
  console.warn(
    "|| Docs page: https://docs.shipped.club/features/authentication#google-auth"
  );
  console.warn(
    "==========================================================================="
  );
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  console.warn(
    "|| No \x1b[33mGOOGLE_CLIENT_SECRET\x1b[0m environment variable set"
  );
  console.warn("|| Google Authentication will not work");
  console.warn(
    "|| Docs page: https://docs.shipped.club/features/authentication#google-auth"
  );
  console.warn(
    "==========================================================================="
  );
}

if (!process.env.LEMONSQUEEZY_WEBHOOK_SECRET) {
  console.warn(
    "|| No \x1b[33mLEMONSQUEEZY_WEBHOOK_SECRET\x1b[0m environment variable set"
  );
  console.warn("|| Payments will not work");
  console.warn("|| Docs page: https://docs.shipped.club/features/payments");
  console.warn(
    "==========================================================================="
  );
}

console.warn(
  "\x1b[94m\x1b[1m==>> Shipped Environment variables check complete\x1b[0m\x1b[49m"
);
