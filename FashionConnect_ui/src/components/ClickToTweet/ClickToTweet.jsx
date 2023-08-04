import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function ClickToTweetButton({ tweetText }) {
    const tweetLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

    return (
        <a
            className="click-to-tweet-button"
            href={tweetLink}
            target="_blank"
            rel="noopener noreferrer"
        >
            Click to Tweet <FontAwesomeIcon icon={faTwitter} />
        </a>
    );
}
