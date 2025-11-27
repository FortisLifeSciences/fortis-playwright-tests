// tests/testData/user-registration-data.ts

import { getFormattedTimestamp } from '../../utils/dateUtils';

export interface TestUser {
    firstName: string;
    lastName: string;
    companyName: string;
    // email: string;
    password: string;
}

const companyName = 'Testing Inc';
const password = 'SecurePass123';

export function generatePartialUser(): Omit<TestUser, ''> {
    const timestamp = getFormattedTimestamp();

    const firstName = `TestFN${timestamp}`;
    const lastName = `TestLN${timestamp}`;
    // const email = `${firstName}@mailsac.com`

    return {
        firstName,
        lastName,
        companyName,
        // email,
        password,
    };
}
