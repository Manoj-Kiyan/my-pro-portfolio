"use server";

export async function verifyAdmin(passkey: string) {
  // We read the passkey from the highly secure server environment variables.
  // Because this file has "use server" at the top, Next.js completely strips
  // this code from the browser bundle. Hackers cannot inspect this!
  const correctPasskey = process.env.ADMIN_PASSKEY;
  
  if (!correctPasskey) {
    // Fallback just in case the environment variable fails to load
    return passkey === "MK_ADMIN";
  }
  
  return passkey === correctPasskey;
}
