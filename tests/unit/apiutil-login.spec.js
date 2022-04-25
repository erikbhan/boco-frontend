import { doLogin } from '@/utils/apiutil'

describe('testing apiutil.js', () => {
    it('test API call utility function - login Success', async () => {
        const loginRequest = { username:"test@test.com", password: "hei" };
        const loginResponse = await doLogin(loginRequest);
        const expectedLoginResponse = "Login failed";
        expect(loginResponse).not.toEqual(expectedLoginResponse);
    })
    it('test API call utility function - login Fail', async () => {
        const loginRequest = { username:"failed@failed.com", password: "failed123" };
        const loginResponse = await doLogin(loginRequest);
        const expectedLoginResponse = "Login failed";
        expect(loginResponse.data).toEqual(expectedLoginResponse);
    })
})
