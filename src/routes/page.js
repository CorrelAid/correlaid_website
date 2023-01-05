export async function load({ parent }) {

    const { storyblokApi } = await parent();



    const dataStory = await storyblokApi.get("cdn/stories/home", {

        version: "draft",

    });



    return {

        story: dataStory.data.story

    };

}