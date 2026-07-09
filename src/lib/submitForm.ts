import { EMAIL } from "@/lib/constants";

const FORM_SUBMIT_URL = `https://formsubmit.co/ajax/${EMAIL}`;

type FormPayload = Record<string, string>;

export function formDataToObject(form: HTMLFormElement): FormPayload {
  const result: FormPayload = {};
  for (const [key, value] of new FormData(form).entries()) {
    if (key === "bot-field" || key === "form-name") continue;
    if (typeof value === "string" && value.trim()) result[key] = value;
  }
  return result;
}

/** Submit via FormSubmit.co (works without Netlify Forms). */
export async function submitForm(payload: FormPayload): Promise<void> {
  const response = await fetch(FORM_SUBMIT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _template: "table",
      _captcha: "false",
      ...payload,
    }),
  });

  const data = (await response.json().catch(() => null)) as {
    success?: string;
    message?: string;
  } | null;

  if (data?.success === "true") return;

  if (data?.message?.toLowerCase().includes("activation")) {
    throw new Error("ACTIVATION_REQUIRED");
  }

  throw new Error(data?.message || "SUBMIT_FAILED");
}
