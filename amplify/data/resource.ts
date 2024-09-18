import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Employee: a
    .model({
      title: a.string(),
      content: a.string(),
      image: a.string(),
      ratings: a.float().array(),
    })
    .authorization((allow) => [allow.owner()]),

  Session: a
    .model({
      title: a.string(),
      content: a.string(),
      image: a.string(),
      ratings: a.float().array(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
