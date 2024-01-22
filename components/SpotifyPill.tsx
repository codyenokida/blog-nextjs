"use client";

import { Spotify } from "react-spotify-embed";
import styles from "./SpotifyPill.module.scss";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

interface SpotifyPillProps {
  spotifyEmbedLink: string;
}

export default function SpotifyPill({ spotifyEmbedLink }: SpotifyPillProps) {
  const spotifyEmbedRef = useRef(null);
  const [spotifyEmbedLoading, setSpotifyEmbedLoading] = useState<boolean>(true);

  function convertToEmbedUrl(originalUrl: string) {
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

  const handleSpotifyOnLoadStart = useCallback(() => {
    setSpotifyEmbedLoading(true);
  }, [spotifyEmbedLink]);

  const handleSpotifyOnLoad = useCallback(() => {
    setSpotifyEmbedLoading(false);
  }, [spotifyEmbedLink]);

  useEffect(() => {
    setTimeout(() => {
      if (spotifyEmbedLoading) setSpotifyEmbedLoading(false);
    }, 750);
  }, [spotifyEmbedLink]);

  return (
    <div className={styles.div}>
      {spotifyEmbedLoading && <div className={styles.skeleton} />}
      <div className={styles.spotify} ref={spotifyEmbedRef}>
        <iframe
          src={convertToEmbedUrl(spotifyEmbedLink)}
          width="100%"
          height="80px"
          loading="lazy"
          onLoadStart={handleSpotifyOnLoadStart}
          onLoad={handleSpotifyOnLoad}
          allow="encrypted-media"
        />
      </div>
    </div>
  );
}
