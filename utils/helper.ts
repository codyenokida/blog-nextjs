/**
 * Helper utility functions
 */

/**
 *
 * @param url
 * @returns
 */
export function isValidSpotifyTrackURL(url: string) {
  const spotifyRegex =
    /^https?:\/\/open.spotify\.com\/(track|playlist|album)\/[a-zA-Z0-9]+\/?.*/;
  return spotifyRegex.test(url);
}

export function formatDate(date: string) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function convertToEmbedUrl(originalUrl: string) {
  // Check if the input URL is a valid Spotify track URL
  if (originalUrl && originalUrl.includes("open.spotify.com/track/")) {
    // Extract the track ID from the original URL
    const trackId = originalUrl.split("track/").pop() || "";

    // Construct the embedded URL
    const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;

    return embedUrl;
  } else {
    return "Invalid Spotify track URL";
  }
}
