import { c as create_ssr_component, d as add_attribute, e as escape, f as createEventDispatcher, v as validate_component, a as subscribe, g as set_store_value, h as each } from "../../chunks/index3.js";
import { p as page } from "../../chunks/stores.js";
import { l as locale, t } from "../../chunks/i18n.js";
import { p as page_key } from "../../chunks/page_key.js";
import { g as gen_img_url } from "../../chunks/helpers.js";
import { w as writable } from "../../chunks/index2.js";
import { L as Link_Button } from "../../chunks/Link_Button.js";
import { T as Twitter, M as Mastodon, L as Linkedin, P as Person } from "../../chunks/Person.js";
import { H as Html } from "../../chunks/Html.js";
import "lodash";
import "simply-reactive";
const app = "";
const header_height = writable();
const drawer = writable(false);
const CorrelAid_Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} viewBox="${"0 0 1778.65 1127.49"}"><defs><style>.cl-1 {
				fill: #fff;
			}
			.cl-2 {
				fill: #96c342;
			}
			.cl-3 {
				fill: #bcd259;
			}
			.cl-4 {
				fill: #78a972;
			}
			.cl-5 {
				fill: #538794;
			}
			.cl-6 {
				fill: #3864a3;
			}
			.cl-7 {
				fill: #214f8f;
			}
			.cl-8 {
				fill: #6fa07f;
			}
			.cl-9 {
				fill: #aaca48;
			}
			.cl-10 {
				font-size: 269.65px;
				fill: #3c3c3b;
				font-family: Roboto-Light, Roboto;
				letter-spacing: 0.15em;
			}
			.cl-11 {
				letter-spacing: 0.16em;
			}
			.cl-12 {
				letter-spacing: 0.15em;
			}
		</style></defs><title>CorrelAid_Dach-zentriert_2</title><g id="${"Ebene_2"}" data-name="${"Ebene 2"}"><g id="${"_01-a_CorrelAid_Zentriert"}" data-name="${"01-a_CorrelAid_Zentriert"}"><g id="${"C_-_nicht_verändern_"}" data-name="${"C - nicht verändern!"}"><path class="${"cl-1"}" d="${"M826.75,277.77v90.76l99.54,89.63h200.3V638.29H827.12l-.37-.33L627.27,458.34l-.73-.65V188.62l.75-.67L826.75,8.35l.59-.53h299.25V188H926.5Z"}"></path><path class="${"cl-1"}" d="${"M1134.41,646.11H824.13l-2.59-2.32L621.34,463.52l-2.62-2.33V185.12l3.35-3L824.34,0h310.07V195.77H929.5l-94.93,85.48v83.8l94.72,85.29h205.12ZM830.12,630.47h288.65V466H923.29L818.93,372V274.29L923.5,180.13h195.27V15.64H830.34l-196,176.46V454.2Z"}"></path><polygon class="${"cl-2"}" points="${"1126.59 12.56 1126.59 183.62 948.94 76.42 1126.59 12.56"}"></polygon><polygon class="${"cl-3"}" points="${"1115.24 8.34 940.3 71.22 836.1 8.34 1115.24 8.34"}"></polygon><polygon class="${"cl-4"}" points="${"923.06 191.58 829.88 275.48 635.6 189.06 874.53 103.18 923.06 191.58"}"></polygon><polygon class="${"cl-2"}" points="${"1119.48 188.47 930.26 188.47 881.96 100.5 939.44 79.84 1119.48 188.47"}"></polygon><polygon class="${"cl-5"}" points="${"1117.66 458.68 938.45 566.82 882.97 546.88 931.39 458.68 1117.66 458.68"}"></polygon><polygon class="${"cl-6"}" points="${"1126.59 462.43 1126.59 634.45 947.93 570.24 1126.59 462.43"}"></polygon><polygon class="${"cl-7"}" points="${"1115.61 638.81 834.3 638.81 939.33 575.43 1115.61 638.81"}"></polygon><polygon class="${"cl-6"}" points="${"871.71 551.14 825.77 634.8 823.92 635.92 635.44 466.2 871.71 551.14"}"></polygon><polygon class="${"cl-5"}" points="${"923.73 456.37 875.52 544.2 635.15 457.8 829.37 371.42 923.73 456.37"}"></polygon><polygon class="${"cl-8"}" points="${"826.75 282.65 826.75 364.01 626.54 453.05 626.54 193.61 826.75 282.65"}"></polygon><polygon class="${"cl-3"}" points="${"870.72 96.24 636.02 180.59 824.07 11.29 870.72 96.24"}"></polygon><polygon class="${"cl-9"}" points="${"930.82 74.62 878.14 93.56 836.51 17.72 930.82 74.62"}"></polygon><polygon class="${"cl-6"}" points="${"929.83 572.01 839.11 626.75 879.16 553.82 929.83 572.01"}"></polygon></g><text class="${"cl-10"}" transform="${"translate(0 1054.42)"}">CORRE<tspan class="${"cl-11"}" x="${"1055.56"}" y="${"0"}">L</tspan><tspan class="${"cl-12"}" x="${"1240.58"}" y="${"0"}">AID</tspan></text></g></g></svg>`;
});
const Nav_Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { href } = $$props;
  let { text } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  return `<a class="${"hover:text-secondary transition inline-flex items-center justify-center tracking-wide"}"${add_attribute("href", href, 0)}>${escape(text)}</a>`;
});
const Dropdown_Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} class="${"z-0"}" style="${"z-index: -1;"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" fill="${"#3c3c3b"}"><path fill-rule="${"evenodd"}" d="${"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"}" clip-rule="${"evenodd"}"></path></svg>`;
});
const Nav_Link_Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { href } = $$props;
  let { text } = $$props;
  let { category } = $$props;
  createEventDispatcher();
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.category === void 0 && $$bindings.category && category !== void 0)
    $$bindings.category(category);
  return `<a class="${"hover:text-secondary transition inline-flex items-center justify-center tracking-wide"}"${add_attribute("href", href, 0)}>${escape(text)}
    ${validate_component(Dropdown_Icon, "DropdownIcon").$$render($$result, { height: 20, width: 20 }, {}, {})}</a>`;
});
const Subnav_Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { href } = $$props;
  let { text } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  return `<li><a class="${"hover:text-primary transition"}"${add_attribute("href", href, 0)}>${escape(text)}</a></li>`;
});
const Menu_Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  let { fill } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0)
    $$bindings.fill(fill);
  return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)}${add_attribute("fill", fill, 0)} viewBox="${"0 0 24 24"}" stroke="${"currentColor"}" stroke-width="${"2"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" d="${"M4 6h16M4 12h16M4 18h16"}"></path></svg>`;
});
const Mobile_Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $drawer, $$unsubscribe_drawer;
  let $page, $$unsubscribe_page;
  let $$unsubscribe_locale;
  let $t, $$unsubscribe_t;
  $$unsubscribe_drawer = subscribe(drawer, (value) => $drawer = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_locale = subscribe(locale, (value) => value);
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let projects_consulting_toggle = false;
  let education_toggle = false;
  let community_toggle = false;
  function closeall() {
    projects_consulting_toggle = false;
    education_toggle = false;
    community_toggle = false;
  }
  $page.url && set_store_value(drawer, $drawer = false, $drawer);
  $drawer && closeall();
  $$unsubscribe_drawer();
  $$unsubscribe_page();
  $$unsubscribe_locale();
  $$unsubscribe_t();
  return `${$drawer ? `<div class="${"z-30 absolute w-screen h-screen lg:hidden"}" id="${"drawer"}"><div class="${"flex flex-col justify-between w-5/6 h-screen bg-white border-r absolute left-0 z-30"}" id="${"drawer-sidenav"}"><nav aria-label="${"Main Nav"}" class="${"flex flex-col pt-7 pl-7"}"><ul class="${"text-base-content text-2xl space-y-3"}"><li><div class="${"inline-flex items-center justify-center"}"><a class="${"tracking-wide"}"${add_attribute("href", $t("navbar.about").url, 0)}>${escape($t("navbar.about").text)}</a></div></li>
                    <li><div class="${"inline-flex items-center"}"><a class="${"tracking-wide w-56"}"${add_attribute("href", $t("navbar.projects_consulting").url, 0)}>${escape($t("navbar.projects_consulting").text)}</a>
                            <button>${validate_component(Dropdown_Icon, "DropdownIcon").$$render($$result, { height: 30, width: 30 }, {}, {})}</button></div></li>
                    ${projects_consulting_toggle ? `<ul class="${"font-light text-base-content tracking-wide text-base space-y-3"}"><li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("navbar.projects_consulting.projects").url, 0)}>${escape($t("navbar.projects_consulting.projects").text)}</a></li>
                            <li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("navbar.projects_consulting.nonprofits").url, 0)}>${escape($t("navbar.projects_consulting.nonprofits").text)}</a></li></ul>` : ``}
                    <li><div class="${"inline-flex items-center"}"><a class="${"tracking-wide w-56"}"${add_attribute("href", $t("navbar.education").url, 0)}>${escape($t("navbar.education").text)}</a>
                            <button>${validate_component(Dropdown_Icon, "DropdownIcon").$$render($$result, { height: 30, width: 30 }, {}, {})}</button></div></li>
                    ${education_toggle ? `<ul class="${"font-light text-base-content tracking-wide text-base space-y-3"}"><li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("navbar.education.workshops").url, 0)}>${escape($t("navbar.education.workshops").text)}</a></li>

                            <li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("navbar.education.experts").url, 0)}>${escape($t("navbar.education.experts").text)}</a></li>

                            <li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("navbar.education.learning_r").url, 0)}>${escape($t("navbar.education.learning_r").text)}</a></li>
                            <li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("navbar.education.knowledge_pool").url, 0)}>${escape($t("navbar.education.knowledge_pool").text)}</a></li>
                            <li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("navbar.education.tidy_tuesday").url, 0)}>${escape($t("navbar.education.tidy_tuesday").text)}</a></li>
                            <li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("navbar.education.mentoring").url, 0)}>${escape($t("navbar.education.mentoring").text)}</a></li></ul>` : ``}
                    <li><div class="${"inline-flex items-center"}"><a class="${"tracking-wide w-56"}"${add_attribute("href", $t("navbar.community").url, 0)}>${escape($t("navbar.community").text)}</a>
                            <button>${validate_component(Dropdown_Icon, "DropdownIcon").$$render($$result, { height: 30, width: 30 }, {}, {})}</button></div></li>
                    ${community_toggle ? `<ul class="${"font-light text-base-content tracking-wide text-base space-y-3"}"><li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("navbar.community.correlaidx").url, 0)}>${escape($t("navbar.community.correlaidx").text)}</a></li>

                            <li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("navbar.community.founding_lc").url, 0)}>${escape($t("navbar.community.founding_lc").text)}</a></li>
                            <li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("navbar.community.volunteer_journeys").url, 0)}>${escape($t("navbar.community.volunteer_journeys").text)}</a></li></ul>` : ``}</ul>
                <ul class="${"font-light text-base-content tracking-wide text-lg space-y-3 pt-3"}"><li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("navbar.events").url, 0)}>${escape($t("navbar.events").text)}</a></li>

                    <li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("navbar.blog").url, 0)}>${escape($t("navbar.blog").text)}</a></li>

                    <li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("navbar.podcast").url, 0)}>${escape($t("navbar.podcast").text)}</a></li>

                    <li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("navbar.newsletter").url, 0)}>${escape($t("navbar.newsletter").text)}</a></li></ul></nav>

            <div class="${"sticky inset-x-0 bottom-0 "}"><div class="${"flex items-center mx-auto w-2/4 pb-7"}"><div class="${"flex items-center gap-5 mx-auto"}">${validate_component(Link_Button, "LinkButton").$$render(
    $$result,
    {
      text: $t("navbar.donate").text,
      href: $t("navbar.donate").url,
      type: "external",
      color: "secondary"
    },
    {},
    {}
  )}
                        <div class="${"flex"}"><button class="${"pr-5 text-xl font-light"}">de
                            </button>
                            <span class="${"border-l-2 border-neutral-25 pr-5"}"></span>
                            <button class="${"text-xl font-light"}">en
                            </button></div></div></div></div></div>
        <button class="${"absolute h-screen w-screen bg-neutral z-20 opacity-80"}" id="${"drawer-overlay"}"></button></div>` : ``}`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $locale, $$unsubscribe_locale;
  let $page, $$unsubscribe_page;
  let $header_height, $$unsubscribe_header_height;
  let $t, $$unsubscribe_t;
  let $$unsubscribe_drawer;
  $$unsubscribe_locale = subscribe(locale, (value) => $locale = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_header_height = subscribe(header_height, (value) => $header_height = value);
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  $$unsubscribe_drawer = subscribe(drawer, (value) => value);
  let projects_consulting_toggle = false;
  let education_toggle = false;
  let community_toggle = false;
  let active_language = "de";
  createEventDispatcher();
  function closeall() {
    projects_consulting_toggle = false;
    education_toggle = false;
    community_toggle = false;
  }
  $page.url && closeall();
  active_language = $locale;
  $$unsubscribe_locale();
  $$unsubscribe_page();
  $$unsubscribe_header_height();
  $$unsubscribe_t();
  $$unsubscribe_drawer();
  return `

