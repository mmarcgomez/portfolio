# Mar's Farm · Portfolio

Personal portfolio of **Mar** (María del Mar Clara Gómez), themed after Stardew Valley.

Static site: `index.html` + `style.css` + `script.js`, no build step.

## Run locally
Open `index.html` in a browser.

## Publish on GitHub Pages
1. Create a repo (e.g. `portfolio`) and push these files to `main`.
2. Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / root.
3. The site will be at `https://mmarcgomez.github.io/portfolio/`.

## Contact form (EmailJS)
The form sends letters with [EmailJS](https://www.emailjs.com) straight from the browser, no backend.

1. Create a free EmailJS account.
2. **Email Services** → *Add New Service* → Gmail → connect `mmargomez01@gmail.com`. Copy the **Service ID**.
3. **Email Templates** → *Create New Template*. Use the form's variables:
   - Subject: `New letter from your portfolio farm! ({{name}})`
   - Content: `{{name}} ({{email}}) wrote on {{time}}:` and `{{message}}`
   - To Email: `mmargomez01@gmail.com` · Reply To: `{{email}}`

   Save and copy the **Template ID**.
4. **Account** → *General* → copy the **Public Key**.
5. Paste the three values into `EMAILJS` at the contact section of `script.js`.
6. Recommended: **Account** → *Security* → add `mmarcgomez.github.io` to the allowed domains, so the
   public key only works from the published site.

Until the keys are filled in, the form shows a message pointing to the email address instead of sending.

## Easy tweaks
- Texts and projects: `index.html`
- Backpack items: `ITEMS` in `script.js`
- Dialogue lines: `LINES` in `script.js`
- Skill levels: `style="--lv:6"` on each `.pips` in `index.html`
- Force a theme for testing: `index.html?theme=day` or `?theme=night`
