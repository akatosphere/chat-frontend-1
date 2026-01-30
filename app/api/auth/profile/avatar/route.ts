import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_URL = 'https://api.test.chat.ktsf.ru/api/v1/auth/messenger/profile/avatar/download/';

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access-token')?.value;

        if(!token) {
            return NextResponse.json({details: 'Ошибка валидации запроса'}, {status: 401});
        }

        const form = await request.formData();

        const response = await fetch(UPSTREAM_URL,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: form,
            }
        );

        const responseData = await response.json().catch(() => ({}));

        return NextResponse.json(responseData, {status: response.status})
    } catch (error) {
        console.log('Avatar Upload Proxy Error', error);
        return NextResponse.json({ error: 'Internal Server Error', details: String(error)}, {status: 500})
    }
}