<header aria-label="${"Site Header"}" class="${"w-screen z-10 border-b border-neutral-25"}"><div class="${"mx-auto px-4 sm:px-6 xl:px-8 "}"><div class="${"flex items-center justify-between xl:grid grid-cols-10"}"><div class="${"flex items-center gap-12 3xl:col-span-3 col-span-2 justify-end"}"><a class="${"block text-teal-600"}"${add_attribute("href", $t("navbar.home").url, 0)}><span class="${"sr-only"}">Home</span>
					${validate_component(CorrelAid_Logo, "CorrelAid_Logo").$$render($$result, { width: 100, height: 100 }, {}, {})}</a></div>
			<div class="${"xl:block flex-col hidden 3xl:col-span-4 col-span-6"}"><div class="${"flex mb-3 mt-1"}"><div class="${"mx-auto"}"><nav aria-label="${"Site Nav"}"><ul class="${"flex items-center gap-6 font-light text-base-content tracking-wide"}">${validate_component(Subnav_Link, "SubnavLink").$$render(
    $$result,
    {
      href: $t("navbar.events").url,
      text: $t("navbar.events").text
    },
    {},
    {}
  )}
								${validate_component(Subnav_Link, "SubnavLink").$$render(
    $$result,
    {
      href: $t("navbar.blog").url,
      text: $t("navbar.blog").text
    },
    {},
    {}
  )}
								${validate_component(Subnav_Link, "SubnavLink").$$render(
    $$result,
    {
      href: $t("navbar.podcast").url,
      text: $t("navbar.podcast").text
    },
    {},
    {}
  )}
								${validate_component(Subnav_Link, "SubnavLink").$$render(
    $$result,
    {
      href: $t("navbar.newsletter").url,
      text: $t("navbar.newsletter").text
    },
    {},
    {}
  )}</ul></nav></div></div>

				<div class="${"flex items-center gap-12 mx-auto"}"><div class="${"hidden xl:block mx-auto"}"><nav aria-label="${"Site Nav"}"><div class="${"flex items-center gap-6 text-xl text-base-content "}">${validate_component(Nav_Link, "NavLink").$$render(
    $$result,
    {
      href: $t("navbar.about").url,
      text: $t("navbar.about").text
    },
    {},
    {}
  )}
								${validate_component(Nav_Link_Button, "NavLinkButton").$$render(
    $$result,
    {
      href: $t("navbar.projects_consulting").url,
      text: $t("navbar.projects_consulting").text,
      category: "projects_consulting"
    },
    {},
    {}
  )}
								${validate_component(Nav_Link_Button, "NavLinkButton").$$render(
    $$result,
    {
      href: $t("navbar.education").url,
      text: $t("navbar.education").text,
      category: "education"
    },
    {},
    {}
  )}
								${validate_component(Nav_Link_Button, "NavLinkButton").$$render(
    $$result,
    {
      href: $t("navbar.community").url,
      text: $t("navbar.community").text,
      category: "community"
    },
    {},
    {}
  )}</div></nav></div></div></div>
			<div class="${"xl:flex items-center hidden gap-6 3xl:col-span-3 col-span-2 justify-start"}">${validate_component(Link_Button, "LinkButton").$$render(
    $$result,
    {
      text: $t("navbar.donate").text,
      href: $t("navbar.donate").url,
      type: "external",
      color: `bg-secondary`
    },
    {},
    {}
  )}
				<div class="${"inline-flex items-stretch rounded-md border-neutral-25 border "}"><span class="${"rounded-l-md px-4 py-2 text-sm text-base-content"}">${escape(active_language)}</span>

					<div class="${"relative"}"><button type="${"button"}" class="${"inline-flex h-full items-center justify-center rounded-r-md border-l border-neutral-25 px-2 z-10 "}"><span class="${"sr-only"}">Language</span>

							${validate_component(Dropdown_Icon, "DropdownIcon").$$render($$result, { height: 20, width: 20 }, {}, {})}</button>
						${``}</div></div></div>
			<div class="${"block xl:hidden"}"><button class="${"p-2 transition"}">${validate_component(Menu_Icon, "MenuIcon").$$render(
    $$result,
    {
      height: 32,
      width: 32,
      fill: "neutral-25"
    },
    {},
    {}
  )}</button></div></div></div></header>
