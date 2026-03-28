import fetch from 'node-fetch';

async function reproduce() {
    const payload = {
        name: "Simple User",
        email: "simple" + Math.random().toString(36).substring(7) + "@example.com",
        password: "password1234"
    };

    try {
        const response = await fetch('http://localhost:8000/api/auth/sign-up/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:5173'
            },
            body: JSON.stringify(payload)
        });

        const text = await response.text();
        console.log('Status Code:', response.status);
        console.log('Raw response text:', text);
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error('Failed to parse JSON:', e);
            return;
        }

        if (data.code === 'FAILED_TO_CREATE_USER') {
            console.log('Successfully reproduced the error!');
        } else {
            console.log('Did not reproduce the exact error. Received:', data.code);
        }
    } catch (error) {
        console.error('Error during reproduction:', error);
    }
}

reproduce();
