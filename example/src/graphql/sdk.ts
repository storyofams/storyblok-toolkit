import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BlockScalar: any;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
  JsonScalar: any;
};

export type Alternate = {
  __typename?: 'Alternate';
  fullSlug: Scalars['String'];
  id: Scalars['Int'];
  isFolder?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  parentId?: Maybe<Scalars['Int']>;
  published: Scalars['Boolean'];
  slug: Scalars['String'];
};

export type ArticleComponent = {
  __typename?: 'ArticleComponent';
  _editable?: Maybe<Scalars['String']>;
  _uid?: Maybe<Scalars['String']>;
  author?: Maybe<Link>;
  categories?: Maybe<Array<Maybe<Story>>>;
  component?: Maybe<Scalars['String']>;
  intro?: Maybe<Scalars['JsonScalar']>;
  long_text?: Maybe<Scalars['String']>;
  seo?: Maybe<Scalars['JsonScalar']>;
  teaser_image?: Maybe<Asset>;
  title?: Maybe<Scalars['String']>;
};

export type ArticleComponentCategoriesArgs = {
  fields?: Maybe<Array<Maybe<Scalars['String']>>>;
  language?: Maybe<Scalars['String']>;
};

export type ArticleFilterQuery = {
  title?: Maybe<FilterQueryOperations>;
  categories?: Maybe<FilterQueryOperations>;
};

export type ArticleItem = {
  __typename?: 'ArticleItem';
  alternates?: Maybe<Array<Maybe<Alternate>>>;
  content?: Maybe<ArticleComponent>;
  created_at?: Maybe<Scalars['String']>;
  default_full_slug?: Maybe<Scalars['String']>;
  first_published_at?: Maybe<Scalars['String']>;
  full_slug?: Maybe<Scalars['String']>;
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  is_startpage?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<Scalars['String']>;
  meta_data?: Maybe<Scalars['JsonScalar']>;
  name?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  published_at?: Maybe<Scalars['String']>;
  release_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  sort_by_date?: Maybe<Scalars['String']>;
  tag_list?: Maybe<Array<Maybe<Scalars['String']>>>;
  translated_slugs?: Maybe<Array<Maybe<TranslatedSlug>>>;
  uuid?: Maybe<Scalars['String']>;
};

export type ArticleItems = {
  __typename?: 'ArticleItems';
  items?: Maybe<Array<Maybe<ArticleItem>>>;
  total?: Maybe<Scalars['Int']>;
};

export type ArticleoverviewComponent = {
  __typename?: 'ArticleoverviewComponent';
  _editable?: Maybe<Scalars['String']>;
  _uid?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  headline?: Maybe<Scalars['String']>;
};

export type ArticleoverviewFilterQuery = {
  headline?: Maybe<FilterQueryOperations>;
};

export type ArticleoverviewItem = {
  __typename?: 'ArticleoverviewItem';
  alternates?: Maybe<Array<Maybe<Alternate>>>;
  content?: Maybe<ArticleoverviewComponent>;
  created_at?: Maybe<Scalars['String']>;
  default_full_slug?: Maybe<Scalars['String']>;
  first_published_at?: Maybe<Scalars['String']>;
  full_slug?: Maybe<Scalars['String']>;
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  is_startpage?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<Scalars['String']>;
  meta_data?: Maybe<Scalars['JsonScalar']>;
  name?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  published_at?: Maybe<Scalars['String']>;
  release_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  sort_by_date?: Maybe<Scalars['String']>;
  tag_list?: Maybe<Array<Maybe<Scalars['String']>>>;
  translated_slugs?: Maybe<Array<Maybe<TranslatedSlug>>>;
  uuid?: Maybe<Scalars['String']>;
};

export type ArticleoverviewItems = {
  __typename?: 'ArticleoverviewItems';
  items?: Maybe<Array<Maybe<ArticleoverviewItem>>>;
  total?: Maybe<Scalars['Int']>;
};