${projects_consulting_toggle ? `<div class="${"w-screen hidden absolute z-20 xl:block"}" style="${"top: " + escape($header_height + 1, true) + "px"}"><div class="${"mx-auto max-w-screen-xl px-4 sm:px-6 xl:px-8 "}"><div class="${"px-4 sm:px-6 xl:px-8 items-center justify-between grid grid-cols-10 "}"><div class="${"col-span-2"}"></div>
				<div class="${"col-span-6"}"><ul class="${"flex items-center justify-center xl:gap-6 gap-5 font-light text-base-content py-3 text-base bg-white border-b border-x border-neutral-25 rounded-b "}">${validate_component(Subnav_Link, "SubnavLink").$$render(
    $$result,
    {
      href: $t("navbar.projects_consulting.projects").url,
      text: $t("navbar.projects_consulting.projects").text
    },
    {},
    {}
  )}
						${validate_component(Subnav_Link, "SubnavLink").$$render(
    $$result,
    {
      href: $t("navbar.projects_consulting.consulting").url,
      text: $t("navbar.projects_consulting.consulting").text
    },
    {},
    {}
  )}
						${validate_component(Subnav_Link, "SubnavLink").$$render(
    $$result,
    {
      href: $t("navbar.projects_consulting.hackathons").url,
      text: $t("navbar.projects_consulting.hackathons").text
    },
    {},
    {}
  )}</ul></div>
				<div class="${"col-span-2"}"></div></div></div></div>` : ``}
