import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const restaurant = formData.get("restaurant");
    const message = formData.get("message");

    const emailBody = `
New Restaurant Submission
=========================

Name: ${name}
Email: ${email}
Restaurant: ${restaurant}
Message: ${message}
    `;

    const response = await fetch("https://api.web3forms.com/redirect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        from_name: name as string,
        email: email as string,
        subject: `New Restaurant Submission: ${restaurant}`,
        message: emailBody,
        redirect: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/thanks`,
       }),
     });

    if (response.ok) {
      return NextResponse.json({ success: true });
     }

    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
