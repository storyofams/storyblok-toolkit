import { Story } from '../story';

const loadBridge = (callback: () => void) => {
  if (!window.storyblok) {
    const script = document.createElement('script');
    script.src = `//app.storyblok.com/f/storyblok-latest.js`;
    script.onload = callback;
    document.body.appendChild(script);
  } else {
    callback();
  }
};

export const init = (
  story: Story,
  onStoryInput: (story: Story) => void,
  resolveRelations: string[] = [],
) => {
  loadBridge(() => {
    if (window.storyblok) {
      window.storyblok.init();

      // Update story on input in Visual Editor
      // this will alter the state and replaces the current story with a current raw story object and resolve relations
      window.storyblok.on('input', (event) => {
        if (event.story.content.uuid === story?.content?.uuid) {
          event.story.content = window.storyblok.addComments(
            event.story.content,
            event.story.id,
          );

          window.storyblok.resolveRelations(
            event.story,
            resolveRelations,
            () => {
              onStoryInput(event.story);
            },
          );
        }
      });
    }
  });
};