${education_toggle ? `<div class="${"w-screen hidden absolute z-20 xl:block"}" style="${"top: " + escape($header_height + 1, true) + "px"}"><div class="${"mx-auto max-w-screen-xl px-4 sm:px-6 xl:px-8 "}"><div class="${"px-4 sm:px-6 xl:px-8 items-center justify-between grid grid-cols-10 "}"><div class="${"col-span-2"}"></div>
				<div class="${"col-span-6"}"><ul class="${"flex items-center justify-center xl:gap-6 gap-5 font-light text-base-content py-3 text-base bg-white border-b border-x border-neutral-25 rounded-b"}">${validate_component(Subnav_Link, "SubnavLink").$$render(
    $$result,
    {
      href: $t("navbar.education.workshops").url,
      text: $t("navbar.education.workshops").text
    },
    {},
    {}
  )}
						${validate_component(Subnav_Link, "SubnavLink").$$render(
    $$result,
    {
      href: $t("navbar.education.learning_r").url,
      text: $t("navbar.education.learning_r").text
    },
    {},
    {}
  )}
						${validate_component(Subnav_Link, "SubnavLink").$$render(
    $$result,
    {
      href: $t("navbar.education.oer").url,
      text: $t("navbar.education.oer").text
    },
    {},
    {}
  )}
						${validate_component(Subnav_Link, "SubnavLink").$$render(
    $$result,
    {
      href: $t("navbar.education.mentoring").url,
      text: $t("navbar.education.mentoring").text
    },
    {},
    {}
  )}
						${validate_component(Subnav_Link, "SubnavLink").$$render(
    $$result,
    {
      href: $t("navbar.education.tidy_tuesday").url,
      text: $t("navbar.education.tidy_tuesday").text
    },
    {},
    {}
  )}</ul></div>
				<div class="${"col-span-2"}"></div></div></div></div>` : ``}
