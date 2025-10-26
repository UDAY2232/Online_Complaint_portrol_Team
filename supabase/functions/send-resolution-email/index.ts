import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ResolutionEmailRequest {
  to: string;
  complaintId: number;
  category?: string;
  description?: string;
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const { to, complaintId, category, description }: ResolutionEmailRequest = await req.json();

    if (!to || !complaintId) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const subject = `Your complaint #${complaintId} has been resolved`;
    const html = `
      <h2>Complaint Resolved</h2>
      <p>Dear user,</p>
      <p>Your complaint <strong>#${complaintId}</strong> has been marked as <strong>Resolved</strong>.</p>
      <p><strong>Category:</strong> ${category ?? "-"}</p>
      <p><strong>Summary:</strong> ${description ?? "-"}</p>
      <p>If you believe this was resolved in error, please reply to this email.</p>
      <p>Regards,<br/>Support Team</p>
    `;

    const emailResponse = await resend.emails.send({
      from: "Portal Notifications <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    });

    console.log("Resolution email sent:", { to, complaintId, id: emailResponse?.data?.id });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending resolution email:", error);
    return new Response(JSON.stringify({ error: error?.message ?? "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});