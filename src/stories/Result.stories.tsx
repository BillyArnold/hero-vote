import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Result from "../components/Result";
import { Hero } from "../components/Result";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Vote/Result",
  component: Result,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Result>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Result> = (args) => <Result {...args} />;

export const heroData = Template.bind({});
heroData.args = {
  character: {
    id: 4,
    image:
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/379-kang.jpg",
    name: "Hero Name",
    winPercent: 78,
  },
};