export type Asset = {
  __typename?: 'Asset';
  alt?: Maybe<Scalars['String']>;
  copyright?: Maybe<Scalars['String']>;
  filename: Scalars['String'];
  focus?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type AuthorComponent = {
  __typename?: 'AuthorComponent';
  _editable?: Maybe<Scalars['String']>;
  _uid?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type AuthorFilterQuery = {
  name?: Maybe<FilterQueryOperations>;
};

export type AuthorItem = {
  __typename?: 'AuthorItem';
  alternates?: Maybe<Array<Maybe<Alternate>>>;
  content?: Maybe<AuthorComponent>;
  created_at?: Maybe<Scalars['String']>;
  default_full_slug?: Maybe<Scalars['String']>;
  first_published_at?: Maybe<Scalars['String']>;
  full_slug?: Maybe<Scalars['String']>;
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  is_startpage?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<Scalars['String']>;
  meta_data?: Maybe<Scalars['JsonScalar']>;
  name?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  published_at?: Maybe<Scalars['String']>;
  release_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  sort_by_date?: Maybe<Scalars['String']>;
  tag_list?: Maybe<Array<Maybe<Scalars['String']>>>;
  translated_slugs?: Maybe<Array<Maybe<TranslatedSlug>>>;
  uuid?: Maybe<Scalars['String']>;
};

export type AuthorItems = {
  __typename?: 'AuthorItems';
  items?: Maybe<Array<Maybe<AuthorItem>>>;
  total?: Maybe<Scalars['Int']>;
};

export type BlankComponent = {
  __typename?: 'BlankComponent';
  _editable?: Maybe<Scalars['String']>;
  _uid?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['BlockScalar']>;
  component?: Maybe<Scalars['String']>;
};

export type BlankItem = {
  __typename?: 'BlankItem';
  alternates?: Maybe<Array<Maybe<Alternate>>>;
  content?: Maybe<BlankComponent>;
  created_at?: Maybe<Scalars['String']>;
  default_full_slug?: Maybe<Scalars['String']>;
  first_published_at?: Maybe<Scalars['String']>;
  full_slug?: Maybe<Scalars['String']>;
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  is_startpage?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<Scalars['String']>;
  meta_data?: Maybe<Scalars['JsonScalar']>;
  name?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  published_at?: Maybe<Scalars['String']>;
  release_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  sort_by_date?: Maybe<Scalars['String']>;
  tag_list?: Maybe<Array<Maybe<Scalars['String']>>>;
  translated_slugs?: Maybe<Array<Maybe<TranslatedSlug>>>;
  uuid?: Maybe<Scalars['String']>;
};

export type BlankItems = {
  __typename?: 'BlankItems';
  items?: Maybe<Array<Maybe<BlankItem>>>;
  total?: Maybe<Scalars['Int']>;
};

export type CategoriesComponent = {
  __typename?: 'CategoriesComponent';
  _editable?: Maybe<Scalars['String']>;
  _uid?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  intro?: Maybe<Scalars['String']>;
};

export type CategoriesItem = {
  __typename?: 'CategoriesItem';
  alternates?: Maybe<Array<Maybe<Alternate>>>;
  content?: Maybe<CategoriesComponent>;
  created_at?: Maybe<Scalars['String']>;
  default_full_slug?: Maybe<Scalars['String']>;
  first_published_at?: Maybe<Scalars['String']>;
  full_slug?: Maybe<Scalars['String']>;
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  is_startpage?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<Scalars['String']>;
  meta_data?: Maybe<Scalars['JsonScalar']>;
  name?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  published_at?: Maybe<Scalars['String']>;
  release_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  sort_by_date?: Maybe<Scalars['String']>;
  tag_list?: Maybe<Array<Maybe<Scalars['String']>>>;
  translated_slugs?: Maybe<Array<Maybe<TranslatedSlug>>>;
  uuid?: Maybe<Scalars['String']>;
};

export type CategoriesItems = {
  __typename?: 'CategoriesItems';
  items?: Maybe<Array<Maybe<CategoriesItem>>>;
  total?: Maybe<Scalars['Int']>;
};

export type ContentItem = {
  __typename?: 'ContentItem';
  alternates?: Maybe<Array<Maybe<Alternate>>>;
  content?: Maybe<Scalars['JsonScalar']>;
  content_string?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  default_full_slug?: Maybe<Scalars['String']>;
  first_published_at?: Maybe<Scalars['String']>;
  full_slug?: Maybe<Scalars['String']>;
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  is_startpage?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<Scalars['String']>;
  meta_data?: Maybe<Scalars['JsonScalar']>;
  name?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  published_at?: Maybe<Scalars['String']>;
  release_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  sort_by_date?: Maybe<Scalars['String']>;
  tag_list?: Maybe<Array<Maybe<Scalars['String']>>>;
  translated_slugs?: Maybe<Array<Maybe<TranslatedSlug>>>;
  uuid?: Maybe<Scalars['String']>;
};

export type ContentItems = {
  __typename?: 'ContentItems';
  items?: Maybe<Array<Maybe<ContentItem>>>;
  total?: Maybe<Scalars['Int']>;
};

export type Datasource = {
  __typename?: 'Datasource';
  id: Scalars['Int'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type DatasourceEntries = {
  __typename?: 'DatasourceEntries';
  items: Array<DatasourceEntry>;
  total: Scalars['Int'];
};

export type DatasourceEntry = {
  __typename?: 'DatasourceEntry';
  dimensionValue?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type Datasources = {
  __typename?: 'Datasources';
  items: Array<Datasource>;
};

export type FilterQueryOperations = {
  /** Matches exactly one value */
  in?: Maybe<Scalars['String']>;
  /** Matches all without the given value */
  not_in?: Maybe<Scalars['String']>;
  /** Matches exactly one value with a wildcard search using * */
  like?: Maybe<Scalars['String']>;
  /** Matches all without the given value */
  not_like?: Maybe<Scalars['String']>;
  /** Matches any value of given array */
  in_array?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Must match all values of given array */
  all_in_array?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Greater than date (Exmples: 2019-03-03 or 2020-03-03T03:03:03) */
  gt_date?: Maybe<Scalars['ISO8601DateTime']>;
  /** Less than date (Format: 2019-03-03 or 2020-03-03T03:03:03) */
  lt_date?: Maybe<Scalars['ISO8601DateTime']>;
  /** Greater than integer value */
  gt_int?: Maybe<Scalars['Int']>;
  /** Less than integer value */
  lt_int?: Maybe<Scalars['Int']>;
  /** Matches exactly one integer value */
  in_int?: Maybe<Scalars['Int']>;
  /** Greater than float value */
  gt_float?: Maybe<Scalars['Float']>;
  /** Less than float value */
  lt_float?: Maybe<Scalars['Float']>;
};

export type GalleryComponent = {
  __typename?: 'GalleryComponent';
  _editable?: Maybe<Scalars['String']>;
  _uid?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Asset>>>;
};

export type GalleryItem = {
  __typename?: 'GalleryItem';
  alternates?: Maybe<Array<Maybe<Alternate>>>;
  content?: Maybe<GalleryComponent>;
  created_at?: Maybe<Scalars['String']>;
  default_full_slug?: Maybe<Scalars['String']>;
  first_published_at?: Maybe<Scalars['String']>;
  full_slug?: Maybe<Scalars['String']>;
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  is_startpage?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<Scalars['String']>;
  meta_data?: Maybe<Scalars['JsonScalar']>;
  name?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  published_at?: Maybe<Scalars['String']>;
  release_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  sort_by_date?: Maybe<Scalars['String']>;
  tag_list?: Maybe<Array<Maybe<Scalars['String']>>>;
  translated_slugs?: Maybe<Array<Maybe<TranslatedSlug>>>;
  uuid?: Maybe<Scalars['String']>;
};

export type GalleryItems = {
  __typename?: 'GalleryItems';
  items?: Maybe<Array<Maybe<GalleryItem>>>;
  total?: Maybe<Scalars['Int']>;
};

export type GlobalComponent = {
  __typename?: 'GlobalComponent';
  _editable?: Maybe<Scalars['String']>;
  _uid?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  footer?: Maybe<Scalars['BlockScalar']>;
  header?: Maybe<Scalars['BlockScalar']>;
};

export type GlobalItem = {
  __typename?: 'GlobalItem';
  alternates?: Maybe<Array<Maybe<Alternate>>>;
  content?: Maybe<GlobalComponent>;
  created_at?: Maybe<Scalars['String']>;
  default_full_slug?: Maybe<Scalars['String']>;
  first_published_at?: Maybe<Scalars['String']>;
  full_slug?: Maybe<Scalars['String']>;
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  is_startpage?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<Scalars['String']>;
  meta_data?: Maybe<Scalars['JsonScalar']>;
  name?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  published_at?: Maybe<Scalars['String']>;
  release_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  sort_by_date?: Maybe<Scalars['String']>;
  tag_list?: Maybe<Array<Maybe<Scalars['String']>>>;
  translated_slugs?: Maybe<Array<Maybe<TranslatedSlug>>>;
  uuid?: Maybe<Scalars['String']>;
};

export type GlobalItems = {
  __typename?: 'GlobalItems';
  items?: Maybe<Array<Maybe<GlobalItem>>>;
  total?: Maybe<Scalars['Int']>;
};

export type Link = {
  __typename?: 'Link';
  cachedUrl: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  fieldtype: Scalars['String'];
  id: Scalars['String'];
  linktype: Scalars['String'];
  story?: Maybe<Story>;
  url: Scalars['String'];
};

export type LinkEntries = {
  __typename?: 'LinkEntries';
  items: Array<LinkEntry>;
};

export type LinkEntry = {
  __typename?: 'LinkEntry';
  id?: Maybe<Scalars['Int']>;
  isFolder?: Maybe<Scalars['Boolean']>;
  isStartpage?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['String']>;
};

export type PageComponent = {
  __typename?: 'PageComponent';
  _editable?: Maybe<Scalars['String']>;
  _uid?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['BlockScalar']>;
  component?: Maybe<Scalars['String']>;
};

export type PageItem = {
  __typename?: 'PageItem';
  alternates?: Maybe<Array<Maybe<Alternate>>>;
  content?: Maybe<PageComponent>;
  created_at?: Maybe<Scalars['String']>;
  default_full_slug?: Maybe<Scalars['String']>;
  first_published_at?: Maybe<Scalars['String']>;
  full_slug?: Maybe<Scalars['String']>;
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  is_startpage?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<Scalars['String']>;
  meta_data?: Maybe<Scalars['JsonScalar']>;
  name?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  published_at?: Maybe<Scalars['String']>;
  release_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  sort_by_date?: Maybe<Scalars['String']>;
  tag_list?: Maybe<Array<Maybe<Scalars['String']>>>;
  translated_slugs?: Maybe<Array<Maybe<TranslatedSlug>>>;
  uuid?: Maybe<Scalars['String']>;
};

export type PageItems = {
  __typename?: 'PageItems';
  items?: Maybe<Array<Maybe<PageItem>>>;
  total?: Maybe<Scalars['Int']>;
};

export type QueryType = {
  __typename?: 'QueryType';
  ArticleItem?: Maybe<ArticleItem>;
  ArticleItems?: Maybe<ArticleItems>;
  ArticleoverviewItem?: Maybe<ArticleoverviewItem>;
  ArticleoverviewItems?: Maybe<ArticleoverviewItems>;
  AuthorItem?: Maybe<AuthorItem>;
  AuthorItems?: Maybe<AuthorItems>;
  BlankItem?: Maybe<BlankItem>;
  BlankItems?: Maybe<BlankItems>;
  CategoriesItem?: Maybe<CategoriesItem>;
  CategoriesItems?: Maybe<CategoriesItems>;
  ContentNode?: Maybe<ContentItem>;
  ContentNodes?: Maybe<ContentItems>;
  DatasourceEntries?: Maybe<DatasourceEntries>;
  Datasources?: Maybe<Datasources>;
  GalleryItem?: Maybe<GalleryItem>;
  GalleryItems?: Maybe<GalleryItems>;
  GlobalItem?: Maybe<GlobalItem>;
  GlobalItems?: Maybe<GlobalItems>;
  Links?: Maybe<LinkEntries>;
  PageItem?: Maybe<PageItem>;
  PageItems?: Maybe<PageItems>;
  Space?: Maybe<Space>;
  Tags?: Maybe<Tags>;
};

export type QueryTypeArticleItemArgs = {
  id: Scalars['ID'];
  find_by?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['Int']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
};

export type QueryTypeArticleItemsArgs = {
  first_published_at_gt?: Maybe<Scalars['String']>;
  first_published_at_lt?: Maybe<Scalars['String']>;
  published_at_gt?: Maybe<Scalars['String']>;
  published_at_lt?: Maybe<Scalars['String']>;
  starts_with?: Maybe<Scalars['String']>;
  by_slugs?: Maybe<Scalars['String']>;
  excluding_slugs?: Maybe<Scalars['String']>;
  fallback_lang?: Maybe<Scalars['String']>;
  by_uuids?: Maybe<Scalars['String']>;
  by_uuids_ordered?: Maybe<Scalars['String']>;
  excluding_ids?: Maybe<Scalars['String']>;
  excluding_fields?: Maybe<Scalars['String']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['String']>;
  sort_by?: Maybe<Scalars['String']>;
  search_term?: Maybe<Scalars['String']>;
  is_startpage?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  with_tag?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per_page?: Maybe<Scalars['Int']>;
  filter_query?: Maybe<Scalars['JsonScalar']>;
  filter_query_v2?: Maybe<ArticleFilterQuery>;
};

export type QueryTypeArticleoverviewItemArgs = {
  id: Scalars['ID'];
  find_by?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['Int']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
};

export type QueryTypeArticleoverviewItemsArgs = {
  first_published_at_gt?: Maybe<Scalars['String']>;
  first_published_at_lt?: Maybe<Scalars['String']>;
  published_at_gt?: Maybe<Scalars['String']>;
  published_at_lt?: Maybe<Scalars['String']>;
  starts_with?: Maybe<Scalars['String']>;
  by_slugs?: Maybe<Scalars['String']>;
  excluding_slugs?: Maybe<Scalars['String']>;
  fallback_lang?: Maybe<Scalars['String']>;
  by_uuids?: Maybe<Scalars['String']>;
  by_uuids_ordered?: Maybe<Scalars['String']>;
  excluding_ids?: Maybe<Scalars['String']>;
  excluding_fields?: Maybe<Scalars['String']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['String']>;
  sort_by?: Maybe<Scalars['String']>;
  search_term?: Maybe<Scalars['String']>;
  is_startpage?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  with_tag?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per_page?: Maybe<Scalars['Int']>;
  filter_query?: Maybe<Scalars['JsonScalar']>;
  filter_query_v2?: Maybe<ArticleoverviewFilterQuery>;
};

export type QueryTypeAuthorItemArgs = {
  id: Scalars['ID'];
  find_by?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['Int']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
};

export type QueryTypeAuthorItemsArgs = {
  first_published_at_gt?: Maybe<Scalars['String']>;
  first_published_at_lt?: Maybe<Scalars['String']>;
  published_at_gt?: Maybe<Scalars['String']>;
  published_at_lt?: Maybe<Scalars['String']>;
  starts_with?: Maybe<Scalars['String']>;
  by_slugs?: Maybe<Scalars['String']>;
  excluding_slugs?: Maybe<Scalars['String']>;
  fallback_lang?: Maybe<Scalars['String']>;
  by_uuids?: Maybe<Scalars['String']>;
  by_uuids_ordered?: Maybe<Scalars['String']>;
  excluding_ids?: Maybe<Scalars['String']>;
  excluding_fields?: Maybe<Scalars['String']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['String']>;
  sort_by?: Maybe<Scalars['String']>;
  search_term?: Maybe<Scalars['String']>;
  is_startpage?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  with_tag?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per_page?: Maybe<Scalars['Int']>;
  filter_query?: Maybe<Scalars['JsonScalar']>;
  filter_query_v2?: Maybe<AuthorFilterQuery>;
};

export type QueryTypeBlankItemArgs = {
  id: Scalars['ID'];
  find_by?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['Int']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
};

export type QueryTypeBlankItemsArgs = {
  first_published_at_gt?: Maybe<Scalars['String']>;
  first_published_at_lt?: Maybe<Scalars['String']>;
  published_at_gt?: Maybe<Scalars['String']>;
  published_at_lt?: Maybe<Scalars['String']>;
  starts_with?: Maybe<Scalars['String']>;
  by_slugs?: Maybe<Scalars['String']>;
  excluding_slugs?: Maybe<Scalars['String']>;
  fallback_lang?: Maybe<Scalars['String']>;
  by_uuids?: Maybe<Scalars['String']>;
  by_uuids_ordered?: Maybe<Scalars['String']>;
  excluding_ids?: Maybe<Scalars['String']>;
  excluding_fields?: Maybe<Scalars['String']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['String']>;
  sort_by?: Maybe<Scalars['String']>;
  search_term?: Maybe<Scalars['String']>;
  is_startpage?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  with_tag?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per_page?: Maybe<Scalars['Int']>;
  filter_query?: Maybe<Scalars['JsonScalar']>;
};

export type QueryTypeCategoriesItemArgs = {
  id: Scalars['ID'];
  find_by?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['Int']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
};

export type QueryTypeCategoriesItemsArgs = {
  first_published_at_gt?: Maybe<Scalars['String']>;
  first_published_at_lt?: Maybe<Scalars['String']>;
  published_at_gt?: Maybe<Scalars['String']>;
  published_at_lt?: Maybe<Scalars['String']>;
  starts_with?: Maybe<Scalars['String']>;
  by_slugs?: Maybe<Scalars['String']>;
  excluding_slugs?: Maybe<Scalars['String']>;
  fallback_lang?: Maybe<Scalars['String']>;
  by_uuids?: Maybe<Scalars['String']>;
  by_uuids_ordered?: Maybe<Scalars['String']>;
  excluding_ids?: Maybe<Scalars['String']>;
  excluding_fields?: Maybe<Scalars['String']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['String']>;
  sort_by?: Maybe<Scalars['String']>;
  search_term?: Maybe<Scalars['String']>;
  is_startpage?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  with_tag?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per_page?: Maybe<Scalars['Int']>;
  filter_query?: Maybe<Scalars['JsonScalar']>;
};

export type QueryTypeContentNodeArgs = {
  id: Scalars['ID'];
  find_by?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['Int']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
};

export type QueryTypeContentNodesArgs = {
  first_published_at_gt?: Maybe<Scalars['String']>;
  first_published_at_lt?: Maybe<Scalars['String']>;
  published_at_gt?: Maybe<Scalars['String']>;
  published_at_lt?: Maybe<Scalars['String']>;
  starts_with?: Maybe<Scalars['String']>;
  by_slugs?: Maybe<Scalars['String']>;
  excluding_slugs?: Maybe<Scalars['String']>;
  fallback_lang?: Maybe<Scalars['String']>;
  by_uuids?: Maybe<Scalars['String']>;
  by_uuids_ordered?: Maybe<Scalars['String']>;
  excluding_ids?: Maybe<Scalars['String']>;
  excluding_fields?: Maybe<Scalars['String']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['String']>;
  sort_by?: Maybe<Scalars['String']>;
  search_term?: Maybe<Scalars['String']>;
  is_startpage?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  with_tag?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per_page?: Maybe<Scalars['Int']>;
  filter_query?: Maybe<Scalars['JsonScalar']>;
};

export type QueryTypeDatasourceEntriesArgs = {
  datasource?: Maybe<Scalars['String']>;
  dimension?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per_page?: Maybe<Scalars['Int']>;
};

export type QueryTypeDatasourcesArgs = {
  search?: Maybe<Scalars['String']>;
  by_ids?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryTypeGalleryItemArgs = {
  id: Scalars['ID'];
  find_by?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['Int']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
};

export type QueryTypeGalleryItemsArgs = {
  first_published_at_gt?: Maybe<Scalars['String']>;
  first_published_at_lt?: Maybe<Scalars['String']>;
  published_at_gt?: Maybe<Scalars['String']>;
  published_at_lt?: Maybe<Scalars['String']>;
  starts_with?: Maybe<Scalars['String']>;
  by_slugs?: Maybe<Scalars['String']>;
  excluding_slugs?: Maybe<Scalars['String']>;
  fallback_lang?: Maybe<Scalars['String']>;
  by_uuids?: Maybe<Scalars['String']>;
  by_uuids_ordered?: Maybe<Scalars['String']>;
  excluding_ids?: Maybe<Scalars['String']>;
  excluding_fields?: Maybe<Scalars['String']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['String']>;
  sort_by?: Maybe<Scalars['String']>;
  search_term?: Maybe<Scalars['String']>;
  is_startpage?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  with_tag?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per_page?: Maybe<Scalars['Int']>;
  filter_query?: Maybe<Scalars['JsonScalar']>;
};

export type QueryTypeGlobalItemArgs = {
  id: Scalars['ID'];
  find_by?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['Int']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
};

export type QueryTypeGlobalItemsArgs = {
  first_published_at_gt?: Maybe<Scalars['String']>;
  first_published_at_lt?: Maybe<Scalars['String']>;
  published_at_gt?: Maybe<Scalars['String']>;
  published_at_lt?: Maybe<Scalars['String']>;
  starts_with?: Maybe<Scalars['String']>;
  by_slugs?: Maybe<Scalars['String']>;
  excluding_slugs?: Maybe<Scalars['String']>;
  fallback_lang?: Maybe<Scalars['String']>;
  by_uuids?: Maybe<Scalars['String']>;
  by_uuids_ordered?: Maybe<Scalars['String']>;
  excluding_ids?: Maybe<Scalars['String']>;
  excluding_fields?: Maybe<Scalars['String']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['String']>;
  sort_by?: Maybe<Scalars['String']>;
  search_term?: Maybe<Scalars['String']>;
  is_startpage?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  with_tag?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per_page?: Maybe<Scalars['Int']>;
  filter_query?: Maybe<Scalars['JsonScalar']>;
};

export type QueryTypeLinksArgs = {
  starts_with?: Maybe<Scalars['String']>;
  paginated?: Maybe<Scalars['Boolean']>;
};

export type QueryTypePageItemArgs = {
  id: Scalars['ID'];
  find_by?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['Int']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
};

export type QueryTypePageItemsArgs = {
  first_published_at_gt?: Maybe<Scalars['String']>;
  first_published_at_lt?: Maybe<Scalars['String']>;
  published_at_gt?: Maybe<Scalars['String']>;
  published_at_lt?: Maybe<Scalars['String']>;
  starts_with?: Maybe<Scalars['String']>;
  by_slugs?: Maybe<Scalars['String']>;
  excluding_slugs?: Maybe<Scalars['String']>;
  fallback_lang?: Maybe<Scalars['String']>;
  by_uuids?: Maybe<Scalars['String']>;
  by_uuids_ordered?: Maybe<Scalars['String']>;
  excluding_ids?: Maybe<Scalars['String']>;
  excluding_fields?: Maybe<Scalars['String']>;
  resolve_links?: Maybe<Scalars['String']>;
  resolve_relations?: Maybe<Scalars['String']>;
  from_release?: Maybe<Scalars['String']>;
  sort_by?: Maybe<Scalars['String']>;
  search_term?: Maybe<Scalars['String']>;
  is_startpage?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  with_tag?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per_page?: Maybe<Scalars['Int']>;
  filter_query?: Maybe<Scalars['JsonScalar']>;
};

export type QueryTypeTagsArgs = {
  starts_with?: Maybe<Scalars['String']>;
};

export type Space = {
  __typename?: 'Space';
  domain: Scalars['String'];
  id: Scalars['Int'];
  languageCodes: Array<Maybe<Scalars['String']>>;
  name: Scalars['String'];
  version: Scalars['Int'];
};

export type Story = {
  __typename?: 'Story';
  alternates?: Maybe<Array<Maybe<Alternate>>>;
  content?: Maybe<Scalars['JsonScalar']>;
  createdAt?: Maybe<Scalars['String']>;
  firstPublishedAt?: Maybe<Scalars['String']>;
  fullSlug?: Maybe<Scalars['String']>;
  groupId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  isStartpage?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<Scalars['String']>;
  metaData?: Maybe<Scalars['JsonScalar']>;
  name?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  publishedAt?: Maybe<Scalars['String']>;
  releaseId?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  sortByDate?: Maybe<Scalars['String']>;
  tagList?: Maybe<Array<Maybe<Scalars['String']>>>;
  translatedSlugs?: Maybe<Array<Maybe<TranslatedSlug>>>;
  uuid?: Maybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  name: Scalars['String'];
  taggingsCount: Scalars['Int'];
};

export type Tags = {
  __typename?: 'Tags';
  items: Array<Tag>;
};

export type TranslatedSlug = {
  __typename?: 'TranslatedSlug';
  lang: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
};

export type ArticleItemQueryVariables = Exact<{
  slug: Scalars['ID'];
}>;

export type ArticleItemQuery = { __typename?: 'QueryType' } & {
  ArticleItem?: Maybe<
    { __typename?: 'ArticleItem' } & Pick<ArticleItem, 'uuid'> & {
        content?: Maybe<
          { __typename?: 'ArticleComponent' } & Pick<
            ArticleComponent,
            'title' | 'intro' | '_editable'
          > & {
              teaser_image?: Maybe<
                { __typename?: 'Asset' } & Pick<Asset, 'filename'>
              >;
            }
        >;
      }
  >;
};

export type ArticleItemsQueryVariables = Exact<{
  perPage?: Maybe<Scalars['Int']>;
}>;

export type ArticleItemsQuery = { __typename?: 'QueryType' } & {
  ArticleItems?: Maybe<
    { __typename?: 'ArticleItems' } & Pick<ArticleItems, 'total'> & {
        items?: Maybe<
          Array<
            Maybe<
              { __typename?: 'ArticleItem' } & Pick<
                ArticleItem,
                'uuid' | 'full_slug' | 'slug'
              > & {
                  content?: Maybe<
                    { __typename?: 'ArticleComponent' } & Pick<
                      ArticleComponent,
                      'title' | 'intro'
                    > & {
                        teaser_image?: Maybe<
                          { __typename?: 'Asset' } & Pick<
                            Asset,
                            'filename' | 'alt'
                          >
                        >;
                      }
                  >;
                }
            >
          >
        >;
      }
  >;
};

export type GalleryItemQueryVariables = Exact<{
  slug: Scalars['ID'];
}>;

export type GalleryItemQuery = { __typename?: 'QueryType' } & {
  GalleryItem?: Maybe<
    { __typename?: 'GalleryItem' } & Pick<GalleryItem, 'uuid'> & {
        content?: Maybe<
          { __typename?: 'GalleryComponent' } & Pick<
            GalleryComponent,
            '_editable'
          > & {
              images?: Maybe<
                Array<Maybe<{ __typename?: 'Asset' } & Pick<Asset, 'filename'>>>
              >;
            }
        >;
      }
  >;
};

export const ArticleItemDocument = gql`
  query articleItem($slug: ID!) {
    ArticleItem(id: $slug) {
      content {
        title
        teaser_image {
          filename
        }
        intro
        _editable
      }
      uuid
    }
  }
`;
export const ArticleItemsDocument = gql`
  query articleItems($perPage: Int) {
    ArticleItems(per_page: $perPage) {
      items {
        content {
          title
          teaser_image {
            filename
            alt
          }
          intro
        }
        uuid
        full_slug
        slug
      }
      total
    }
  }
`;
export const GalleryItemDocument = gql`
  query galleryItem($slug: ID!) {
    GalleryItem(id: $slug) {
      content {
        images {
          filename
        }
        _editable
      }
      uuid
    }
  }
`;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (sdkFunction) => sdkFunction();
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    articleItem(
      variables: ArticleItemQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<ArticleItemQuery> {
      return withWrapper(() =>
        client.request<ArticleItemQuery>(
          ArticleItemDocument,
          variables,
          requestHeaders,
        ),
      );
    },
    articleItems(
      variables?: ArticleItemsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<ArticleItemsQuery> {
      return withWrapper(() =>
        client.request<ArticleItemsQuery>(
          ArticleItemsDocument,
          variables,
          requestHeaders,
        ),
      );
    },
    galleryItem(
      variables: GalleryItemQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GalleryItemQuery> {
      return withWrapper(() =>
        client.request<GalleryItemQuery>(
          GalleryItemDocument,
          variables,
          requestHeaders,
        ),
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