${community_toggle ? `<div class="${"w-screen hidden absolute z-20 xl:block"}" style="${"top: " + escape($header_height + 1, true) + "px"}"><div class="${"mx-auto max-w-screen-xl px-4 sm:px-6 xl:px-8 "}"><div class="${"px-4 sm:px-6 xl:px-8 items-center justify-between grid grid-cols-10 "}"><div class="${"col-span-2"}"></div>
				<div class="${"col-span-6"}"><ul class="${"flex items-center justify-center xl:gap-6 gap-5 font-light text-base-content py-3 text-base bg-white border-b border-x border-neutral-25 rounded-b"}">${validate_component(Subnav_Link, "SubnavLink").$$render(
    $$result,
    {
      href: $t("navbar.community.correlaidx").url,
      text: $t("navbar.community.correlaidx").text
    },
    {},
    {}
  )}
						${validate_component(Subnav_Link, "SubnavLink").$$render(
    $$result,
    {
      href: $t("navbar.community.founding_lc").url,
      text: $t("navbar.community.founding_lc").text
    },
    {},
    {}
  )}
						${validate_component(Subnav_Link, "SubnavLink").$$render(
    $$result,
    {
      href: $t("navbar.community.volunteer_journeys").url,
      text: $t("navbar.community.volunteer_journeys").text
    },
    {},
    {}
  )}
						${validate_component(Subnav_Link, "SubnavLink").$$render(
    $$result,
    {
      href: $t("navbar.community.become_member").url,
      text: $t("navbar.community.become_member").text
    },
    {},
    {}
  )}</ul></div>
				<div class="${"col-span-2"}"></div></div></div></div>` : ``}

