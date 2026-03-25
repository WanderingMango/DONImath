/* ================================================================
   DONIMATH.ORG — Google Apps Script
   ================================================================
   SETUP:
   1. Go to script.google.com, sign in with your donimath Gmail
   2. Delete everything, paste this entire file
   3. Put your Gmail address in MY_EMAIL below
   4. Save, then Deploy > New Deployment > Web App
      - Execute as: Me
      - Who has access: Anyone
   5. Authorize, copy the /exec URL
   6. Paste into index.html SCRIPT_URL constant

   NOTE: Every edit requires a NEW deployment to take effect.
================================================================ */

const MY_EMAIL = "donisaveorg@gmail.com";

// Required for CORS preflight requests from the browser
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  // Handle CORS
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);

  try {
    const data = JSON.parse(e.postData.contents);

    if (data.type === "merch") {
      sendMerchEmail(data);
    } else {
      sendContactEmail(data);
    }

    output.setContent(JSON.stringify({ success: true }));
  } catch(err) {
    output.setContent(JSON.stringify({ success: false, error: err.toString() }));
  }

  return output;
}

function sendMerchEmail(data) {
  const items = [];
  if (data.tote)   items.push("Tote bag");
  if (data.tshirt) items.push("T-shirt");

  const body = [
    "NEW MERCH SIGNUP",
    "-----------------",
    "Email:       " + (data.email || ""),
    "Phone:       " + (data.phone || "(not provided)"),
    "Items:       " + (items.join(" + ") || "unknown"),
    "Suggestions: " + (data.suggestions || "(none)"),
    "Time:        " + new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
  ].join("\n");

  GmailApp.sendEmail(MY_EMAIL, "RE: SAVE Act Merchandise", body);
}

function sendContactEmail(data) {
  const body = [
    "NEW CONTACT MESSAGE",
    "-----------------",
    "Name:    " + (data.name    || "(not provided)"),
    "Email:   " + (data.email   || ""),
    "Message: " + (data.message || ""),
    "Time:    " + new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
  ].join("\n");

  GmailApp.sendEmail(MY_EMAIL, "RE: SAVE Act Contact", body);
}
