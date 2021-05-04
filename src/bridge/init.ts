import { Story } from '../story';

const loadBridge = (callback: () => void) => {
  if (!window.storyblok) {
    const script = document.createElement('script');
    script.src = `//app.storyblok.com/f/storyblok-v2-latest.js`;
    script.onload = callback;
    document.body.appendChild(script);
  } else {
    callback();
  }
};

export const init = (
  story: Story,
  onStoryInput: (story: Story) => void,
  token: string,
  resolveRelations: string[] = [],
) => {
  loadBridge(() => {
    if (window.StoryblokBridge) {
      window.storyblok = new window.StoryblokBridge({
        // accessToken: token,
        resolveRelations,
      });

      // Update story on input in Visual Editor
      window.storyblok.on('input', (event) => {
        if (event.story.content.uuid === story?.content?.uuid) {
          onStoryInput(event.story);
        }
      });
    }
  });
};
