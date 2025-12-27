import React from 'react';
import DOMPurify from 'dompurify';

interface SafeHTMLProps {
    html: string;
    className?: string;
    tag?: 'div' | 'span' | 'p' | 'article' | 'section';
}

/**
 * Component for safely rendering HTML content with XSS protection
 * Uses DOMPurify to sanitize HTML before rendering
 */
const SafeHTML: React.FC<SafeHTMLProps> = ({ html, className, tag = 'div' }) => {
    const sanitizedHTML = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'span'],
        ALLOWED_ATTR: ['href', 'title', 'target'],
    });

    const Tag = tag;

    return (
        <Tag
            className={className}
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        />
    );
};

export default SafeHTML;
