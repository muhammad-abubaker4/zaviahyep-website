import { EMAIL } from "@/lib/constants";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const FORM_SUBMIT_URL = `https://formsubmit.co/${EMAIL}`;

/** Minimum time (ms) the form must be open before submit — blocks instant bot posts. */
export const MIN_FORM_DWELL_MS = 2500;

type FormPayload = Record<string, string>;

export function formDataToObject(form: HTMLFormElement): FormPayload {
  const result: FormPayload = {};
  for (const [key, value] of new FormData(form).entries()) {
    if (key === "bot-field" || key === "form-name" || key === "botcheck" || key === "consent") continue;
    if (typeof value === "string" && value.trim()) result[key] = value;
  }
  return result;
}

/** Returns an error code if spam checks fail; otherwise null. */
export function validateFormAntiSpam(form: HTMLFormElement, openedAt: number): string | null {
  const honeypot = form.querySelector<HTMLInputElement>('input[name="botcheck"]');
  // Web3Forms expects an unchecked checkbox named botcheck; any check/value = bot.
  if (honeypot?.checked || honeypot?.value?.trim()) return "SPAM_REJECTED";

  if (Date.now() - openedAt < MIN_FORM_DWELL_MS) return "TOO_FAST";

  return null;
}

async function submitViaWeb3Forms(payload: FormPayload, accessKey: string): Promise<void> {
  const response = await fetch(WEB3FORMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      from_name: "Zaviah Website",
      subject: payload._subject || payload.subject || "Zaviah Website Form",
      botcheck: "",
      ...payload,
    }),
  });

  const data = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;

  if (data?.success) return;
  throw new Error(data?.message || "WEB3FORMS_FAILED");
}

/** Classic form POST in a hidden iframe (avoids AJAX/CORS timeouts on FormSubmit). */
function submitViaFormSubmitIframe(payload: FormPayload): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("SUBMIT_TIMEOUT"));
    }, 20000);

    const iframeName = `zaviah_form_${Date.now()}`;
    const iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.title = "Form submission";
    iframe.style.cssText = "position:absolute;width:0;height:0;border:0;visibility:hidden";

    const form = document.createElement("form");
    form.action = FORM_SUBMIT_URL;
    form.method = "POST";
    form.target = iframeName;
    form.acceptCharset = "UTF-8";
    form.style.display = "none";

    const appendField = (name: string, value: string) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    appendField("_captcha", "false");
    appendField("_template", "table");
    appendField("_next", "https://formsubmit.co/thank-you");
    // FormSubmit honeypot — leave empty (captcha stays off to preserve silent iframe UX).
    appendField("_honey", "");

    for (const [key, value] of Object.entries(payload)) {
      appendField(key, value);
    }

    let ready = false;

    const cleanup = () => {
      window.clearTimeout(timeout);
      form.remove();
      iframe.remove();
    };

    iframe.addEventListener("load", () => {
      if (!ready) {
        ready = true;
        return;
      }
      cleanup();
      resolve();
    });

    document.body.appendChild(iframe);
    document.body.appendChild(form);
    form.submit();
  });
}

export async function submitForm(payload: FormPayload): Promise<void> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

  if (accessKey?.trim()) {
    try {
      await submitViaWeb3Forms(payload, accessKey.trim());
      return;
    } catch {
      // Fall through to FormSubmit iframe if Web3Forms fails.
    }
  }

  await submitViaFormSubmitIframe(payload);
}
