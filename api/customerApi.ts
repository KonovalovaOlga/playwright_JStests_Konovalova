import { APIRequestContext, expect } from "@playwright/test";
import { User } from "../types";

export const registerUserViaApi = async (
  request: APIRequestContext,
  user: User
) => {
  const newIssue = await request.post("rest/default/V1/customers", {
    data: {
      customer: {
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName,
      },
      password: user.password,
    },
  });
  const response = await newIssue.json();
  expect(newIssue.status()).toBe(200);
  return { ...user, id: response.id };
};
