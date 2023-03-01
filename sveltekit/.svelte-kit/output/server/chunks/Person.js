import { c as create_ssr_component, d as add_attribute, e as escape, v as validate_component } from "./index3.js";
import { E as External_Link } from "./External_Link.js";
const Twitter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} version="${"1.1"}" id="${"Capa_1"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" viewBox="${"0 0 450.619 450.619"}" xml:space="${"preserve"}"><g id="${"twitter_2_"}"><path d="${"M449.224,92.392c1.726-2.087,1.864-5.063,0.342-7.302c-1.523-2.24-4.344-3.209-6.918-2.37\r\n		c-11.951,3.896-24.395,6.665-37.236,8.224c15.313-9.264,27.946-22.594,36.381-38.515c1.234-2.329,0.829-5.188-1.003-7.082\r\n		c-1.832-1.895-4.675-2.394-7.045-1.241c-14.897,7.249-30.829,12.684-47.529,15.999c-17.954-19.28-43.509-31.329-71.808-31.329\r\n		c-54.311,0-98.367,44.422-98.367,99.225c0,7.763,0.873,15.33,2.563,22.609c-74.352-3.771-141.058-36.795-189.015-87.905\r\n		c-3.315-3.534-8.265-5.028-12.981-3.921c-4.717,1.107-8.49,4.646-9.883,9.288c-2.729,9.101-4.201,18.755-4.201,28.749\r\n		c0,34.445,15.236,64.809,41.625,82.602c-7.125-0.23-17.07-2.438-25.951-4.827c-4.954-1.333-10.244,0.066-13.889,3.678\r\n		c-3.644,3.611-5.082,8.884-3.799,13.851c9.564,37.023,40.707,65.873,78.008,73.432c-8.277,2.275-15.883,3.482-24.86,3.482\r\n		c-0.003,0-0.006,0-0.009,0c-4.022,0-7.743,2.137-9.768,5.612c-2.025,3.476-2.044,7.761-0.063,11.262\r\n		c16.696,29.52,48.12,49.6,84.018,50.282c-33.668,26.599-75.961,42.45-122.029,42.45c-0.028,0-0.057,0-0.085,0\r\n		c-2.626-0.001-4.915,1.787-5.55,4.335c-0.635,2.549,0.549,5.2,2.868,6.433c38.881,20.67,83.181,32.432,130.182,32.432\r\n		c180.923,0,279.884-151.216,279.884-282.331c0-4.318-0.094-8.565-0.281-12.836C426.318,116.836,438.567,105.29,449.224,92.392z"}"></path></g></svg>`;
});
const Github = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} viewBox="${"0 0 1024 1024"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path fill-rule="${"evenodd"}" clip-rule="${"evenodd"}" d="${"M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"}" transform="${"scale(64)"}" fill="${"#1B1F23"}"></path></svg>`;
});
const Linkedin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} viewBox="${"0 0 32 32"}" version="${"1.1"}" xmlns="${"http://www.w3.org/2000/svg"}"><title>linkedin</title><path d="${"M28.778 1.004h-25.56c-0.008-0-0.017-0-0.027-0-1.199 0-2.172 0.964-2.186 2.159v25.672c0.014 1.196 0.987 2.161 2.186 2.161 0.010 0 0.019-0 0.029-0h25.555c0.008 0 0.018 0 0.028 0 1.2 0 2.175-0.963 2.194-2.159l0-0.002v-25.67c-0.019-1.197-0.994-2.161-2.195-2.161-0.010 0-0.019 0-0.029 0h0.001zM9.9 26.562h-4.454v-14.311h4.454zM7.674 10.293c-1.425 0-2.579-1.155-2.579-2.579s1.155-2.579 2.579-2.579c1.424 0 2.579 1.154 2.579 2.578v0c0 0.001 0 0.002 0 0.004 0 1.423-1.154 2.577-2.577 2.577-0.001 0-0.002 0-0.003 0h0zM26.556 26.562h-4.441v-6.959c0-1.66-0.034-3.795-2.314-3.795-2.316 0-2.669 1.806-2.669 3.673v7.082h-4.441v-14.311h4.266v1.951h0.058c0.828-1.395 2.326-2.315 4.039-2.315 0.061 0 0.121 0.001 0.181 0.003l-0.009-0c4.5 0 5.332 2.962 5.332 6.817v7.855z"}"></path></svg>`;
});
const Mastodon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} viewBox="${"-10 -5 1034 1034"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" version="${"1.1"}"><path fill="${"#000000"}" d="${"M499 112q-93 1 -166 11q-81 11 -128 33l-14 8q-16 10 -32 25q-22 21 -38 47q-21 33 -32 73q-14 47 -14 103v37q0 77 1 119q3 113 18 188q19 95 62 154q50 67 134 89q109 29 210 24q46 -3 88 -12q30 -7 55 -17l19 -8l-4 -75l-22 6q-28 6 -57 10q-41 6 -78 4q-53 -1 -80 -7\nq-43 -8 -67 -30q-29 -25 -35 -72q-2 -14 -2 -29l25 6q31 6 65 10q48 7 93 9q42 2 92 -2q32 -2 88 -9t107 -30q49 -23 81.5 -54.5t38.5 -63.5q9 -45 13 -109q4 -46 5 -97v-41q0 -56 -14 -103q-11 -40 -32 -73q-16 -26 -38 -47q-15 -15 -32 -25q-12 -8 -14 -8\nq-46 -22 -127 -33q-74 -10 -166 -11h-3zM367 267q73 0 109 56l24 39l24 -39q36 -56 109 -56q63 0 101 43t38 117v239h-95v-232q0 -74 -61 -74q-69 0 -69 88v127h-94v-127q0 -88 -69 -88q-61 0 -61 74v232h-95v-239q0 -74 38 -117t101 -43z"}"></path></svg>`;
});
const social_media_height = 25;
const Person = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  let { position } = $$props;
  let { description } = $$props;
  let { img } = $$props;
  let { mastodon = "" } = $$props;
  let { website = "" } = $$props;
  let { twitter = "" } = $$props;
  let { linkedin = "" } = $$props;
  let { github = "" } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.img === void 0 && $$bindings.img && img !== void 0)
    $$bindings.img(img);
  if ($$props.mastodon === void 0 && $$bindings.mastodon && mastodon !== void 0)
    $$bindings.mastodon(mastodon);
  if ($$props.website === void 0 && $$bindings.website && website !== void 0)
    $$bindings.website(website);
  if ($$props.twitter === void 0 && $$bindings.twitter && twitter !== void 0)
    $$bindings.twitter(twitter);
  if ($$props.linkedin === void 0 && $$bindings.linkedin && linkedin !== void 0)
    $$bindings.linkedin(linkedin);
  if ($$props.github === void 0 && $$bindings.github && github !== void 0)
    $$bindings.github(github);
  return `<div class="${"rounded grid grid-cols-4"}"><div class="${"col-span-full xl:col-span-2 "}"><div class="${"relative offset w-56 h-56 mx-auto"}"><img class="${"w-56 h-56 border-4 border-neutral rounded"}"${add_attribute("src", img, 0)}${add_attribute("alt", name, 0)}></div></div>
    <div class="${"col-span-full xl:col-span-2 xl:pt-0 pt-5 px-4 text-neutral"}"><h2 class="${"text-2xl text-primary"}">${escape(name)}</h2>
        <h3 class="${"text-lg pt-2 pb-3"}">${escape(position)}</h3>
        <p>${escape(description)}</p>

        <div class="${"flex gap-x-2 mt-4"}">${website != "" ? `<a${add_attribute("href", website, 0)} class="${""}">${validate_component(External_Link, "ExternalLink").$$render(
    $$result,
    {
      width: social_media_height,
      height: social_media_height
    },
    {},
    {}
  )}</a>` : ``}
            ${twitter != "" ? `<a${add_attribute("href", twitter, 0)} class="${""}">${validate_component(Twitter, "Twitter").$$render(
    $$result,
    {
      width: social_media_height,
      height: social_media_height
    },
    {},
    {}
  )}</a>` : ``}
            ${mastodon != "" ? `<a${add_attribute("href", mastodon, 0)} class="${""}">${validate_component(Mastodon, "Mastodon").$$render(
    $$result,
    {
      width: social_media_height,
      height: social_media_height
    },
    {},
    {}
  )}</a>` : ``}
            ${linkedin != "" ? `<a${add_attribute("href", linkedin, 0)} class="${""}">${validate_component(Linkedin, "Linkedin").$$render(
    $$result,
    {
      width: social_media_height,
      height: social_media_height
    },
    {},
    {}
  )}</a>` : ``}
                ${github != "" ? `<a${add_attribute("href", github, 0)} class="${""}">${validate_component(Github, "Github").$$render(
    $$result,
    {
      width: social_media_height,
      height: social_media_height
    },
    {},
    {}
  )}</a>` : ``}</div></div></div>`;
});
export {
  Linkedin as L,
  Mastodon as M,
  Person as P,
  Twitter as T
};
