import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const URL = 'https://api.test.chat.ktsf.ru/api/v1/contact/messenger-list/';
    try {
        const token = request.cookies.get('access-token')?.value;
        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const response = await fetch(URL, {
            headers: { 'Authorization': `Bearer ${token}` },
            cache: 'no-store'
        });

        const text = await response.text();
        
        if (!response.ok) {
            console.log(`--- BACKEND REJECTED (${response.status}) ---`, text.slice(0, 100));
            return NextResponse.json({ error: 'Backend error' }, { status: response.status });
        }

        try {
            const data = JSON.parse(text);
            return NextResponse.json(data);
        } catch {
            return NextResponse.json({ error: 'Invalid JSON', raw: text }, { status: 502 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const token = request.cookies.get('access-token')?.value;
        const { searchParams } = new URL(request.url);
        const uid = searchParams.get('uid');

        if (!uid || uid === 'undefined') {
            return NextResponse.json({ error: 'Valid UID is required' }, { status: 400 });
        }

        // ПРАВИЛЬНЫЙ УРЛ (проверь префикс /api/v1/)
        const targetUrl = `https://api.test.chat.ktsf.ru/api/v1/contact/messenger-delete-contact/${uid}/`;

        const response = await fetch(targetUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        if (response.ok) {
            return NextResponse.json({ success: true });
        }

        const errText = await response.text();
        return NextResponse.json({ error: 'Backend error', details: errText }, { status: response.status });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}