import { llms, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { defineCollections } from 'fumadocs-mdx/macro';
import { type BlogAuthor, blogPageSchema } from './blog';

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: blogPageSchema,
  postprocess: {
    includeProcessedMarkdown: true,
  },
});

export const blogAuthors: Record<string, BlogAuthor> = {
  relay: {
    name: 'RelayHQ',
    title: 'Core Maintainers',
    url: 'https://github.com/RelayMailHQ',
    image: '/authors/relay-hq.png',
    email: 'contact@relaymail.online',
  },
};

export const blogSource = loader({
  baseUrl: '/blog',
  source: blog.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const blogLlms = llms(blogSource, {
  renderPage: async (page) => `# ${page.data.title} (${page.url})

${await page.data.getText('processed')}`,
});

// Backward-compatible aliases
export const source = blogSource;
export const docsLlms = blogLlms;
