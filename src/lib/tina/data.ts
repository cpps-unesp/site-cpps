// tsc não resolve imports .astro; este arquivo é verificado pelo `astro check`.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck (generated types/client appear after your first tinacms dev run)
import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../../tina/__generated__/client';

export const getPost = (slug: string) =>
  requestWithMetadata(client.queries.post({ relativePath: slug + '.md' }), {
    priority: 'primary',
  });
