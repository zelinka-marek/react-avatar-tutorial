import { useState } from "react";

export const FALLBACK_AVATAR_URL = "https://cataas.com/cat/says/hello%20world!";
export const FALLBACK_AVATAR_ALT_TEXT = "@hello-cat";

type AvatarProps = {
  /** the url of an image to render for the Avatar */
  url?: string;
  /** the alt text to use for the url image */
  alt?: string;
};

export function Avatar(props: AvatarProps) {
  const { url = FALLBACK_AVATAR_URL, alt = FALLBACK_AVATAR_ALT_TEXT } = props;

  const [source, setSource] = useState(url);

  const handleError = () => {
    setSource(FALLBACK_AVATAR_URL);
  };

  return <img src={source} alt={alt} onError={handleError} />;
}
