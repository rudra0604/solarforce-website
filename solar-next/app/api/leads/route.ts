
import { NextResponse } from 'next/server';
import { leadsDB, Lead } from '@/lib/google-sheets';
import { sendLeadNotification, sendThankYouEmail } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Validate required fields
        if (!data.name || !data.phone) {
            return NextResponse.json(
                { success: false, error: 'Name and phone are required' },
                { status: 400 }
            );
        }

        const lead: Lead = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            city: data.city || 'Unknown',
            pincode: data.pincode,
            customer_type: data.customerType || 'residential',
            monthly_bill: data.monthlyBill ? Number(data.monthlyBill) : undefined,
            rooftop_area: data.rooftopArea ? Number(data.rooftopArea) : undefined,
            message: data.message,
            source_page: data.sourcePage || '/api/leads',
            status: 'new'
        };

        // 1. Save to Google Sheets (if configured)
        const dbResult = await leadsDB.insert(lead);

        // Use the ID from DB or generate a temporary one if DB fails/is disabled
        const leadId = dbResult.data?.id || `TEMP-${Date.now()}`;
        const leadWithId = { ...lead, id: leadId };

        // 2. Send Admin Notification
        await sendLeadNotification(leadWithId);

        // 3. Send Customer Thank You Email
        if (lead.email) {
            await sendThankYouEmail(leadWithId);
        }

        return NextResponse.json({
            success: true,
            id: leadId,
            message: 'Lead submitted successfully'
        });

    } catch (error: any) {
        console.error('Error submitting lead:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
