import _ from 'lodash';
import {gemImgUrl, processHtml, genImgUrl} from '../../helpers.js';
import {parsePersonLinks} from './processingHelpers.js';

export function processButtons(section) {
  if (section['buttons_id']) {
    section = section['buttons_id'];
  }

  return {
    text: _.get(section, 'translations[0].text'),
    href: _.get(section, 'translations[0].link'),
    color: `bg-${_.get(section, 'color')}`,
  };
}

export function processHeros(section) {
  const hero = {
    text: _.get(section, 'translations[0].text'),
    height: _.get(section, 'height'),
    gradientOnly: _.get(section, 'gradient_only'),
    buttons: _.map(_.get(section, 'buttons'), (button) =>
      processButtons(button),
    ),
  };
  if (_.get(section, 'image')) {
    hero['image'] = gemImgUrl(_.get(section, 'image.id'));
    hero['imageDesc'] = _.get(section, 'image.description');
    hero['imageAlt'] = _.get(section, 'translations[0].image_alt');
  }
  return hero;
}

export function processCtas(section) {
  const cta = {
    buttonLink: _.get(section, 'button.translations[0].link'),
    buttonColor: `bg-${_.get(section, 'button.color')}`,
    buttonText: _.get(section, 'button.translations[0].text'),
    text: _.get(section, 'translations[0].text'),
  };
  return cta;
}

export function processCtaGroups(section) {
  const ctas = _.map(_.get(section, 'ctas'), (ctaRaw) => {
    return processCtas(ctaRaw['ctas_id']);
  });
  return {ctas: ctas};
}

export function processWysiwyg(section) {
  return {
    source: processHtml(_.get(section, 'translations[0].content')),
    options: '',
  };
}

export function processQuoteCarousels(section) {
  const quotes = _.map(_.get(section, 'quotes'), (quote) => {
    const temp = {
      text: _.get(quote, 'quotes_id.translations[0].text'),
      subtitle: _.get(quote, 'quotes_id.translations[0].subtitle'),
    };
    if (!_.get(section, 'text_only')) {
      temp.image = genImgUrl(_.get(quote, 'quotes_id.image.id'));
      temp.imageDesc = _.get(quote, 'quotes_id.image.description');
    }
    return temp;
  });
  return {
    quotes: quotes,
    textOnly: _.get(section, 'text_only'),
  };
}

export function processContacts(section) {
  const links = parsePersonLinks(_.get(section, 'person'));
  const personParams = {
    name: _.get(section, 'person.name'),
    position: _.get(section, 'translations[0].position'),
    description: _.get(section, 'translations[0].description'),
    links: links,
  };

  if (_.get(section, 'person.image')) {
    _.set(
      personParams,
      'img',
      gemImgUrl(
        _.get(section, 'person.image.id'),
        'fit=cover&width=200&height=200&quality=80',
      ),
    );
    _.set(
      personParams,
      'imageDesc',
      _.get(section, 'person.image.description'),
    );
  }

  if (_.get(section, 'person.translations[0]')) {
    _.set(
      personParams,
      'pronouns',
      _.get(section, 'person.translations[0].pronouns'),
    );
  }

  _.set(
    personParams,
    'email',
    _.get(section, 'email', _.get(section, 'person.email')),
  );

  return personParams;
}

export function processTimelines(section) {
  const steps = _.map(_.get(section, 'steps'), (step) => {
    return {
      text: _.get(step, 'timeline_steps_id.translations[0].text'),
      icon: _.get(step, 'timeline_steps_id.icon'),
    };
  });
  const timeline = {
    steps: steps,
    color: _.get(section, 'color'),
  };
  return timeline;
}

export function processIcons(section) {
  return {
    iconType: _.get(section, 'icon_type'),
    text: _.get(section, 'translations[0].text'),
  };
}
