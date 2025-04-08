// Type definitions for Next.js page and layout props
import { Metadata } from 'next';

export interface PageProps<T = {}> {
  params: T;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export interface SlugPageProps extends PageProps<{
  slug: string;
}> {}

export interface BlogPostProps extends PageProps<{
  slug: string;
}> {}

export interface GenerateMetadataProps<T = {}> {
  params: T;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export type GenerateMetadataFn<T = {}> = (
  props: GenerateMetadataProps<T>
) => Promise<Metadata> | Metadata;