export function HTMLdecode(str) {
    return str.replace(/&quot;/g, "\"")
              .replace(/&#39;/g, "'")
              .replace(/&gt;/g, ">")
              .replace(/&lt;/g, "<")
              .replace(/&amp;/g, "&");
}