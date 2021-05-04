declare global {
  interface StoryblokBridgeConfig {
    initOnlyOnce?: boolean;
    accessToken?: string;
  }
  interface StoryblokEventPayload<S extends StoryblokComponent<string> = any> {
    action:
      | 'customEvent'
      | 'published'
      | 'input'
      | 'change'
      | 'unpublished'
      | 'enterEditmode';
    event?: string;
    story?: S;
    slug?: string;
    slugChanged?: boolean;
    storyId?: string;
    reload?: boolean;
  }
  interface StoryblokBridge {
    init: (config?: StoryblokBridgeConfig) => void;
    pingEditor: (callback: (instance: StoryblokBridge) => void) => void;
    isInEditor: () => boolean;
    enterEditmode: () => void;
    on: (
      event:
        | 'customEvent'
        | 'published'
        | 'input'
        | 'change'
        | 'unpublished'
        | 'enterEditmode'
        | string[],
      callback: (payload?: StoryblokEventPayload) => void,
    ) => void;
    addComments: (
      tree: StoryblokComponent<string>,
      storyId: string,
    ) => StoryblokComponent<string>;
    resolveRelations: (
      story: any,
      resolve: string[],
      callback: (storyContent: any) => void,
    ) => void;
  }
  interface Window {
    storyblok: StoryblokBridge;
    StoryblokBridge: any;
    StoryblokCacheVersion: number;
  }
}

export interface StoryblokComponent<TComp extends string> {
  _uid: string;
  component: TComp;
  _editable?: string;
}

export interface Story<
  Content = StoryblokComponent<string> & { [index: string]: any }
> {
  alternates: AlternateObject[];
  content: Content;
  created_at: string;
  full_slug: string;
  group_id: string;
  id: number;
  is_startpage: boolean;
  meta_data: any;
  name: string;
  parent_id: number;
  position: number;
  published_at: string | null;
  first_published_at: string | null;
  slug: string;
  sort_by_date: string | null;
  tag_list: string[];
  uuid: string;
}

export interface AlternateObject {
  id: number;
  name: string;
  slug: string;
  published: boolean;
  full_slug: string;
  is_folder: boolean;
  parent_id: number;
}

export interface Richtext {
  content: Array<Object>;
}