${validate_component(Mobile_Menu, "MobileMenu").$$render($$result, {}, {}, {})}`;
});
const Facebook = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} viewBox="${"0 0 32 32"}" version="${"1.1"}" xmlns="${"http://www.w3.org/2000/svg"}"><title>facebook</title><path d="${"M30.996 16.091c-0.001-8.281-6.714-14.994-14.996-14.994s-14.996 6.714-14.996 14.996c0 7.455 5.44 13.639 12.566 14.8l0.086 0.012v-10.478h-3.808v-4.336h3.808v-3.302c-0.019-0.167-0.029-0.361-0.029-0.557 0-2.923 2.37-5.293 5.293-5.293 0.141 0 0.281 0.006 0.42 0.016l-0.018-0.001c1.199 0.017 2.359 0.123 3.491 0.312l-0.134-0.019v3.69h-1.892c-0.086-0.012-0.185-0.019-0.285-0.019-1.197 0-2.168 0.97-2.168 2.168 0 0.068 0.003 0.135 0.009 0.202l-0.001-0.009v2.812h4.159l-0.665 4.336h-3.494v10.478c7.213-1.174 12.653-7.359 12.654-14.814v-0z"}"></path></svg>`;
});
const Instagram = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} viewBox="${"0 0 32 32"}" version="${"1.1"}" xmlns="${"http://www.w3.org/2000/svg"}"><title>instagram</title><path d="${"M25.805 7.996c0 0 0 0.001 0 0.001 0 0.994-0.806 1.799-1.799 1.799s-1.799-0.806-1.799-1.799c0-0.994 0.806-1.799 1.799-1.799v0c0.993 0.001 1.798 0.805 1.799 1.798v0zM16 20.999c-2.761 0-4.999-2.238-4.999-4.999s2.238-4.999 4.999-4.999c2.761 0 4.999 2.238 4.999 4.999v0c0 0 0 0.001 0 0.001 0 2.76-2.237 4.997-4.997 4.997-0 0-0.001 0-0.001 0h0zM16 8.3c0 0 0 0-0 0-4.253 0-7.7 3.448-7.7 7.7s3.448 7.7 7.7 7.7c4.253 0 7.7-3.448 7.7-7.7v0c0-0 0-0 0-0.001 0-4.252-3.447-7.7-7.7-7.7-0 0-0 0-0.001 0h0zM16 3.704c4.003 0 4.48 0.020 6.061 0.089 1.003 0.012 1.957 0.202 2.84 0.538l-0.057-0.019c1.314 0.512 2.334 1.532 2.835 2.812l0.012 0.034c0.316 0.826 0.504 1.781 0.516 2.778l0 0.005c0.071 1.582 0.087 2.057 0.087 6.061s-0.019 4.48-0.092 6.061c-0.019 1.004-0.21 1.958-0.545 2.841l0.019-0.058c-0.258 0.676-0.64 1.252-1.123 1.726l-0.001 0.001c-0.473 0.484-1.049 0.866-1.692 1.109l-0.032 0.011c-0.829 0.316-1.787 0.504-2.788 0.516l-0.005 0c-1.592 0.071-2.061 0.087-6.072 0.087-4.013 0-4.481-0.019-6.072-0.092-1.008-0.019-1.966-0.21-2.853-0.545l0.059 0.019c-0.676-0.254-1.252-0.637-1.722-1.122l-0.001-0.001c-0.489-0.47-0.873-1.047-1.114-1.693l-0.010-0.031c-0.315-0.828-0.506-1.785-0.525-2.785l-0-0.008c-0.056-1.575-0.076-2.061-0.076-6.053 0-3.994 0.020-4.481 0.076-6.075 0.019-1.007 0.209-1.964 0.544-2.85l-0.019 0.059c0.247-0.679 0.632-1.257 1.123-1.724l0.002-0.002c0.468-0.492 1.045-0.875 1.692-1.112l0.031-0.010c0.823-0.318 1.774-0.509 2.768-0.526l0.007-0c1.593-0.056 2.062-0.075 6.072-0.075zM16 1.004c-4.074 0-4.582 0.019-6.182 0.090-1.315 0.028-2.562 0.282-3.716 0.723l0.076-0.025c-1.040 0.397-1.926 0.986-2.656 1.728l-0.001 0.001c-0.745 0.73-1.333 1.617-1.713 2.607l-0.017 0.050c-0.416 1.078-0.67 2.326-0.697 3.628l-0 0.012c-0.075 1.6-0.090 2.108-0.090 6.182s0.019 4.582 0.090 6.182c0.028 1.315 0.282 2.562 0.723 3.716l-0.025-0.076c0.796 2.021 2.365 3.59 4.334 4.368l0.052 0.018c1.078 0.415 2.326 0.669 3.628 0.697l0.012 0c1.6 0.075 2.108 0.090 6.182 0.090s4.582-0.019 6.182-0.090c1.315-0.029 2.562-0.282 3.716-0.723l-0.076 0.026c2.021-0.796 3.59-2.365 4.368-4.334l0.018-0.052c0.416-1.078 0.669-2.326 0.697-3.628l0-0.012c0.075-1.6 0.090-2.108 0.090-6.182s-0.019-4.582-0.090-6.182c-0.029-1.315-0.282-2.562-0.723-3.716l0.026 0.076c-0.398-1.040-0.986-1.926-1.729-2.656l-0.001-0.001c-0.73-0.745-1.617-1.333-2.607-1.713l-0.050-0.017c-1.078-0.416-2.326-0.67-3.628-0.697l-0.012-0c-1.6-0.075-2.108-0.090-6.182-0.090z"}"></path></svg>`;
});
const Youtube = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} viewBox="${"0 0 71.412065 50"}"><style id="${"style3"}" type="${"text/css"}">.st2 {
            fill: #282828;
        }
    </style><g id="${"g5"}" transform="${"scale(.58824)"}"><path id="${"path7"}" fill="${"#282828"}" fill-opacity="${"1"}" d="${"M118.9 13.3c-1.4-5.2-5.5-9.3-10.7-10.7C98.7 0 60.7 0 60.7 0s-38 0-47.5 2.5C8.1 3.9 3.9 8.1 2.5 13.3 0 22.8 0 42.5 0 42.5s0 19.8 2.5 29.2C3.9 76.9 8 81 13.2 82.4 22.8 85 60.7 85 60.7 85s38 0 47.5-2.5c5.2-1.4 9.3-5.5 10.7-10.7 2.5-9.5 2.5-29.2 2.5-29.2s.1-19.8-2.5-29.3z"}"></path><path id="${"polygon9"}" fill="${"#fff"}" d="${"M80.2 42.5 48.6 24.3v36.4z"}"></path></g></svg>`;
});
const social_media_height = 23;
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  $$unsubscribe_t();
  return `<footer class="${"w-screen border-t border-neutral-25"}"><div class="${"flex pt-14"}"><ul class="${"flex items-center gap-6 font-light text-base-content mx-auto"}"><li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("footer.imprint").url, 0)}>${escape($t("footer.imprint").text)}</a></li>
      <li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("footer.coc").url, 0)}>${escape($t("footer.coc").text)}</a></li>
      <li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("footer.team").url, 0)}>${escape($t("footer.team").text)}</a></li>
      <li><a class="${"hover:text-primary transition"}"${add_attribute("href", $t("footer.contact").url, 0)}>${escape($t("footer.contact").text)}</a></li></ul></div>

  <div class="${"flex mx-auto py-6"}"><div class="${"grid grid-flow-col gap-6 mx-auto"}"><a href="${"https://twitter.com/CorrelAid"}" class="${""}">${validate_component(Instagram, "Instagram").$$render(
    $$result,
    {
      width: social_media_height,
      height: social_media_height
    },
    {},
    {}
  )}</a>
      <a href="${"https://twitter.com/correlaid"}" class="${""}">${validate_component(Twitter, "Twitter").$$render(
    $$result,
    {
      width: social_media_height,
      height: social_media_height
    },
    {},
    {}
  )}</a>
      <a href="${"https://masto.ai/@correlaid"}" class="${""}">${validate_component(Mastodon, "Mastodon").$$render(
    $$result,
    {
      width: social_media_height,
      height: social_media_height
    },
    {},
    {}
  )}</a>
      <a href="${"https://de.linkedin.com/company/correlaid"}" class="${""}">${validate_component(Linkedin, "Linkedin").$$render(
    $$result,
    {
      width: social_media_height,
      height: social_media_height
    },
    {},
    {}
  )}</a>
      <a href="${"https://facebook.com/WeAreCorrelAid"}" class="${""}">${validate_component(Facebook, "Facebook").$$render(
    $$result,
    {
      width: social_media_height,
      height: social_media_height
    },
    {},
    {}
  )}</a>
      <a href="${"https://www.youtube.com/channel/UCs_k9roCuWLy17xxpigrWbg"}" class="${""}">${validate_component(Youtube, "Youtube").$$render(
    $$result,
    {
      width: social_media_height,
      height: social_media_height
    },
    {},
    {}
  )}</a></div></div>

  <div class="${"flex pb-14"}"><ul class="${"flex items-center gap-6 font-light text-base-content tracking-wide mx-auto"}"><li>CorrelAid. © ${escape(new Date().getFullYear())}</li></ul></div></footer>`;
});
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $header_height, $$unsubscribe_header_height;
  $$unsubscribe_header_height = subscribe(header_height, (value) => $header_height = value);
  let { image } = $$props;
  let { gradient_only } = $$props;
  let { height } = $$props;
  let { text } = $$props;
  let { buttons } = $$props;
  let image_id;
  if ($$props.image === void 0 && $$bindings.image && image !== void 0)
    $$bindings.image(image);
  if ($$props.gradient_only === void 0 && $$bindings.gradient_only && gradient_only !== void 0)
    $$bindings.gradient_only(gradient_only);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.buttons === void 0 && $$bindings.buttons && buttons !== void 0)
    $$bindings.buttons(buttons);
  {
    if (image != null) {
      image_id = image.id;
    }
  }
  {
    console.log(buttons);
  }
  $$unsubscribe_header_height();
  return `<section class="${"relative bg-cover bg-center bg-no-repeat"}" style="${escape(
    gradient_only != true ? `background-image: url(${gen_img_url(image_id)});` : "",
    true
  ) + " " + escape(
    height == "full" ? `height: calc(100vh - ${$header_height}px)` : `height: calc((100vh - ${$header_height}px)/2)`,
    true
  )}"><div class="${"absolute inset-0 bg-gradient-to-r from-secondary/75 to-primary/75"}"></div>

    <div class="${"absolute m-auto w-screen-sm left-0 top-1/4 xl:top-2/4 xl:left-1/4"}"><div class="${""}"><h2 class="${"px-4 pb-8 font-bold text-4xl text-white tracking-wide "}">${escape(text)}</h2>
            <div class="${"fix space-x-2 px-4"}">${each(buttons, (button) => {
    return `${validate_component(Link_Button, "LinkButton").$$render(
      $$result,
      {
        text: button.buttons_id.translations[0].text,
        href: "",
        color: `bg-${button.buttons_id.color}`
      },
      {},
      {}
    )}`;
  })}</div></div></div></section>`;
});
const Dot_svelte_svelte_type_style_lang = "";
const Dots_svelte_svelte_type_style_lang = "";
const Arrow_svelte_svelte_type_style_lang = "";
const Progress_svelte_svelte_type_style_lang = "";
const Carousel_svelte_svelte_type_style_lang = "";
var Types;
(function(Types2) {
  Types2["string"] = "string";
  Types2["array"] = "array";
  Types2["object"] = "object";
})(Types || (Types = {}));
var MQLEventMethods;
(function(MQLEventMethods2) {
  MQLEventMethods2["add"] = "addEventListener";
  MQLEventMethods2["remove"] = "removeEventListener";
})(MQLEventMethods || (MQLEventMethods = {}));
const Carousel_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { carousel_elements } = $$props;
  if ($$props.carousel_elements === void 0 && $$bindings.carousel_elements && carousel_elements !== void 0)
    $$bindings.carousel_elements(carousel_elements);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${``}`;
  } while (!$$settled);
  return $$rendered;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "#grow.svelte-66mmj0{flex:1 1 auto}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page_key, $$unsubscribe_page_key;
  let $t, $$unsubscribe_t;
  let $page, $$unsubscribe_page;
  let $locale, $$unsubscribe_locale;
  let $drawer, $$unsubscribe_drawer;
  let $header_height, $$unsubscribe_header_height;
  $$unsubscribe_page_key = subscribe(page_key, (value) => $page_key = value);
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_locale = subscribe(locale, (value) => $locale = value);
  $$unsubscribe_drawer = subscribe(drawer, (value) => $drawer = value);
  $$unsubscribe_header_height = subscribe(header_height, (value) => $header_height = value);
  let { data } = $$props;
  if ($page.params.locale) {
    set_store_value(locale, $locale = $page.params.locale, $locale);
  } else {
    set_store_value(locale, $locale = "de", $locale);
  }
  let title;
  let title_content;
  let content;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  title_content = $page.data.title != null ? `${$t($page_key).text + " - " + $page.data.title}` : `${$t($page_key).text}`;
  title = $page_key === "navbar.home" ? "CorrelAid" : title_content;
  content = data.builder;
  $$unsubscribe_page_key();
  $$unsubscribe_t();
  $$unsubscribe_page();
  $$unsubscribe_locale();
  $$unsubscribe_drawer();
  $$unsubscribe_header_height();
  return `${$$result.head += `<!-- HEAD_svelte-1az6e94_START -->${$$result.title = `<title>${escape(title)}</title>`, ""}<!-- HEAD_svelte-1az6e94_END -->`, ""}

