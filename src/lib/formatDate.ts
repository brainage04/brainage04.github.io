const BLOG_TIME_ZONE = 'Australia/Brisbane';
const BLOG_TIME_ZONE_LABEL = 'AEST';

export const formatBlogDate = (date: Date) =>
  `${date.toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: BLOG_TIME_ZONE,
  })} ${BLOG_TIME_ZONE_LABEL}`;
