const translations = {
  de: {
    "navbar.home": { "text": null, "url": "/" },
    "navbar.about": { "text": "Über uns", "url": "/ueber" },
    // Subnav about
    "navbar.about.board": { "text": "Vorstand", "url": "/ueber/vorstand" },
    "navbar.about.remote_office": { "text": "Remote Office", "url": "/ueber/remote_office" },
    "navbar.about.ethics_commission": { "text": "Ethikkomission", "url": "/ueber/ethikkommission" },
    // 
    "navbar.data4good": { "text": "Data4Good", "url": "/data4good" },
    // Subnav data4good
    "navbar.data4good.projects": { "text": "Projekte", "url": "/data4good/projekte" },
    "navbar.data4good.nonprofits": { "text": "Angebote für Nonprofits", "url": "/data4good/nonprofits" },
    // 
    "navbar.education": { "text": "Bildung", "url": "/bildung" },
    // Subnav education
    "navbar.education.workshops": { "text": "Workshops", "url": "/bildung/workshops" },
    "navbar.education.experts": { "text": "Expert:innen", "url": "/bildung/expertinnen" },
    "navbar.education.learning_r": { "text": "R Lernen", "url": "/bildung/r_lernen" },
    "navbar.education.knowledge_pool": { "text": "Knowledge Pool", "url": "/bildung/knowledge_pool" },
    "navbar.education.tidy_tuesday": { "text": "Tidy Tuesday", "url": "/bildung/tidy_tuesday" },
    "navbar.education.mentoring": { "text": "Mentoring", "url": "/bildung/mentoring" },
    // 
    "navbar.community": { "text": "Community", "url": "/community" },
    // Subnav community
    "navbar.community.correlaidx": { "text": "CorrelAidX", "url": "/community/correlaidx" },
    "navbar.community.founding_lc": { "text": "Ein Local Chapter gründen", "url": "/community/lc_gruenden" },
    "navbar.community.volunteer_journeys": { "text": "Volunteer Journeys", "url": "/community/volunteer_journeys" },
    //
    "navbar.events": { "text": "Veranstaltungen", "url": "/veranstaltungen" },
    "navbar.blog": { "text": "Blog", "url": "/blog" },
    "navbar.podcast": { "text": "Podcast", "url": "/podcast" },
    "navbar.newsletter": { "text": "Newsletter", "url": "/newsletter" },
    "navbar.donate": { "text": "Spenden", "url": "https://www.betterplace.org/de/projects/58963-correlaid-e-v-data-for-good" },
    "footer.imprint": { "text": "Impressum", "url": "/impressum" },
    "footer.coc": { "text": "Code of Conduct", "url": "/coc" },
    "footer.contact": { "text": "Kontakt", "url": "/contact" }
  },
  en: {
    "navbar.home": { "text": null, "url": "/en" },
    "navbar.about": { "text": "About us", "url": "/en/about" },
    // Sub nav about
    "navbar.about.board": { "text": "Board", "url": "/en/about/board" },
    "navbar.about.remote_office": { "text": "Remote Office", "url": "/en/about/remote_office" },
    "navbar.about.ethics_commission": { "text": "Ethics Commission", "url": "/en/about/ethics_commission" },
    // 
    "navbar.data4good": { "text": "Data4Good", "url": "/en/data4good" },
    // Subnav data4good
    "navbar.data4good.projects": { "text": "Projects", "url": "/en/data4good/projects" },
    "navbar.data4good.nonprofits": { "text": "Offers for Nonprofits", "url": "/en/data4good/nonprofits" },
    // 
    "navbar.education": { "text": "Education", "url": "/en/education" },
    // Subnav education
    "navbar.education.nonprofits": { "text": "Offers for Nonprofits", "url": "/en/education/nonprofits" },
    // Sub sub nav offers for non profits
    "navbar.education.workshops": { "text": "Workshops", "url": "/en/education/workshops" },
    "navbar.education.experts": { "text": "Experts", "url": "/en/education/experts" },
    "navbar.education.learning_r": { "text": "R Lernen", "url": "/en/education/learning_r" },
    "navbar.education.knowledge_pool": { "text": "Knowledge Pool", "url": "/bildung/knowledge_pool" },
    "navbar.education.tidy_tuesday": { "text": "Tidy Tuesday", "url": "/en/education/tidy_tuesday" },
    "navbar.education.mentoring": { "text": "Mentoring", "url": "/en/education/mentoring" },
    // 
    "navbar.community": { "text": "Community", "url": "/en/community" },
    // Subnav community
    "navbar.community.correlaidx": { "text": "CorrelAidX", "url": "/en/community/correlaidx" },
    "navbar.community.founding_lc": { "text": "Founding a Local Chapter", "url": "/en/community/founding_lc" },
    "navbar.community.volunteer_journeys": { "text": "Volunteer Journeys", "url": "/en/community/volunteer_journeys" },
    //
    "navbar.events": { "text": "Events", "url": "/en/events" },
    "navbar.blog": { "text": "Blog", "url": "/en/blog" },
    "navbar.podcast": { "text": "Podcast", "url": "/en/podcast" },
    "navbar.newsletter": { "text": "Newsletter", "url": "/en/newsletter" },
    "navbar.donate": { "text": "Donate", "url": "https://www.betterplace.org/de/projects/58963-correlaid-e-v-data-for-good" },
    "footer.imprint": { "text": "Imprint", "url": "/en/imprint" },
    "footer.coc": { "text": "Code of Conduct", "url": "/coc" },
    "footer.contact": { "text": "Contact", "url": "/en/contact" }
  }
};
const PUBLIC_API_URL = "https://6xdv3yb3.directus.app";
const getLastItem = (thePath) => thePath.substring(thePath.lastIndexOf("/") + 1);
const getGroup = (thePath) => thePath.substring(thePath.lastIndexOf(".") + 1);
function translate(locale, key, vars) {
  if (!key)
    throw new Error("no key provided to $t()");
  if (!locale)
    throw new Error(`no translation for key "${key}"`);
  let translation = translations[locale][key];
  if (!translation)
    throw new Error(`no translation found for ${locale}.${key}`);
  let text = translation.text;
  let url = translation.url;
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k]);
  });
  return { text, url };
}
function constructRe(keys) {
  let str = "";
  for (var i = 0; i < keys.length; i++) {
    const en = getLastItem(translate("en", keys[i], {}).url);
    const de = getLastItem(translate("de", keys[i], {}).url);
    if (i != keys.length && keys.length != 1) {
      str = str + `${de}|${en}|`;
    } else {
      str = str + `${de}|${en}`;
    }
  }
  const re = new RegExp(`^${str}`);
  return re;
}
const find = (v, path) => {
  return Object.keys(v).filter((k) => v[k].url == path);
};
function get_lang(params) {
  let lang;
  if (params.locale) {
    lang = "en-US";
  } else {
    lang = "de-DE";
  }
  return lang;
}
function get_locale(params) {
  if (params.locale == "en") {
    return params.locale;
  }
  return "de";
}
function gen_img_url(id, transform = "") {
  return `${PUBLIC_API_URL}/assets/${id}?${transform}`;
}
function gen_date(date, locale, year = false) {
  let options = {
    month: "long",
    day: "numeric"
  };
  if (year == true) {
    options = {
      month: "long",
      day: "numeric",
      year: "numeric"
    };
  }
  date = new Date(Date.parse(date));
  return date.toLocaleString(locale, options);
}
function gen_time(time, locale) {
  const options = {
    hour: "numeric",
    minute: "numeric"
  };
  time = new Date(Date.parse("0000-01-01 " + time));
  return time.toLocaleTimeString(locale, options);
}
export {
  PUBLIC_API_URL as P,
  translations as a,
  get_locale as b,
  get_lang as c,
  getGroup as d,
  gen_date as e,
  find as f,
  gen_img_url as g,
  gen_time as h,
  constructRe as i,
  translate as t
};