<div class="${"flex flex-col items-center min-h-screen text-neutral"}"${add_attribute("style", $drawer ? "max-height: 100vh; overflow-y:hidden" : "", 0)}>${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
	<div id="${"grow"}" class="${"w-screen svelte-66mmj0"}">${$header_height ? `${content ? `${each(content, (section) => {
    return `${section.collection == "heros" ? `${validate_component(Hero, "Hero").$$render(
      $$result,
      {
        image: section.item.image,
        text: section.item.translations[0].text,
        height: section.item.height,
        gradient_only: section.item.gradient_only,
        buttons: section.item.buttons
      },
      {},
      {}
    )}` : `${section.collection == "buttons" ? `<div class="${"container mx-auto "}"><button>test</button>
						</div>` : `${section.collection == "wysiwyg" ? `<div class="${"container mx-auto"}"><div class="${"py-10 px-4"}">${validate_component(Html, "Html").$$render(
      $$result,
      {
        source: section.item.translations[0].content,
        options: "",
        width: section.item.width
      },
      {},
      {}
    )}</div>
						</div>` : `${section.collection == "contacts" ? `<div class="${"container mx-auto"}">${validate_component(Person, "Person").$$render(
      $$result,
      {
        name: section.item.person.name,
        img: gen_img_url(section.item.person.image.id, "fit=cover&width=200&height=200&quality=80"),
        position: section.item.translations[0].position,
        description: section.item.translations[0].description
      },
      {},
      {}
    )}
						</div>` : `${section.collection == "carousel" ? `<div class="${"mb-10"}">${validate_component(Carousel_1, "Carousel").$$render(
      $$result,
      {
        carousel_elements: section.item.carousel_elements
      },
      {},
      {}
    )}
						</div>` : `${section.collection == "custom_sections" ? `${slots.default ? slots.default({}) : ``}` : ``}`}`}`}`}`}`;
  })}
				
				${!content.find((e) => e.collection === "custom_sections") ? `${slots.default ? slots.default({}) : ``}` : ``}` : `${slots.default ? slots.default({}) : ``}`}` : ``}</div>
	${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
</div>`;
});
export {
  Layout as default
};
