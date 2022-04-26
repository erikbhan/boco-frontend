import { getUser } from "@/utils/apiutil";
import axios from "axios";

jest.mock("axios");

describe("testing mocking of apiutil.js", () => {
  it("check that existing user returns correctly", async () => {
    const expectedResponse = { response: "" };
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: expectedResponse })
    );

    const userResponse = await getUser(1);
    expect(userResponse).not.toEqual(expectedResponse);
  });
  it("check that non-existing user returns 404", async () => {
    const expectedResponse = { response: "User not found in DB" };
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: expectedResponse })
    );

    const userResponse = await getUser(100000);
    expect(userResponse).toEqual(expectedResponse);
  });
});
