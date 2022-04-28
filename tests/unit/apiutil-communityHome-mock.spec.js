import {GetCommunity, GetListingsInCommunity} from "@/utils/apiutil";
import axios from "axios";

jest.mock("axios");

describe("testing mocking of apiutil.js", () => {

    it("check that existing group returns correctly", async () => {

        const expectedResponse = {
            communityId: 4040,
            name: "Fisken i vannet",
            description: "For vi som liker fjell fisk",
            visibility: 1,
            location: "Bergen brygge",
            picture: "fish blub blub"
        };

        axios.get.mockImplementation(() =>
            Promise.resolve({ data: expectedResponse })
        );

        const communityResponse = await GetCommunity(4040);
        expect(communityResponse.name).toBe(expectedResponse.name);
    });
});
