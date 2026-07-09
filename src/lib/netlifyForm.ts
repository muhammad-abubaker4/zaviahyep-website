/** POST a Netlify form via AJAX. Requires matching static forms in index.html at deploy time. */
export async function submitNetlifyForm(form: HTMLFormElement): Promise<void> {
  const formName =
    form.getAttribute("name") ||
    form.querySelector<HTMLInputElement>('input[name="form-name"]')?.value ||
    "";

  const params = new URLSearchParams();
  for (const [key, value] of new FormData(form).entries()) {
    if (typeof value === "string") params.append(key, value);
  }
  if (formName && !params.has("form-name")) {
    params.set("form-name", formName);
  }

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const text = await response.text();

  if (response.status === 404 || /page not found/i.test(text)) {
    throw new Error("FORM_NOT_REGISTERED");
  }

  if (!response.ok) {
    throw new Error(`HTTP_${response.status}`);
  }
}
