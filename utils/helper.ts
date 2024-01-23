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
