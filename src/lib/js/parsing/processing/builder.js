import _ from 'lodash';
import {gemImgUrl, processHtml, genImgUrl} from '../../helpers.js';
import {processPersonLinks} from './processingHelpers.js';

export function processButtons(section) {
  if (section['buttons_id']) {
    section = section['buttons_id'];
  }

  return {
    text: section.translations[0].text,
    href: section.translations[0].link,
    color: `bg-${section.color}`,
  };
}

export function processHeros(section) {
  const hero = {
    text: section.translations[0].text,
    height: section.height,
    gradientOnly: section.gradient_only,
    buttons: section.buttons.map((button) => processButtons(button)),
  };
  if (section.image) {
    hero['image'] = gemImgUrl(section.image.id);
    hero['imageDesc'] = section.image.description;
    hero['imageAlt'] = section.translations[0].image_alt;
  }
  return hero;
}

export function processCtas(section) {
  const cta = {
    buttonLink: section.button.translations[0].link,
    buttonColor: `bg-${section.button.color}`,
    buttonText: section.button.translations[0].text,
    text: section.translations[0].text,
  };
  return cta;
}

export function processCtaGroups(section) {
  const ctas = section.ctas.map((ctaRaw) => {
    return processCtas(ctaRaw.ctas_id);
  });
  return {ctas: ctas};
}

export function processWysiwyg(section) {
  return {
    source: processHtml(section.translations[0].content),
    options: '',
  };
}

export function processQuoteCarousels(section) {
  const quotes = _.map(section.quotes, (quote) => {
    const temp = {
      text: quote.quotes_id.translations[0].text,
      subtitle: quote.quotes_id.translations[0].subtitle,
    };
    if (!section.text_only) {
      temp.image = genImgUrl(quote.quotes_id.image.id);
      temp.imageDesc = quote.quotes_id.image.description;
    }
    return temp;
  });
  return {
    quotes: quotes,
    textOnly: section.text_only,
  };
}

export function processContacts(section) {
  const links = processPersonLinks(section.person);
  const personParams = {
    name: section.person.name,
    position: section.translations[0].position,
    description: section.translations[0].description,
    links: links,
  };

  if (section.person.image) {
    personParams.img = gemImgUrl(
      section.person.image.id,
      'fit=cover&width=200&height=200&quality=80',
    );
    personParams.imageDesc = section.person.image.description;
  }

  if (section.person.translations[0]) {
    personParams.pronouns = section.person.translations[0].pronouns;
  }

  personParams.email = section.email || section.person.email;

  return personParams;
}

export function processTimelines(section) {
  const steps = section.steps.map((step) => {
    return {
      text: step.timeline_steps_id.translations[0].text,
      icon: step.timeline_steps_id.icon,
    };
  });
  const timeline = {
    steps: steps,
    color: section.color,
  };
  return timeline;
}

export function processIcons(section) {
  return {
    iconType: section.icon_type,
    text: section.translations[0].text,
  };
}
