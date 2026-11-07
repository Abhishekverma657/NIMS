// Helper to convert job titles into clean, shareable URL slugs
export const generateJobSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove special characters like /, (, ), &
    .trim()
    .replace(/\s+/g, '-')     // replace spaces with hyphens
    .replace(/-+/g, '-');     // remove duplicate hyphens
};

// All live jobs are fetched directly from MongoDB via /api/hr/jobs
export const vacanciesData = [];

