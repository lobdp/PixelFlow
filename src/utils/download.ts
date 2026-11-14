/**
 * Triggers a direct file download for cross-origin media (images/videos).
 * By routing through the same-origin `/api/download` proxy with Content-Disposition: attachment,
 * browsers will directly download the file to disk instead of opening it in a new tab.
 */
export async function downloadMedia(url: string, filename: string): Promise<void> {
  if (!url) return;

  // If already a data URI (e.g. base64) or blob URL, download directly
  if (url.startsWith("data:") || url.startsWith("blob:")) {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // Use our internal download API with Content-Disposition: attachment
  const downloadEndpoint = `/api/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;

  const link = document.createElement("a");
  link.href = downloadEndpoint;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
