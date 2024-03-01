import _ from 'lodash';
import {gemImgUrl} from '../../helpers.js';

export function processButtons(section) {
  return _.map(section, (button) => ({
    text: _.get(button, 'buttons_id.translations[0].text'),
    href: _.get(button, 'buttons_id.translations[0].link'),
    color: `bg-${_.get(button, 'buttons_id.color')}`,
  }));
}

export function processHeros(section) {
  const hero = {
    text: _.get(section, 'translations[0].text'),
    height: _.get(section, 'height'),
    gradientOnly: _.get(section, 'gradient_only'),
    buttons: processButtons(_.get(section, 'buttons')),
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
